import classnames from 'classnames';
import { Icon, IconProps } from '~components/icon';
import { Column, Profile } from '~components/roster';
import {getCameraState, getMicrophoneState} from './base';

export const defaultColumns: Column[] = [
  {
    key: 'name',
    name: 'roster.student_name',
  },
  {
    key: 'onPodium',
    name: 'roster.student_co_video',
    action: 'podium',
    render: (_, profile, canOperate) => {
      const type =  !!profile.onPodium === true ? 'on-podium' : 'invite-to-podium';
      const operateStatus = !!canOperate === true ? 'operate-status' : 'un-operate-status';
      const podiumStatus= !!profile.onPodium === true ? 'icon-active' : 'un-active';
      const cls = classnames({
        [`${operateStatus}`]: 1,
        [`${podiumStatus}`]: 1,
      })
      return (
        <Icon type={type} className={cls} iconhover={canOperate}/>
      );
    }
  },
  {
    key: 'whiteboardGranted',
    name: 'roster.granted',
    action: 'whiteboard',
    render: (_, profile, canOperate) => {
      const operateStatus = !!canOperate === true ? 'operate-status' : 'un-operate-status';
      const whiteboardStatus = !!profile.whiteboardGranted === true ? 'icon-active' : 'un-active';
      let type = 'authorized-operate';
      if(!!profile.whiteboardGranted === true){
        if(!!canOperate === true){
          type = 'authorized-operate'
        }else{
          type = 'authorized-un-operate'
        }
      }else{
        if(!!canOperate === true){
          type = 'un-authorized-operate'
        }else{
          type = 'un-authorized-un-operate'
        }
      }
      const cls = classnames({
        [`${operateStatus}`]: 1,
      })
      return (
        <Icon type={type as any} className={cls} iconhover={canOperate}/>
      )
    },
  },
  {
    key: 'cameraEnabled',
    name: 'roster.camera_state',
    action: 'camera',
    render: (_, profile, canOperate) => {
      const {
        operateStatus,
        cameraStatus,
        type,
      } = getCameraState(profile, canOperate);
      const cls = classnames({
        [`${operateStatus}`]: 1,
        [`${cameraStatus}`]: 1,
      })
      return (
        <Icon type={type} className={cls} iconhover={canOperate}/>
      )
    },
  },
  {
    key: 'micEnabled',
    name: 'roster.microphone_state',
    action: 'mic',
    render: (_, profile, canOperate) => {
      const {
        operateStatus,
        microphoneStatus,
        type,
      } = getMicrophoneState(profile, canOperate);
      const cls = classnames({
        [`${operateStatus}`]: 1,
        [`${microphoneStatus}`]: 1,
      })
      return (
        <Icon type={type} className={cls} iconhover={canOperate}/>
      )
    },
  },
  {
    key: 'stars',
    name: 'roster.reward',
    render: (text, profile: Profile, canOperate) => {
      const operateStatus = !!canOperate === true ? 'operate-status' : 'un-operate-status';
      const cls = classnames({
        [`${operateStatus}`]: 1,
      })
      return (
        <div>
          <Icon type={'star-outline'} className={cls} iconhover={canOperate}/>
          <span className="star-nums">&nbsp;x{text}</span>
        </div>
      )
    },
  },
  {
    key: 'kickOut',
    name: 'roster.kick',
    action: 'kickOut',
    visibleRoles: ['assistant', 'teacher'],
    render: (_, profile, canOperate) => {
      const operateStatus = !!canOperate === true ? 'operate-status' : 'un-operate-status';
      const cls = classnames({
        [`${operateStatus}`]: 1,
      })
      return (
        <Icon type={'exit'} className={cls} iconhover={canOperate}/>
      )
    },
  },
];
