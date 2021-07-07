import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ShowAnnouncement } from './ShowAnnouncement'
import { EditAnnouncement } from './EditAnnouncement'

import announcement from '../../themes/img/announcement.png'

import './index.css'


// 公告
export const Announcement = () => {
    const [showEdit, setShowEdit] = useState(true)
    // store 取值
    const onEdit = (val) => {
        setShowEdit(val)
    }
    return (
        <div>
            {showEdit && <ShowAnnouncement onEdit={onEdit} />}
            {!showEdit && <EditAnnouncement onEdit={onEdit} />}
        </div>
    )
}