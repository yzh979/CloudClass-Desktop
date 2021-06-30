import store from '../redux/store'
import { loginInfo, memberInfo } from '../redux/aciton'
import WebIM from "../utils/WebIM";

// 设置自己的用户属性
export const setUserInfo = () => {
    const userRoleType = Number(store.getState().extData.roleType);
    const robotAvatarUrl = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/recordRobot.webp'
    const userAvatarUrl = userRoleType === 0 ? robotAvatarUrl : store.getState().extData.imAvatarUrl;
    const userNickName = userRoleType === 0 ? "录制机器人" : store.getState().extData.userName;
    let options = {
        nickname: userNickName,
        avatarurl: userAvatarUrl,
        ext: userRoleType
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        store.dispatch(loginInfo(res.data))
    })
}

// 获取用户属性
export const getUserInfo = async (member, callback = null) => {
    let count = 0;
    while (member.length > count) {
        let curmembers = member.slice(count, count + 100);
        await WebIM.conn.fetchUserInfoById(curmembers).then((res) => {
            store.dispatch(memberInfo(res.data))
            callback && callback()
        })
        count += 100;
    }

}