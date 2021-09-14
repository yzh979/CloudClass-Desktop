import { Roster } from '~ui-kit';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useUserListContext, useStreamListContext, useBoardContext, useGlobalContext, useRoomContext, useVideoControlContext, useHandsUpContext } from 'agora-edu-core';
import { EduRoleTypeEnum, EduStream, EduVideoSourceType } from 'agora-rte-sdk';
import { RosterUserInfo } from '@/infra/stores/types';
import { get } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { StudentRoster } from '@/ui-kit/components';
import { KickDialog } from '../../dialog';
import { useUIStore } from '@/infra/hooks';



export type UserListContainerProps = {
    onClose: () => void
}

export const UserListContainer: React.FC<UserListContainerProps> = observer((props) => {

    const {
        revokeBoardPermission,
        grantBoardPermission,
    } = useBoardContext()
    const {
        onSendStar,
        onOffAllPodiumClick
    } = useVideoControlContext()
    const {
        streamList
    } = useStreamListContext()

    const {
        addDialog,
    } = useUIStore()

    const {
        muteVideo,
        muteAudio,
        unmuteAudio,
        unmuteVideo,
        roomInfo
    } = useRoomContext()

    const {
        localUserUuid,
        myRole,
        teacherName,
        rosterUserList
    } = useUserListContext()

    const {
        teacherAcceptHandsUp,
        teacherRevokeCoVideo
    } = useHandsUpContext()

    const onMuteAll = useCallback(async () => {
        const userList = rosterUserList
        userList.forEach(async user => {
            const targetStream = streamList.find((stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === user.uid)
            if (targetStream) {
                const isLocal = roomInfo.userUuid === user.uid
                if (targetStream.hasAudio && user.micEnabled) {// 有音频流且音频打开
                    await muteAudio(user.uid, isLocal)
                }
            }
        })
    }, [rosterUserList, muteAudio])

    const onSendRewardAll = useCallback(async () => {
        const userList = rosterUserList
        userList.forEach(async user => {
            await onSendStar(user.uid)
        })
    }, [rosterUserList, onSendStar])

    const onClick = useCallback(async (actionType: any, uid: any) => {

        const userList = rosterUserList
        const user = userList.find((user: RosterUserInfo) => user.uid === uid)

        if (!user) {
            return
        }
        switch (actionType) {
            case 'podium': {
                if (user.onPodium) {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await teacherRevokeCoVideo(user.uid)
                    }
                } else {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await teacherAcceptHandsUp(user.uid)
                    }
                }
                break;
            }
            case 'whiteboard': {
                if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                    if (user.whiteboardGranted) {
                        await revokeBoardPermission(uid)
                    } else {
                        await grantBoardPermission(uid)
                    }
                }
                break;
            }
            case 'camera': {
                const targetStream = streamList.find((stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === uid)
                if (targetStream) {
                    const isLocal = roomInfo.userUuid === uid
                    if (targetStream.hasVideo) {
                        await muteVideo(uid, isLocal)
                    } else {
                        await unmuteVideo(uid, isLocal)
                    }
                }
                break;
            }
            case 'mic': {
                const targetStream = streamList.find((stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === uid)
                if (targetStream) {
                    const isLocal = roomInfo.userUuid === uid
                    if (targetStream.hasAudio) {
                        await muteAudio(uid, isLocal)
                    } else {
                        await unmuteAudio(uid, isLocal)
                    }
                }
                break;
            }
            case 'kickOut': {
                if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                    addDialog(KickDialog, { userUuid: uid, roomUuid: roomInfo.roomUuid })
                }
                break;
            }
            case 'reward': {
                onSendStar(uid)
                break;
            }
        }
    }, [rosterUserList, roomInfo.roomUuid, roomInfo.userRole])
    const [keyword, setKeyword] = useState<string>('')
    const dataList = useMemo(() => {
        return rosterUserList.filter((item: any) => item.name.toLowerCase().includes(keyword.toLowerCase()))
    }, [keyword, rosterUserList])

    return (
        <Roster
            isDraggable={true}
            localUserUuid={localUserUuid}
            role={myRole as any}
            teacherName={teacherName}
            onMuteAll={onMuteAll}
            onSendRewardAll={onSendRewardAll}
            dataSource={dataList}
            onClick={onClick}
            onClose={props.onClose}
            onOffAllPodiumClick={onOffAllPodiumClick}
            onSearch={(text: string) => {
                setKeyword(text)
            }}
            // LKLTODO
            studentInClassCnt={/*roomInfo.studentNum*/0}
            studentInRoomCnt={rosterUserList.length}
        />
    )
})

export type StudentUserListContainerProps = {
}

export const StudentUserListContainer: React.FC<StudentUserListContainerProps> = observer((props) => {

    const {
        onSendStar,
        onOffAllPodiumClick
    } = useVideoControlContext()

    const {
        revokeBoardPermission,
        grantBoardPermission,
    } = useBoardContext()

    const {
        roomInfo,
        muteAudio,
    } = useRoomContext()

    const {
        localUserUuid,
        rosterUserList
    } = useUserListContext()
    const {
        streamList
    } = useStreamListContext()


    const {
        handsUpStudentList,
        teacherAcceptHandsUp,
        teacherRevokeCoVideo
    } = useHandsUpContext()

    const studentList = useMemo(() => {
        return handsUpStudentList.filter((student) => !student.coVideo)
    }, [handsUpStudentList])
    const dataList = useMemo(() => {
        const handsUpUids = studentList.map(student => student.userUuid);
        return rosterUserList.map(user => {
            user.isUphand = handsUpUids.indexOf(user.uid) !== -1
            return user
        })
    }, [studentList, rosterUserList])

    const onClick = useCallback(async (actionType: any, uid: any) => {
        const userList = dataList
        const user = userList.find((user: RosterUserInfo) => user.uid === uid)

        if (!user) {
            return
        }
        switch (actionType) {
            case 'podium': {
                if (user.onPodium) {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await teacherRevokeCoVideo(user.uid)
                    }
                } else {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await teacherAcceptHandsUp(user.uid)
                    }
                }
                break;
            }
            case 'whiteboard': {
                if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                    if (user.whiteboardGranted) {
                        await revokeBoardPermission(uid)
                    } else {
                        await grantBoardPermission(uid)
                    }
                }
                break;
            }
            case 'reward': {
                onSendStar(uid)
                break;
            }
        }
    }, [dataList, roomInfo.roomUuid, roomInfo.userRole])

    const onMuteAll = useCallback(async () => {
        const userList = rosterUserList
        userList.forEach(async user => {
            const targetStream = streamList.find((stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === user.uid)
            if (targetStream) {
                const isLocal = roomInfo.userUuid === user.uid
                if (targetStream.hasAudio && user.micEnabled) {// 有音频流且音频打开
                    await muteAudio(user.uid, isLocal)
                }
            }
        })
    }, [rosterUserList, muteAudio])

    const onSendRewardAll = useCallback(async () => {
        const userList = rosterUserList
        userList.forEach(async user => {
            await onSendStar(user.uid)
        })
    }, [rosterUserList, onSendStar])
    return (
        <StudentRoster
            onMuteAll={onMuteAll}
            onSendRewardAll={onSendRewardAll}
            onOffAllPodiumClick={onOffAllPodiumClick}
            localUserUuid={localUserUuid}
            dataSource={dataList}
            onClick={onClick}
        />
    )
})