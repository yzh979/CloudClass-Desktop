import { Layout, Content, Aside } from '~components/layout'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { useRoomContext, useGlobalContext, useChatContext, useWidgetContext, useAppPluginContext, usePretestContext, useStreamListContext, useBoardContext } from 'agora-edu-core'
import { NavigationBar } from '~capabilities/containers/nav'
import { ScreenSharePlayerContainer } from '~capabilities/containers/screen-share-player'
import { WhiteboardContainer } from '~capabilities/containers/board'
import { DialogContainer } from '~capabilities/containers/dialog'
import { LoadingContainer } from '~capabilities/containers/loading'
import { VideoMarqueeStudentContainer, VideoPlayerTeacher } from '~capabilities/containers/video-player'
import { HandsUpContainer } from '~capabilities/containers/hands-up'
import { RoomChat } from '~capabilities/containers/room-chat'
import { useEffectOnce } from '@/infra/hooks/utils'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Widget } from '~capabilities/containers/widget'
import { ToastContainer } from "~capabilities/containers/toast"
import { useUIStore } from '@/infra/hooks'
import { useEffect } from 'react'
import { EduRoleTypeEnum } from 'agora-rte-sdk'
import { get } from 'lodash'
import { EduClassroomStateEnum } from '../../../../../../agora-edu-core/src/stores/scene'

export enum TeacherRenderMode {
  smallMode = 0,
  largeMode = 1
}

export const BigClassScenario = observer(() => {

  const {
    joinRoom,
    updateFlexRoomProperties,
    roomProperties,
    isJoiningRoom,
    flexRoomProperties,
    rtcJoined,
    joinRoomRTC,
    leaveRoomRTC,
    roomInfo,
    prepareStream,
    classState
  } = useRoomContext()

  const {
    unmuteVideo,
    unmuteAudio
  } = useStreamListContext()

  const {
    onLaunchAppPlugin,
    onShutdownAppPlugin
  } = useAppPluginContext()

  const {
    startPretestCamera,
    startPretestMicrophone
  } = usePretestContext()


  useLayoutEffect(() => {
    if (roomProperties?.extAppsCommon?.io_agora_countdown?.state === 1) {
      // 开启倒计时
      onLaunchAppPlugin('io.agora.countdown')
    } else if (roomProperties?.extAppsCommon?.io_agora_countdown?.state === 0) {
      // 关闭倒计时
      onShutdownAppPlugin('io.agora.countdown')
    }
  }, [roomProperties])

  const {
    isFullScreen,
  } = useGlobalContext()

  // useEffect(() => {
  //   if (roomInfo.userRole !== EduRoleTypeEnum.teacher) return
  //   Promise.all([
  //     startPretestCamera(),
  //     startPretestMicrophone({enableRecording: false})
  //   ])
  //   .then(() => {
  //       console.log('打开媒体设备成功')
  //   })
  //   .catch((err: any) => {
  //       console.log('打开媒体设备失败', err)
  //   })
  // }, [roomInfo.userRole])

  const {
    widgets
  } = useWidgetContext()
  const chatWidget = widgets['chat']

  const { chatCollapse } = useUIStore()

  const {
    joinBoard
  } = useBoardContext()

  useEffectOnce(async () => {
    await joinRoom()
    if (roomInfo.userRole === EduRoleTypeEnum.teacher) {
      try {
        prepareStream()
      } catch (err) {
        console.log(err)
      }    
    }
    try {
      joinBoard()
    } catch (err) {
      console.log(err)
    }
  })

  const prepareStartClassroom = useCallback(async () => {
    try {
      await joinRoomRTC()
    } catch (err) {
      console.log(err)
    }
  }, [roomInfo.userRole])

  const preparePauseClassroom = useCallback(async () => {
    try {
      await leaveRoomRTC()
    } catch (err) {
      console.log(err)
    }
  }, [roomInfo.userUuid])

  const rtcIsJoining = useRef<boolean>(false)

  const rtcIsPausing = useRef<boolean>(false)

  // const classState = get(flexRoomProperties, 'classState', '')

  useEffect(() => {
    if (!rtcJoined &&
      !rtcIsJoining.current &&
      classState === EduClassroomStateEnum.start) {
      rtcIsJoining.current = true
      prepareStartClassroom()
        .then(() => {
          rtcIsJoining.current = false
        })
        .catch((err: any) => {
          rtcIsJoining.current = false
        })
    }
    // if (rtcJoined &&
    //   !rtcIsPausing.current &&
    //   classState === EduClassroomStateEnum.start) {
    //   rtcIsPausing.current = true
    //   preparePauseClassroom()
    //     .then(() => {
    //       rtcIsPausing.current = false
    //     })
    //     .catch((err: any) => {
    //       rtcIsPausing.current = false
    //     })
    // }
  }, [rtcJoined, classState])

  const cls = classnames({
    'edu-room': 1,
    'fullscreen': !!isFullScreen
  })

  return (
    <Layout
      className={cls}
      direction="col"
      style={{
        height: '100vh'
      }}
    >
      <NavigationBar />
      <Layout className="horizontal">
        <Content className="column">
          {flexRoomProperties?.teacherRenderMode === TeacherRenderMode.largeMode ? (
            <div
              className={isFullScreen ? 'full-video-wrap' : 'video-wrap'}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 999
              }}
            >
              <VideoPlayerTeacher
                className="big-class-teacher"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          ) : null}
          <VideoMarqueeStudentContainer />
          <div className="board-box">
            <WhiteboardContainer>
              <ScreenSharePlayerContainer />
            </WhiteboardContainer>
          </div>
          {/* <div
            className={classnames({
              'pin-right': 1
            })}
          >
            <HandsUpContainer />
          </div> */}
        </Content>
        <Aside className={classnames({
          "big-class-aside": 1,
          "big-class-aside-full-not-collapse": (isFullScreen && !chatCollapse),
          "big-class-aside-full-collapse": (isFullScreen && chatCollapse)
        })}>
          <div className={isFullScreen ? 'full-video-wrap' : 'video-wrap'}>
            <VideoPlayerTeacher
              className="big-class-teacher"
              hideMaxiumn={false}
              isMaxiumn={flexRoomProperties?.teacherRenderMode === TeacherRenderMode.largeMode}
              onMaxiumnClick={async () => {
                await updateFlexRoomProperties({ "teacherRenderMode": flexRoomProperties?.teacherRenderMode === TeacherRenderMode.largeMode ? TeacherRenderMode.smallMode : TeacherRenderMode.largeMode }, { "cause": 0 })
              }}
            />
          </div>
          <Widget className="chat-panel chat-border" widgetComponent={chatWidget} />
        </Aside>
      </Layout>
      <DialogContainer />
      <LoadingContainer loading={isJoiningRoom} />
      <ToastContainer />
    </Layout>
  )
})