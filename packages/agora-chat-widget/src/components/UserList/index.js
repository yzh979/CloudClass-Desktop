import React from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd';
import { ROLE } from '../../contants'
import { setUserMute, removeUserMute } from '../../api/mute'
import _ from 'lodash'
import muteNo from '../../themes/img/muteNo.png'
import muteOff from '../../themes/img/muteOff.png'
import './index.css'


const mute = (roomId, val, userId) => {
    if (val) {
        removeUserMute(roomId, userId)
    } else {
        setUserMute(roomId, userId)
    }
}



// 成员页面
export const UserList = () => {
    const state = useSelector(state => state);
    // 改成枚举
    const roomId = state?.room.info.id;
    const roomUsers = state?.room.roomUsers;
    const roomUsersInfo = state?.room.roomUsersInfo;
    const muteList = state?.room.muteList;

    return <div>
        {
            roomUsers && roomUsers.map((item, key) => {
                console.log('roomUsers>>>', roomUsers);
                console.log('roomUsersInfo>>>', roomUsersInfo);
                let isTeacher = Object.keys(roomUsersInfo).length > 0 && (JSON.parse(roomUsersInfo[item]?.ext).role === ROLE.teacher.id);
                let showMuteIcon = muteList && muteList.includes(item)
                return (
                    <div className="user-list" key={key}>
                        <div className="user-info">
                            <img src={roomUsersInfo[item]?.avatarurl} alt="头像" className="user-avatar" />
                            <span className="user-text" >{roomUsersInfo[item]?.nickname}</span>
                            {isTeacher ?
                                <Tag className="user-tag teacher-tag" >
                                    <span >
                                        {ROLE.teacher.tag}
                                    </span>
                                </Tag> : <Tag className="user-tag student-tag">
                                    <span className="tag-text">
                                        {ROLE.student.tag}
                                    </span>
                                </Tag>}
                        </div>
                        {!isTeacher && <div className="mute-icon">
                            <img src={showMuteIcon ? muteOff : muteNo} onClick={(e) => { mute(roomId, showMuteIcon, item) }} />
                        </div>}
                    </div>

                )
            })
        }
    </div>

}