import { EduMediaStream, useGlobalContext, useRoomContext, useUserListContext, useSmallClassVideoControlContext, useVideoControlContext, usePrivateChatContext } from 'agora-edu-core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useMemo } from 'react';
import { CameraPlaceHolder, VideoMarqueeList, VideoPlayer,  } from '~ui-kit';
import { RendererPlayer } from '~utilities/renderer-player';
import { Tabs, TabPane } from '~components/tabs';
import { StudentUserListContainer } from '~capabilities/containers/board/user-list'
import { Button} from '~ui-kit'
import { EduRoleTypeEnum } from 'agora-rte-sdk'
import EmptyImage from './assets/empty_seat.png'
export const VideoPlayerTeacher = observer(({ style }: any) => {
  const {
    teacherStream: userStream,
    onCameraClick,
    onMicClick,
    onSendStar,
    onWhiteboardClick,
    onOffPodiumClick,
    onOffAllPodiumClick,
    sceneVideoConfig,
    canHoverHideOffAllPodium,
  } = useVideoControlContext()

  return (
    <VideoPlayer
      isHost={sceneVideoConfig.isHost}
      hideOffPodium={true}
      username={userStream.account}
      stars={userStream.stars}
      uid={userStream.userUuid}
      micEnabled={userStream.audio}
      cameraEnabled={userStream.video}
      hideControl={userStream.hideControl}
      whiteboardGranted={userStream.whiteboardGranted}
      hideBoardGranted={true}
      hideStars={true}
      micVolume={userStream.micVolume}
      hideOffAllPodium={sceneVideoConfig.hideOffAllPodium}
      canHoverHideOffAllPodium={canHoverHideOffAllPodium}
      onOffAllPodiumClick={onOffAllPodiumClick!}
      onCameraClick={onCameraClick}
      onMicClick={onMicClick}
      onWhiteboardClick={onWhiteboardClick}
      onSendStar={onSendStar}
      controlPlacement={'left'}
      placement={'left'}
      onOffPodiumClick={onOffPodiumClick}
      userType={'teacher'}
      style={style}
    >
      {

        <>
          {
            userStream.renderer && userStream.video ?
              <RendererPlayer
                key={userStream.renderer && userStream.renderer.videoTrack ? userStream.renderer.videoTrack.getTrackId() : ''} track={userStream.renderer} id={userStream.streamUuid} className="rtc-video"
              />
              : null
          }
          <CameraPlaceHolder state={userStream.holderState} />
        </>
      }
    </VideoPlayer>)
})

export type VideoProps = {
  controlPlacement: 'left' | 'bottom'
  style?: any
}

export const VideoPlayerStudent: React.FC<VideoProps> = observer(({ controlPlacement, style }) => {

  const {
    firstStudent: userStream,
    onCameraClick, onMicClick,
    onSendStar, onWhiteboardClick,
    sceneVideoConfig,
    onOffPodiumClick,
  } = useVideoControlContext()

  return (
    <VideoPlayer
      isHost={sceneVideoConfig.isHost}
      hideOffPodium={true}
      username={userStream.account}
      stars={userStream.stars}
      uid={userStream.userUuid}
      micEnabled={userStream.audio}
      cameraEnabled={userStream.video}
      whiteboardGranted={userStream.whiteboardGranted}
      hideStars={true}
      micVolume={userStream.micVolume}
      hideControl={userStream.hideControl}
      onCameraClick={onCameraClick}
      onMicClick={onMicClick}
      onWhiteboardClick={onWhiteboardClick}
      onSendStar={onSendStar}
      onOffPodiumClick={onOffPodiumClick}
      controlPlacement={controlPlacement}
      placement={controlPlacement}
      style={style}
    >
      {
        <>
          {
            userStream.renderer && userStream.video ?
              <RendererPlayer
                key={userStream.renderer && userStream.renderer.videoTrack ? userStream.renderer.videoTrack.getTrackId() : ''} track={userStream.renderer} id={userStream.streamUuid} className="rtc-video"
              />
              : null
          }
          <CameraPlaceHolder state={userStream.holderState} />
        </>
      }
    </VideoPlayer>
  )
})

export const VideoMarqueeStudentContainer = observer(() => {

  const {
    onCameraClick,
    onMicClick,
    onSendStar,
    onWhiteboardClick,
    onOffPodiumClick,
    studentStreams,
    sceneVideoConfig,
    firstStudent
  } = useSmallClassVideoControlContext()

  const {
    myRole,
    rosterUserList
} = useUserListContext()


  const videoStreamList = useMemo(() => {
    return studentStreams.filter(item => item.renderer && item.renderer.videoTrack).map((stream: EduMediaStream) => ({
      isHost: sceneVideoConfig.isHost,
      hideOffPodium: sceneVideoConfig.hideOffPodium,
      username: stream.account,
      stars: stream.stars,
      uid: stream.userUuid,
      micEnabled: stream.audio,
      cameraEnabled: stream.video,
      whiteboardGranted: stream.whiteboardGranted,
      micVolume: stream.micVolume,
      controlPlacement: 'bottom' as any,
      placement: 'bottom' as any,
      hideControl: myRole == 'student',// 学生不能控制席位
      canHoverHideOffAllPodium: true,
      hideBoardGranted: sceneVideoConfig.hideBoardGranted,
      children: (
        <>
          {
            stream.renderer && stream.video ?
              <RendererPlayer
                key={stream.renderer && stream.renderer.videoTrack ? stream.renderer.videoTrack.getTrackId() : ''} track={stream.renderer} id={stream.streamUuid} className="rtc-video"
              />
              : null
          }
          <CameraPlaceHolder state={stream.holderState} />
        </>
      )
    }))
  }, [
    firstStudent,
    studentStreams,
    sceneVideoConfig.hideOffPodium,
    sceneVideoConfig.isHost
  ])
  const {
    onStartPrivateChat,
    onStopPrivateChat,
    inPrivateConversation
  } = usePrivateChatContext()

  const onPrivateChat = async (toUuid: string | number) => {
    if (inPrivateConversation) {
      await onStopPrivateChat(`${toUuid}`)
    } else {
      await onStartPrivateChat(`${toUuid}`)
    }
  }

  const {
    sceneType,
    roomInfo
  } = useRoomContext()
  if(roomInfo.userRole === EduRoleTypeEnum.teacher){
      return (
        <>
          <Tabs className="video-marquee-tab">
            <TabPane className="video-marquee-tab-item" tab={
              <>
                <Button className="video-marquee-tab-btn">上台学员</Button>
              </>
            } key="0">
              {
                videoStreamList.length ?
                  <VideoMarqueeList
                    hideStars={sceneType === 2}
                    videoStreamList={videoStreamList}
                    onCameraClick={onCameraClick}
                    onMicClick={onMicClick}
                    onSendStar={onSendStar}
                    onWhiteboardClick={onWhiteboardClick}
                    onOffPodiumClick={onOffPodiumClick}
                    onPrivateChat={onPrivateChat}
                  />
                : 
                  <div className="video-marquee-pin-empty">
                    <img src={EmptyImage}/>
                    <span>还未有学员上台</span>
                  </div>
              }
            </TabPane>
            <TabPane tab={
              <>
                <Button className="video-marquee-tab-btn">全部学员</Button>
              </> 
            } key="1">
              {
                rosterUserList.length ?
                  <StudentUserListContainer/>
                :
                  <div className="video-marquee-pin-empty">
                    <img src={EmptyImage}/>
                    <span>直播间暂无学员</span>
                  </div>
              }
            </TabPane>
          </Tabs>
        </>
      )
  }else{
    return (
        videoStreamList.length ?
          <VideoMarqueeList
            hideStars={sceneType === 2}
            videoStreamList={videoStreamList}
            onCameraClick={onCameraClick}
            onMicClick={onMicClick}
            onSendStar={onSendStar}
            onWhiteboardClick={onWhiteboardClick}
            onOffPodiumClick={onOffPodiumClick}
            onPrivateChat={onPrivateChat}
          />
        : 
          <div className="video-marquee-pin-empty">
            <img src={EmptyImage}/>
            <span>还未有学员上台</span>
          </div>
    )
  }
})

export const VideoList = observer(() => {

  const {
    isFullScreen
  } = useGlobalContext()

  return (
    <>
      <VideoPlayerTeacher style={{ opacity: isFullScreen ? 0 : 1, transform: isFullScreen ? 'scale(0.9)' : 'scale(1)', transition: '.5s' }} />
      <VideoPlayerStudent controlPlacement="left" style={{ opacity: isFullScreen ? 0 : 1, transform: isFullScreen ? 'scale(0.9)' : 'scale(1)', transition: '.5s' }} />
    </>
  )
})
