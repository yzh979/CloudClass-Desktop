import { formatCountDown, TimeFormatType } from '@/infra/utils'
import { useGlobalContext, useMediaContext, useRoomContext, useBoardContext, useUserListContext } from 'agora-edu-core'
import { EduRoleTypeEnum } from 'agora-rte-sdk'
import { observer } from 'mobx-react'
import { useCallback } from 'react'
import { useMemo ,useEffect} from 'react'
import { BizHeader, transI18n, BizClassStatus } from '~ui-kit'
import {Exit, Record, TeacherExitDialog} from '../dialog'
import { SettingContainer } from '../setting'
import { UserListDialog } from '~capabilities/containers/dialog'
import copy from 'copy-to-clipboard'
export const NavigationBar = observer(() => {
  // const {
  //   isRecording,
  //   recordStartTime
  // } = useRecordingContext()
  // const appStore = useCoreContext()

  const {
    roomInfo,
    liveClassStatus,
    liveRecordStatus
  } = useRoomContext()

  // console.log('NavigationBar# isRecording', liveRecordStatus.isRecording, 'roomInfo', roomInfo)

  const {
    isNative,
    cpuUsage,
    networkQuality,
    networkLatency,
    packetLostRate
  } = useMediaContext()

  const {
    params,
    addDialog,
    isFullScreen
  } = useGlobalContext()


  const {
    zoomBoard
  } = useBoardContext()
  const {
    rosterUserList
  } = useUserListContext()
  const addRecordDialog = useCallback(() => {
    console.log('tag' , ' * * * * * addRecordDialog')
    return addDialog(Record, {starting: liveRecordStatus.isRecording})
  }, [addDialog, Record, liveRecordStatus.isRecording])


  const listener = useCallback((e)=>{
    console.log('tag' , 'key press evnet listener  , e keycoe = ' + e.keyCode)
    if (e.keyCode === 27){
      if(isFullScreen){
        zoomBoard('fullscreenExit')
      }
    }
  }, [isFullScreen, zoomBoard])

  const copyParams = useCallback(() => {
    copy(JSON.stringify(params))
  }, [params])
  
  useEffect(() => {
    document.addEventListener('keydown',listener);
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [listener])


  const bizHeaderDialogs = {
    'setting': () => addDialog(SettingContainer),
    'exit': () => addDialog(Exit),
    'record': () => addRecordDialog(),
    'roster': () => addDialog(UserListDialog),
  }



  function handleClick (type: string) {
    if(type == 'fullscreen'){
      if(isFullScreen){
        zoomBoard('fullscreenExit')
      }else{
        zoomBoard('fullscreen')
      }
    }else{
      const showDialog = bizHeaderDialogs[type]
      showDialog && showDialog(type)
    }
  }

  const classFormatTime = useMemo(() => {
    const {duration} = liveClassStatus 
    return formatCountDown(duration, TimeFormatType.Timeboard)
  }, [JSON.stringify(liveClassStatus), formatCountDown])

  const recordFormatTime = useMemo(() => {
    const {duration} = liveRecordStatus
    return formatCountDown(duration, TimeFormatType.Timeboard)
  }, [JSON.stringify(liveRecordStatus), formatCountDown])
  

  const userType = useMemo(() => {
    if (roomInfo.userRole === EduRoleTypeEnum.teacher) {
      return 'teacher'
    }
    return 'student'
  }, [roomInfo.userRole])
  return (
    <BizHeader
      isFullScreen={isFullScreen}
      userType={userType}
      isNative={isNative}
      classFormatTime={classFormatTime}
      classState={liveClassStatus.classState as BizClassStatus}
      isRecording={liveRecordStatus.isRecording}
      recordFormatTime={recordFormatTime}
      title={roomInfo.roomName}
      signalQuality={networkQuality as any}
      monitor={{
        cpuUsage: cpuUsage,
        networkLatency: networkLatency,
        networkQuality: networkQuality,
        packetLostRate: packetLostRate,
      }}
      onClick={handleClick}
      studentInClassCnt={roomInfo.studentNum}
      studentInRoomCnt={rosterUserList.length}
      onRoomNameClick={copyParams}
    />
  )
})