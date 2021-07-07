import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TextMsg } from './TextMsg'
import { CmdMsg } from './CmdMsg'
import { InputBox } from '../InputBox'
import scrollElementToBottom from '../../utils/scrollElementToBottom'
import noMessage_icon from '../../themes/img/noMessage.png'
import './index.css'

// 聊天页面
export const MessageBox = () => {
    const state = useSelector(state => state);
    const msgs = state?.messages;
    const loginUser = state?.loginUser;
    let isHaveMsg = msgs && msgs.length > 0;

    useEffect(() => {
        let scrollElement = document.getElementById('messages')
        scrollElementToBottom(scrollElement)
    }, [msgs])

    return <div >
        {isHaveMsg ? <div className="message-box" id="messages">
            {
                msgs && msgs.map((item, key) => {
                    const isText = item?.contentsType === "TEXT" || item?.type === "txt"
                    const isCmd = item?.contentsType === "COMMAND" || item?.type === "cmd"
                    return (
                        <div key={key}>
                            {isText && <TextMsg item={item} />}
                            {isCmd && <CmdMsg item={item} />}
                        </div>
                    )
                })
            }
        </div> : <div className="no-msgs">
            <img src={noMessage_icon} />
            <span>还没有消息</span>
        </div>
        }
        <InputBox />
    </div>
}