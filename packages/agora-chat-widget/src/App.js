import React, { useEffect, useState } from 'react';
import WebIM, { initIMSDK } from './utils/WebIM';
import store from './redux/store'
import { propsAction } from './redux/actions/propsAction'
import { statusAction, clearStore } from './redux/actions/userAction'
import { messageAction, showRedNotification } from './redux/actions/messageAction'
import { roomAllMute, roomUsers, isUserMute } from './redux/actions/roomAction'
import { loginIM } from './api/login'
import { setUserInfo, getUserInfo } from './api/userInfo'
import { joinRoom, getAnnouncement } from './api/chatroom'
import { getRoomWhileList } from './api/mute'
import _ from 'lodash'
import { Chat } from './components/Chat'
import { message } from 'antd'
import { LOGIN_SUCCESS, CHAT_TABS_KEYS } from './contants'
import './App.css'
import 'antd/dist/antd.css'

const App = function (props) {
  useEffect(() => {
    let im_Data = props.pluginStore.pluginStore;
    let im_Data_Props = _.get(im_Data, 'props', {})
    let im_Data_RoomInfo = _.get(im_Data, 'context.roomInfo', {})
    let im_Data_UserInfo = _.get(im_Data, 'context.localUserInfo', {})
    let new_IM_Data = _.assign(im_Data_Props, im_Data_RoomInfo, im_Data_UserInfo)
    let appkey = im_Data_Props.orgName + '#' + im_Data_Props.appName;
    store.dispatch(propsAction(new_IM_Data));
    if (appkey) {
      initIMSDK(appkey)
    }
    createListen(new_IM_Data, appkey)
    loginIM(appkey);
  }, [])

  let arr = []
  let intervalId;
  const createListen = (new_IM_Data, appkey) => {
    WebIM.conn.listen({
      onOpened: () => {
        store.dispatch(statusAction(true))
        message.success(LOGIN_SUCCESS);
        setUserInfo()
        joinRoom()
      },
      onClosed: (err) => {
        console.log('退出', err);
        store.dispatch(statusAction(false))
        store.dispatch(clearStore({}))
      },
      onError: (message) => {
        console.log('onError>>>', message);
        const type = JSON.parse(_.get(message, 'data.data')).error_description;
        const resetName = store.getState().propsData.userUuid;
        if (message.type === '16') {
          return
        } else if (type === "user not found") {
          let options = {
            username: resetName.toLocaleLowerCase(),
            password: resetName,
            appKey: appkey,
            success: function () {
              loginIM(appkey);
            },
          };
          WebIM.conn.registerUser(options);
        }
      },
      onTextMessage: (message) => {
        console.log('onTextMessage>>>', message);
        store.dispatch(messageAction(message, { isHistory: false }))
        const isShowRed = store.getState().isTabKey !== CHAT_TABS_KEYS.chat;
        store.dispatch(showRedNotification(isShowRed))
      },
      onCmdMessage: (message) => {
        console.log('onCmdMessaeg>>>', message);
        store.dispatch(messageAction(message, { showNotice: store.getState().isTabKey !== CHAT_TABS_KEYS.chat, isHistory: false }))
      },
      onPresence: (message) => {
        console.log('onPresence>>>', message);
        const userCount = _.get(store.getState(), 'room.info.affiliations_count')
        const roomUserList = _.get(store.getState(), 'room.roomUsers')
        switch (message.type) {
          case "memberJoinChatRoomSuccess":
            arr.push(message.from)
            intervalId && clearInterval(intervalId);
            intervalId = setTimeout(() => {
              let users = _.cloneDeep(arr);
              arr = [];
              getUserInfo(users)
            }, 500);
            let ary = []
            roomUserList.map((v, k) => {
              ary.push(v)
            })
            if (!(ary.includes(message.from))) {
              store.dispatch(roomUsers(message.from, 'addMember'))
            }
            break;
          case "leaveChatRoom":
            // 成员数 - 1
            // 移除成员
            store.dispatch(roomUsers(message.from, 'removeMember'))
            break;
          case "updateAnnouncement":
            getAnnouncement(message.gid)
            break;
          case "deleteAnnouncement":
            getAnnouncement(message.gid)
            break;
          case 'muteChatRoom':
            store.dispatch(roomAllMute(true))
            break;
          case 'rmChatRoomMute':
            store.dispatch(roomAllMute(false))
            break;
          // 删除聊天室白名单成员
          case 'rmUserFromChatRoomWhiteList':
            getRoomWhileList(message.gid);
            store.dispatch(isUserMute(false))
            break;
          // 增加聊天室白名单成员
          case 'addUserToChatRoomWhiteList':
            getRoomWhileList(message.gid);
            store.dispatch(isUserMute(true))
            break;
          default:
            break;
        }
      }

    })
  }

  return (
    <div className="app">
      <Chat />
    </div >
  );
}
export default App;

