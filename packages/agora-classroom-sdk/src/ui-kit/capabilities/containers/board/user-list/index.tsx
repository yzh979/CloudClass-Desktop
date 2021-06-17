import { Roster } from '~ui-kit';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useUserListContext, useStreamListContext, useBoardContext, useGlobalContext, useRoomContext, useVideoControlContext } from 'agora-edu-core';
import { EduRoleTypeEnum, EduStream, EduVideoSourceType } from 'agora-rte-sdk';
import { RosterUserInfo } from '@/infra/stores/types';
import { get } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { StudentRoster } from '@/ui-kit/components';
import { KickDialog } from '../../dialog';



export type UserListContainerProps = {
    onClose: () => void
}

export const UserListContainer: React.FC<UserListContainerProps> = observer((props) => {

    const {
        revokeBoardPermission,
        grantBoardPermission,
    } = useBoardContext()
    const {
        onSendStar
    } = useVideoControlContext()
    const {
        streamList
    } = useStreamListContext()

    const {
        addDialog,
    } = useGlobalContext()

    const {
        muteVideo,
        muteAudio,
        unmuteAudio,
        unmuteVideo,
        roomInfo
    } = useRoomContext()

    const {
        localUserUuid,
        myRole,
        teacherName,
        rosterUserList,
        revokeCoVideo,
        teacherAcceptHandsUp,
    } = useUserListContext()

    const onClick = useCallback(async (actionType: any, uid: any) => {
        const userList = rosterUserList
        const user = userList.find((user: RosterUserInfo) => user.uid === uid)

        if (!user) {
            return
        }
        switch (actionType) {
            case 'podium': {
                if (user.onPodium) {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await revokeCoVideo(user.uid)
                    }
                } else {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await teacherAcceptHandsUp(user.uid)
                    }
                }
                break;
            }
            case 'whiteboard': {
                if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                    if (user.whiteboardGranted) {
                        await revokeBoardPermission(uid)
                    } else {
                        await grantBoardPermission(uid)
                    }
                }
                break;
            }
            case 'camera': {
                const targetStream = streamList.find((stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === uid)
                if (targetStream) {
                    const isLocal = roomInfo.userUuid === uid
                    if (targetStream.hasVideo) {
                        await muteVideo(uid, isLocal)
                    } else {
                        await unmuteVideo(uid, isLocal)
                    }
                }
                break;
            }
            case 'mic': {
                const targetStream = streamList.find((stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === uid)
                if (targetStream) {
                    const isLocal = roomInfo.userUuid === uid
                    if (targetStream.hasAudio) {
                        await muteAudio(uid, isLocal)
                    } else {
                        await unmuteAudio(uid, isLocal)
                    }
                }
                break;
            }
            case 'kickOut': {
                if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                    addDialog(KickDialog, { userUuid: uid, roomUuid: roomInfo.roomUuid })
                }
                break;
            }
            case 'reward': {
                onSendStar(uid)
                break;
            }
        }
    }, [rosterUserList, roomInfo.roomUuid, roomInfo.userRole])

    return (
        <Roster
            isDraggable={true}
            localUserUuid={localUserUuid}
            role={myRole as any}
            teacherName={teacherName}
            dataSource={rosterUserList}
            onClick={onClick}
            onClose={props.onClose}
        />
    )
})

export type StudentUserListContainerProps = {
}

export const StudentUserListContainer: React.FC<StudentUserListContainerProps> = observer((props) => {
    const {
        onSendStar
    } = useVideoControlContext()


    const {
        revokeBoardPermission,
        grantBoardPermission,
    } = useBoardContext()

    const {
        roomInfo
    } = useRoomContext()

    const {
        localUserUuid,
        rosterUserList,
        revokeCoVideo,
        teacherAcceptHandsUp
    } = useUserListContext()


    const dataList = rosterUserList

    const onClick = useCallback(async (actionType: any, uid: any) => {
        const userList = dataList
        const user = userList.find((user: RosterUserInfo) => user.uid === uid)

        if (!user) {
            return
        }
        switch (actionType) {
            case 'podium': {
                if (user.onPodium) {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await revokeCoVideo(user.uid)
                    }
                } else {
                    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                        await teacherAcceptHandsUp(user.uid)
                    }
                }
                break;
            }
            case 'whiteboard': {
                if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
                    if (user.whiteboardGranted) {
                        await revokeBoardPermission(uid)
                    } else {
                        await grantBoardPermission(uid)
                    }
                }
                break;
            }
            case 'reward': {
                onSendStar(uid)
                break;
            }
        }
    }, [dataList, roomInfo.roomUuid, roomInfo.userRole])

    return (
        <StudentRoster
            localUserUuid={localUserUuid}
            dataSource={dataList}
            onClick={onClick}
        />
    )
})