import classnames from 'classnames';
import { Icon } from '~components/icon';
import { Column, Profile } from '~components/roster';
import {getCameraState, getMicrophoneState} from './base';

import Star from './assets/star.png'
import StarActive from './assets/star-active.png'

import Covideo from './assets/covideo.png'
import CovideoActive from './assets/covideo-active.png'

import Pen from './assets/pen.png'
import PenActive from './assets/pen-active.png'

import Kick from './assets/kick.png'
import KickActive from './assets/kick-active.png'

import Camera from './assets/camera.png'
import CameraDisable from './assets/camera-disable.png'

import Microphone from './assets/microphone.png'
import MicrophoneDisable from './assets/microphone-disable.png'

export const defaultColumns: Column[] = [
  {
    key: 'name',
    name: '学员姓名',
  },
  {
    key: 'stars',
    name: '奖杯',
    render: (text, profile: Profile, canOperate) => {
      const operateStatus = !!canOperate === true ? 'operate-status' : 'un-operate-status';
      const cls = classnames({
        [`${operateStatus}`]: 1,
      })
      return (
        <img src={profile.stars > 0 ? StarActive:Star}/>
        // <span>
        //   <Icon type={'star-outline'} className={cls} iconhover={canOperate}/>
        //   <span className="star-nums">&nbsp;x{text}</span>
        // </span>
      )
    },
  },
  {
    key: 'onPodium',
    name: '上台',
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
        // <Icon type={type} className={cls} iconhover={canOperate}/>
        <img src={profile.onPodium ? CovideoActive:Covideo}/>
      );
    }
  },
  {
    key: 'cameraEnabled',
    name: '摄像头',
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
        // <Icon type={type} className={cls} iconhover={canOperate}/>
        <img src={profile.cameraEnabled ? Camera:CameraDisable}/>
      )
    },
  },
  {
    key: 'micEnabled',
    name: '连麦',
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
        // <Icon type={type} className={cls} iconhover={canOperate}/>
        <img src={profile.micEnabled ? Microphone:MicrophoneDisable}/>
      )
    },
  },
  {
    key: 'whiteboardGranted',
    name: '授权画笔',
    action: 'whiteboard',
    render: (_, profile, canOperate) => {
      const type =  !!profile.whiteboardGranted === true ? 'authorized' : 'whiteboard';
      const operateStatus = !!canOperate === true ? 'operate-status' : 'un-operate-status';
      const whiteboardStatus = !!profile.whiteboardGranted === true ? 'icon-active' : 'un-active';
      const cls = classnames({
        [`${operateStatus}`]: 1,
        [`${whiteboardStatus}`]: 1,
      })
      return (
        // <Icon type={type} className={cls} iconhover={canOperate}/>
        <img src={profile.whiteboardGranted ? PenActive:Pen}/>
      )
    },
  },
 
  {
    key: 'kickOut',
    name: '移出',
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
