import _ from 'lodash'
import { setUserInfo } from './userInfo';
let qaReadMsgs = {}
export const saveReadMsgID = (option) => {
    const { lastUserId, lastUserMsg } = option
    if (!option.lastUserMsg) return
    let obj = { [option.lastUserId]: lastUserMsg }
    if (qaReadMsgs[lastUserId] == lastUserMsg) return
    qaReadMsgs = _.assign(qaReadMsgs, obj)
    setUserInfo(qaReadMsgs);
}

export const setReadMsgId = (val) => {
    qaReadMsgs = _.assign({}, val)
}

export const getQAReadMsg = () => qaReadMsgs
