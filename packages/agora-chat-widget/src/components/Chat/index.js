import React from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { MessageBox } from '../MessageBox'
// import { InputBox } from '../InputBox'
import { UserList } from '../UserList'
import { Announcement } from '../Announcement'
import { ROLE, CHAT_TABS_KEYS } from '../../contants'
import store from '../../redux/store'
import { selectTabAction, showRedNotification } from '../../redux/actions/messageAction'
import minimize from '../../themes/img/minimize.png'
import notice from '../../themes/img/notice.png'

const { TabPane } = Tabs;

import './index.css'

const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
        {({ style }) => (
            <DefaultTabBar {...props} className="tab-class" style={{ ...style }} />
        )}
    </Sticky>
);

const onTabChange = (key) => {
    console.log('key>>>', key);
    store.dispatch(selectTabAction(key))
    switch (key) {
        case "CHAT":
            store.dispatch(showRedNotification(false))
            break;
        default:
            break;
    }

}

// 主页面，定义 tabs
export const Chat = () => {
    const state = useSelector(state => state)
    const announcement = state?.room.announcement;
    const showRed = state?.showRed;
    const roleType = state?.userInfo.ext;
    // 直接在 propsData 中取值
    const isTeacher = roleType && JSON.parse(roleType).role === ROLE.teacher.id;
    return <div>
        {showRed && <div className="red-notice"></div>}
        <StickyContainer>
            <Tabs defaultActiveKey={CHAT_TABS_KEYS.chat} renderTabBar={renderTabBar} onChange={onTabChange}>
                <TabPane tab="聊天" key={CHAT_TABS_KEYS.chat}>
                    {
                        announcement && announcement.length > 0 && <div className="notice">
                            <img src={notice} alt="通知" className="notice-icon" />
                            <span className="notice-text">{announcement}</span>
                        </div>
                    }
                    <MessageBox />
                </TabPane>
                {isTeacher && <TabPane tab="成员" key={CHAT_TABS_KEYS.user}>
                    <UserList />
                </TabPane>}
                <TabPane tab="公告" key={CHAT_TABS_KEYS.announcement}>
                    <Announcement />
                </TabPane>
            </Tabs>
            <div className="mini-icon">
                <img src={minimize} alt="最小化" />
            </div>
        </StickyContainer>
        <div>

        </div>

    </div>
}