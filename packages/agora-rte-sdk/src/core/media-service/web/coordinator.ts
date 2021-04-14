import { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { EduStreamData } from "../../../interfaces";
import { debounce, difference } from 'lodash'
import { EventEmitter } from "events";

type StreamSnapshot = {
    eduStreams: Map<string, EduStreamData>, 
    rtcVideoStreams: Map<string,IAgoraRTCRemoteUser>,
    rtcAudioStreams:Map<string,IAgoraRTCRemoteUser>
}

type StreamUpdateTask = {
    oldSnapshot: StreamSnapshot
    newSnapshot: StreamSnapshot
}

export class AgoraWebStreamCoordinator extends EventEmitter  {

    eduStreams: Map<string, EduStreamData> = new Map<string, EduStreamData>()
    rtcVideoStreams: Map<string,IAgoraRTCRemoteUser> = new Map<string,IAgoraRTCRemoteUser>()
    rtcAudioStreams: Map<string,IAgoraRTCRemoteUser> = new Map<string,IAgoraRTCRemoteUser>()

    queueTasks: StreamUpdateTask[] = []
    currentTask?: StreamUpdateTask

    client?: IAgoraRTCClient

    constructor() {
        super()
    }

    updateRtcClient(client:IAgoraRTCClient) {
        this.client = client
    }

    addRtcStream(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio") {
        let snapshot = this.beginUpdate()
        if (mediaType === 'audio') {
            this.rtcAudioStreams.set(`${user.uid}`, user)
        }
        if (mediaType === 'video') {
            this.rtcVideoStreams.set(`${user.uid}`, user)
        }
        this.endUpdate(snapshot)
    }

    removeRtcStream(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio") {
        let snapshot = this.beginUpdate()
        if (mediaType === 'audio') {
            this.rtcAudioStreams.delete(`${user.uid}`)
        }
        if (mediaType === 'video') {
            this.rtcVideoStreams.delete(`${user.uid}`)
        }
        this.endUpdate(snapshot)
    }

    addEduStreams(streams: EduStreamData[]) {
        let snapshot = this.beginUpdate()
        streams.forEach(stream => this.eduStreams.set(stream.stream.streamUuid, stream))
        this.endUpdate(snapshot)
    }

    removeEduStreams(streams: EduStreamData[]) {
        let snapshot = this.beginUpdate()
        streams.forEach(stream => this.eduStreams.delete(stream.stream.streamUuid))
        this.endUpdate(snapshot)
    }

    makeSnapshot():StreamSnapshot {
        return {
            eduStreams: new Map<string, EduStreamData>(this.eduStreams), 
            rtcVideoStreams: new Map<string,IAgoraRTCRemoteUser>(this.rtcVideoStreams),
            rtcAudioStreams:new Map<string,IAgoraRTCRemoteUser>(this.rtcAudioStreams)
        }
    }

    beginUpdate():StreamSnapshot {
        return this.makeSnapshot()
    }

    endUpdate(oldSnapshot: StreamSnapshot) {
        let newSnapshot = this.makeSnapshot()
        this.addTask({oldSnapshot, newSnapshot})
    }

    getOnlineStreams(snapshot: StreamSnapshot) {
        let onlineVideoStreams:string[] = []
        let onlineAudioStreams:string[] = []
        snapshot.eduStreams.forEach(stream => {
            if(stream.stream.hasVideo && snapshot.rtcVideoStreams.has(stream.stream.streamUuid)) {
                onlineVideoStreams.push(stream.stream.streamUuid)
            }
            if(stream.stream.hasAudio && snapshot.rtcAudioStreams.has(stream.stream.streamUuid)) {
                onlineAudioStreams.push(stream.stream.streamUuid)
            }
        })
        return {onlineVideoStreams, onlineAudioStreams}
    }

    diffSnapshots(oldSnapshot:StreamSnapshot, newSnapshot:StreamSnapshot) {
        let {onlineVideoStreams:oldOnlineVideoStreams, onlineAudioStreams: oldOnlineAudioStreams} = this.getOnlineStreams(oldSnapshot)
        let {onlineVideoStreams:newOnlineVideoStreams, onlineAudioStreams: newOnlineAudioStreams} = this.getOnlineStreams(newSnapshot)

        let offlineVideoStreams = difference(oldOnlineVideoStreams, newOnlineVideoStreams)
        let onlineVideoStreams = difference(newOnlineVideoStreams, oldOnlineVideoStreams)
        let offlineAudioStreams = difference(oldOnlineAudioStreams, newOnlineAudioStreams)
        let onlineAudioStreams = difference(newOnlineAudioStreams, oldOnlineAudioStreams)

        console.log(`[StreamCoordinator] diff ${JSON.stringify({offlineVideoStreams, offlineAudioStreams, onlineVideoStreams, onlineAudioStreams})}`)
        return {offlineVideoStreams, offlineAudioStreams, onlineVideoStreams, onlineAudioStreams}
    }

    addTask(task: StreamUpdateTask) {
        this.queueTasks.push(task)
        this.notifyTaskQueueUpdate()
    }

    notifyTaskQueueUpdate() {
        debounce(this.runNextTask, 50)()
    }

    runNextTask = async () => {
        if(this.currentTask) {
            console.log(`[StreamCoordinator] Task Running`)
            return
        }

        let task  = this.dequeueTask()
        if(!task) {
            console.log(`[StreamCoordinator] Stream snapshot queue clear`)
            return
        } else {
            this.currentTask = task
            try {
                await this.processSnapshotsUpdate(this.currentTask)
                this.currentTask = undefined
            }catch(e) {
                this.currentTask = undefined
            }
            this.notifyTaskQueueUpdate()
        }
    }

    dequeueTask() {
        if(this.queueTasks.length === 0) {
            return null
        } else if(this.queueTasks.length === 1) {
            return this.queueTasks.shift()
        } else if(this.queueTasks.length > 1) {
            let firstTask = this.queueTasks.shift()!
            let lastTask = this.queueTasks.pop()!
            // merge tasks
            this.queueTasks = []
            return {oldSnapshot: firstTask.oldSnapshot, newSnapshot: lastTask.newSnapshot}
        }
    }

    processSnapshotsUpdate = (task: StreamUpdateTask) => {
        return new Promise<void>((resolve, reject) => {
            let {oldSnapshot, newSnapshot} = task
            let {offlineVideoStreams, offlineAudioStreams, onlineVideoStreams, onlineAudioStreams} = this.diffSnapshots(oldSnapshot, newSnapshot)
            let promises:Promise<boolean>[] = []

            offlineVideoStreams.forEach(streamUuid => {
                if(this.rtcVideoStreams.has(streamUuid)) {
                    let user = this.rtcVideoStreams.get(streamUuid)!
                    promises.push(new Promise(async (resolve) => {
                        try {
                            await this.client?.unsubscribe(user, "video")
                            this.emit('user-unpublished', user, "video")
                            resolve(true)
                        } catch(e) {
                            console.error(e.stack)
                            resolve(false)
                        }
                    }))
                }
            })

            offlineAudioStreams.forEach(streamUuid => {
                if(this.rtcAudioStreams.has(streamUuid)) {
                    let user = this.rtcAudioStreams.get(streamUuid)!
                    promises.push(new Promise(async (resolve) => {
                        try {
                            await this.client?.unsubscribe(user, "audio")
                            resolve(true)
                        } catch(e) {
                            console.error(e.stack)
                            resolve(false)
                        }
                    }))
                }
            })

            onlineVideoStreams.forEach(streamUuid => {
                if(this.rtcVideoStreams.has(streamUuid)) {
                    let user = this.rtcVideoStreams.get(streamUuid)!
                    promises.push(new Promise(async (resolve) => {
                        try {
                            await this.client?.subscribe(user, "video")
                            this.emit('user-published', user, "video")
                            resolve(true)
                        } catch(e) {
                            console.error(e.stack)
                            resolve(false)
                        }
                    }))
                }
            })

            onlineAudioStreams.forEach(streamUuid => {
                if(this.rtcAudioStreams.has(streamUuid)) {
                    let user = this.rtcAudioStreams.get(streamUuid)!
                    promises.push(new Promise(async (resolve) => {
                        try {
                            await this.client?.subscribe(user, "audio")
                            if(user.audioTrack) {
                                !user.audioTrack.isPlaying && user.audioTrack.play()
                            }
                            resolve(true)
                        } catch(e) {
                            console.error(e.stack)
                            resolve(false)
                        }
                    }))
                }
            })

            Promise.all(promises).then(() => {
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }
 }