import { useHomeStore } from "@/infra/hooks"
import { changeLanguage, Home } from "@/ui-kit"
import {storage} from '@/infra/utils'
import { homeApi, LanguageEnum } from "agora-edu-core"
import { EduRoleTypeEnum, EduRoomTypeEnum, EduSceneType } from "agora-rte-sdk"
import { observer } from "mobx-react"
import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useHistory } from "react-router"
import { AgoraEduSDK, AgoraRegion, LaunchOption } from "@/infra/api"
import AgoraRTC from 'agora-rtc-sdk-ng'
const isProd = process.env.NODE_ENV === 'production'

export const TestHomePage = observer(() => {

  const homeStore = useHomeStore()

  const [roomId, setRoomId] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [roomName, setRoomName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [userRole, setRole] = useState<string>('')
  const [curScenario, setScenario] = useState<string>('')
  const [duration, setDuration] = useState<number>(60)
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [language, setLanguage] = useState<string>(sessionStorage.getItem('language') || 'zh')
  const [region, setRegion] = useState<AgoraRegion>('CN')
  const [debug, setDebug] = useState<boolean>(false)

  useEffect(() => {
    changeLanguage(language)
    setLanguage(language)
  }, [])

  const onChangeRegion = (region: string) => {
    setRegion(region as AgoraRegion)
  }

  const onChangeLanguage = (language: string) => {
    sessionStorage.setItem('language', language)
    changeLanguage(language)
    setLanguage(language)
  }

  const role = useMemo(() => {
    const roles = {
      'teacher': EduRoleTypeEnum.teacher,
      'assistant': EduRoleTypeEnum.assistant,
      'student': EduRoleTypeEnum.student,
      'incognito': EduRoleTypeEnum.invisible
    }
    return roles[userRole]
  }, [userRole])

  const scenario = useMemo(() => {
    const scenes = {
      '1v1': EduSceneType.Scene1v1,
      'mid-class': EduSceneType.SceneMedium,
      'big-class': EduSceneType.SceneLarge,
    }
    return scenes[curScenario]
  }, [curScenario])



  const onChangeRole = (value: string) => {
    setRole(value)
  }

  const onChangeScenario = (value: string) => {
    setScenario(value)
  }

  const onChangeRoomId = (newValue: string) => {
    setRoomId(newValue)
  }

  const onChangeUserId = (newValue: string) => {
    setUserId(newValue)
  }

  const onChangeRoomName = (newValue: string) => {
    setRoomName(newValue)
  }

  const onChangeUserName = (newValue: string) => {
    setUserName(newValue)
  }

  const onChangeDebug = (newValue: boolean) => {
    setDebug(newValue)
  }

  const history = useHistory()

  // const [courseWareList, updateCourseWareList] = useState<any[]>(storage.getCourseWareSaveList())

  let resourceUuid = "ec1a72e4-706a-4c19-bd9d-3558738f1a2b"
  let resourceName = "不等式"
  let sceneInfos = []
  let sceneInfo = {
      name: "1",
      ppt: {
          src: "pptx://....",
          width: 480,
          height: 360
      }
  }

  sceneInfos.push(sceneInfo)

  let courseWareList = [{
      resourceUuid,
      resourceName,
      size:  394.922,
      updateTime: new Date().getTime(),
      ext: "pdf",
      url: "https://lkl-whiteboard.oss-cn-shanghai.aliyuncs.com/whiteboard/不等式学生.pdf",
      scenes: sceneInfos,
      conversion: {
        type: "static",
      },
  }]

  // @ts-ignore
  const SDKVersion = window.isElectron ? window.rtcEngine.getVersion().version : AgoraRTC.VERSION
  return (
    <Home
      version={REACT_APP_BUILD_VERSION}
      SDKVersion={SDKVersion}
      publishDate={REACT_APP_PUBLISH_DATE}
      roomId={roomId}
      userId={userId}
      roomName={roomName}
      userName={userName}
      role={userRole}
      scenario={curScenario}
      duration={duration}
      startDate={startDate}
      region={region}
      debug={debug}
      onChangeDebug={onChangeDebug}
      onChangeRegion={onChangeRegion}
      onChangeRole={onChangeRole}
      onChangeScenario={onChangeScenario}
      onChangeRoomId={onChangeRoomId}
      onChangeUserId={onChangeUserId}
      onChangeRoomName={onChangeRoomName}
      onChangeUserName={onChangeUserName}
      onChangeStartDate={(date: Date) => {
        setStartDate(date)
      }}
      onChangeDuration={(duration: number) => {
        setDuration(duration)
      }}
      language={language}
      onChangeLanguage={onChangeLanguage}
      onClick={async () => {
        let {rtmToken} = await homeApi.login(userId)
        console.log('## rtm Token', rtmToken)
        homeStore.setLaunchConfig({
          // rtmUid: userUuid,
          pretest: true,
          // courseWareList: courseWareList,
          courseWareList: [],
          personalCourseWareList: [],
          // personalCourseWareList: courseWareList.slice(1, courseWareList.length),
          language: 'zh' as LanguageEnum,
          userUuid: userId,
          rtmToken,
          roomUuid: roomId,
          roomType: EduRoomTypeEnum.RoomSmallClass,
          roomName: `${roomName}`,
          userName: userName,
          roleType: role,
          startTime: +startDate,
          region,
          duration: duration * 60,
        })
        history.push('/launch')
      }}
    />
  )
})

export const ProdHomePage =  observer(() => {
  const history = useHistory()
  const homeStore = useHomeStore()
  
  useEffect(() => {
    window.addEventListener("message", async (event) => {
      //TODO 需要加上origin判断，防止非法的参数传递
      if(!event.data){
        return
      }
      window.opener.postMessage("recieved", "*")
      const lauchOptions:LaunchOption = event.data
      // TODO 参数校验
      homeStore.setLaunchConfig(lauchOptions)
      history.push('/launch')
    }, false)
  }, [])

  return (
    <div>
    </div>
  )
})

