import { observer } from 'mobx-react';
import * as React from 'react';
import {
  useUserListContext,
  useStreamListContext,
  useRoomContext,
  useChatContext,
} from 'agora-edu-core';
import { EduRoleTypeEnum, EduStream } from 'agora-rte-sdk';
import { get, debounce } from 'lodash';
import { useCallback, useMemo } from 'react';
import { StudentRoster, StudentRosterProfile } from '~ui-kit/components/roster2';
import { KickDialog } from '../../dialog';
import { useUIStore } from '@/infra/hooks';
import { useScrollFetch } from '@/infra/hooks/infinite-scroll';

export type UserListContainerProps = {
  onClose: () => void;
};

export const StudentUserListContainer: React.FC<UserListContainerProps> = observer((props) => {
  const { streamList, muteVideo, muteAudio, unmuteAudio, unmuteVideo } = useStreamListContext();

  const { addDialog, addToast } = useUIStore();

  const { roomInfo } = useRoomContext();

  const { muteUserChat, unmuteUserChat } = useChatContext();

  const { localUserInfo, teacherInfo, fetchUserList } = useUserListContext();

  const scrollFetchOptions = useMemo(
    () => ({
      onError: (message: string) => addToast(message, 'error'),
    }),
    [],
  );

  const scrollFetch = useCallback(async (params) => {
    const data = await fetchUserList(params);
    return {
      ...data,
      list: data.list as unknown as StudentRosterProfile[],
    };
  }, []);

  const { fetchNext, list, hasMore, setList } = useScrollFetch<
    StudentRosterProfile,
    { type: '0' | '1'; userName: string }
  >(scrollFetch, scrollFetchOptions);

  const onClick = useCallback(
    async (actionType: any, uid: any) => {
      const userList = list;
      const user = userList.find((user: StudentRosterProfile) => user.uid === uid);

      if (!user) {
        return;
      }
      switch (actionType) {
        case 'camera': {
          const targetStream = streamList.find(
            (stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === uid,
          );
          if (targetStream) {
            const isLocal = roomInfo.userUuid === uid;
            if (targetStream.hasVideo) {
              await muteVideo(uid, isLocal);
            } else {
              await unmuteVideo(uid, isLocal);
            }
          }
          break;
        }
        case 'mic': {
          const targetStream = streamList.find(
            (stream: EduStream) => get(stream.userInfo, 'userUuid', 0) === uid,
          );
          if (targetStream) {
            const isLocal = roomInfo.userUuid === uid;
            if (targetStream.hasAudio) {
              await muteAudio(uid, isLocal);
            } else {
              await unmuteAudio(uid, isLocal);
            }
          }
          break;
        }
        case 'chat': {
          const targetUser = list.find((user) => get(user, 'uid', '') === uid) as any;
          if (targetUser) {
            if (targetUser.chatEnabled) {
              targetUser.chatEnabled = false;
              await muteUserChat(uid).catch(() => (targetUser.chatEnabled = true));
            } else {
              targetUser.chatEnabled = true;
              await unmuteUserChat(uid).catch(() => (targetUser.chatEnabled = false));
            }
          }
          setList([...list]);
          break;
        }
        case 'kickOut': {
          if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
            addDialog(KickDialog, { userUuid: uid, roomUuid: roomInfo.roomUuid });
          }
          break;
        }
      }
    },
    [list, roomInfo.roomUuid, roomInfo.userRole],
  );

  const userType = useMemo(() => {
    if ([EduRoleTypeEnum.assistant, EduRoleTypeEnum.teacher].includes(roomInfo.userRole)) {
      return 'teacher';
    }
    return 'student';
  }, [roomInfo.userRole]);

  const debouncedFetchNext = useMemo(() => debounce(fetchNext, 300), [fetchNext]);

  return (
    <StudentRoster
      isDraggable={true}
      localUserUuid={localUserInfo.userUuid}
      // role={localUserInfo.role as any}
      teacherName={teacherInfo?.userName || ''}
      // dataSource={dataList}
      dataSource={list}
      userType={userType}
      onClick={onClick}
      onClose={props.onClose}
      onChange={(text: string) => {
        debouncedFetchNext({ userName: text, nextId: null }, true);
      }}
      onFetch={fetchNext}
      hasMore={hasMore}
    />
  );
});
