import { formatCountDown, TimeFormatType } from '@/infra/utils'
import { useGlobalContext, useMediaContext, useRecordingContext, useRoomContext } from 'agora-edu-core'
import { EduRoleTypeEnum } from 'agora-rte-sdk'
import { observer } from 'mobx-react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { BizHeader, transI18n, BizClassStatus } from '~ui-kit'
import { Exit, Record } from '../dialog'
import { SettingContainer } from '../setting'

export const NavigationBar = observer(() => {
  const {
    isRecording
  } = useRecordingContext()
  const {
    roomInfo,
    liveClassStatus
  } = useRoomContext()

  console.log('NavigationBar# isRecording', isRecording, 'roomInfo', roomInfo)

  const {
    isNative,
    cpuUsage,
    networkQuality,
    networkLatency,
    packetLostRate
  } = useMediaContext()

  const {
    addDialog
  } = useGlobalContext()

  const addRecordDialog = useCallback(() => {
    return addDialog(Record, {starting: isRecording})
  }, [addDialog, Record, isRecording])

  const bizHeaderDialogs = {
    'setting': () => addDialog(SettingContainer),
    'exit': () => addDialog(Exit),
    'record': () => addRecordDialog(),
  }

  function handleClick (type: string) {
    const showDialog = bizHeaderDialogs[type]
    showDialog && showDialog(type)
  }

  const formatTime = useMemo(() => {
    const {duration} = liveClassStatus
    return formatCountDown(duration, TimeFormatType.Timeboard)
  }, [JSON.stringify(liveClassStatus), formatCountDown])

  const userType = useMemo(() => {
    if (roomInfo.userRole === EduRoleTypeEnum.teacher) {
      return 'teacher'
    }
    return 'student'
  }, [roomInfo.userRole])

  return (
    <BizHeader
      userType={userType}
      isNative={isNative}
      formatTime={formatTime}
      classState={liveClassStatus.classState as BizClassStatus}
      isRecording={isRecording}
      title={roomInfo.roomName}
      signalQuality={networkQuality as any}
      monitor={{
        cpuUsage: cpuUsage,
        networkLatency: networkLatency,
        networkQuality: networkQuality,
        packetLostRate: packetLostRate,
      }}
      onClick={handleClick}
    />
  )
})