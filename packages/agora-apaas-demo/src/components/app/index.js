import {AgoraEduSDK} from 'agora-classroom-sdk'


export default class App {
    constructor (elem) {
      if (!elem) return
      this.elem = elem
    }

    setupClassroom() {
      AgoraEduSDK.config({
        appId: "13b49217997e44f3a560461ee6b6935d",
      })
      AgoraEduSDK.launch(
        document.querySelector(`#${this.elem.id}`), {
          rtmToken: "00613b49217997e44f3a560461ee6b6935dIAAH8eWTuFOvM0NiYcBvIo9Ihv70hQtfGTHF4a8wWUcXWVegUeUAAAAAEAAP4XcJC3zcYAEA6AMAAAAA",
          userUuid: "test",
          userName: "teacher",
          roomUuid: "4321",
          roleType: 1,
          roomType: 0,
          roomName: "demo-class",
          pretest: false,
          language: "en",
          startTime: new Date().getTime(),
          duration: 60 * 30,
          courseWareList: [],
          listener: (evt) => {
            console.log("evt", evt)
          }
        }
      )
    }
}