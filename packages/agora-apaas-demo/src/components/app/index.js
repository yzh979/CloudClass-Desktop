import { AgoraEduSDK } from 'agora-classroom-sdk';

export default class App {
  constructor(elem) {
    if (!elem) return;
    this.elem = elem;
  }

  setupClassroom() {
    AgoraEduSDK.config({
      appId: 'appId',
    });
    AgoraEduSDK.launch(document.querySelector(`#${this.elem.id}`), {
      rtmToken: 'rtmToken',
      userUuid: 'userUuid',
      userName: 'userName',
      roomUuid: 'roomUuid',
      roleType: 1,
      roomType: 4,
      roomName: 'roomName',
      pretest: true,
      language: 'en',
      startTime: new Date().getTime(),
      duration: 60 * 30,
      courseWareList: [],
      listener: (evt) => {
        console.log('evt', evt);
      },
    });
  }
}
