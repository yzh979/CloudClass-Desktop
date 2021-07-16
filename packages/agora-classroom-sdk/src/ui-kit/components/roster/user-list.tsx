import { ActionTypes, Icon, t, transI18n } from '@/ui-kit'
import classnames from 'classnames'
import React, { ReactNode, useCallback } from 'react'
import Draggable from 'react-draggable'
import { Col, Row, Table, TableHeader } from '~components/table'
import { Search } from '~components/input'
import SearchSvg from '~components/icon/assets/svg/search.svg'
import PodiumSvg from '~components/icon/assets/svg/podium.svg'
import { canOperate, getCameraState, getMicrophoneState, ProfileRole, studentListSort } from './base'
import { HandsUpState } from '~components/hands-up';
import IconHand from './assets/hand.png'
import IconCoVideo from './assets/covideo.png'
import IconCoVideoActive from './assets/covideo-active.png'
import IconPen from './assets/pen.png'
import IconPenActive from './assets/pen-active.png'
import IconStar from './assets/star.png'
import IconStarActive from './assets/star-active.png'


export type StudentRosterColumn = {
  key: StudentRosterColumnKey;
  name: string;
  action?: ActionTypes;
  render?: (text: string, profile: StudentRosterProfile) => ReactNode;
}

export interface StudentRosterProfile {
  uid: string | number;
  name: string;
  onPodium: boolean;
  canCoVideo: boolean;
  whiteboardGranted: boolean;
  canGrantBoard: boolean;
  isUphand: boolean;
}

export type StudentRosterActionTypes =
  | 'covideo'
  | 'whiteboard'
  | 'star'
  | string

export type StudentRosterColumnKey = 
  | 'covideo'
  | 'whiteboard'
  | 'star'
  | 'name'

export type StudentRosterProps = {
  columns?: StudentRosterColumn[];
  dataSource?: StudentRosterProfile[];
  localUserUuid: string;
  onClick?: (action: StudentRosterActionTypes, uid: string | number) => void;
  onOffAllPodiumClick:() => Promise<void>;
  onMuteAll:() => Promise<void>;
  onSendRewardAll:() => Promise<void>;
}

const defaultStudentColumns: StudentRosterColumn[] = [
  {
    key: 'name',
    name: 'student.student_name',
    render: (_, profile) => {
      return (
        <div className="student-username">
          <span title={profile.name}>{profile.name}</span>
          {profile.isUphand ? <img src={IconHand}/> : null}
        </div>
      )
    },
  },
  {
    key: 'covideo',
    name: 'student.covideo',
    action: 'podium',
    render: (_, profile ) => {
      return (
        <img src={profile.onPodium ? IconCoVideoActive:IconCoVideo}/>
      )
    },
  },
  {
    key: 'whiteboard',
    name: 'student.whiteboard',
    action: 'whiteboard',
    render: (_, profile) => {
      return (
        <img src={profile.whiteboardGranted ? IconPenActive:IconPen}/>
      )
    },
  },
  {
    key: 'star',
    name: 'student.star',
    action: 'reward',
    render: (_, profile) => {
      return (
        <img src={IconStar}/>
      )
    },
  }
]

export const StudentRoster: React.FC<StudentRosterProps> = ({
  localUserUuid,
  dataSource = [],
  columns = defaultStudentColumns,
  onClick,
  onMuteAll,
  onSendRewardAll,
  onOffAllPodiumClick,
}) => {

  return (
      <div className="agora-board-resources roster-user-list-wrap">
        <div className="roster-container">
          <div className="roster-button-group">
            <button onClick={onSendRewardAll}>全体奖励</button>
            <button onClick={onMuteAll}>全体静音</button>
            <button onClick={onOffAllPodiumClick}>全体下台</button>
          </div>
          
          <Table className="roster-table">
            <Table className="table-container">
              {dataSource?.map((data: StudentRosterProfile) => (
                <Row className={'border-bottom-width-1'} key={data.uid}>
                  {columns.map((col: StudentRosterColumn, idx: number) => (
                    <Col key={col.key} style={{justifyContent: idx !== 0 ? 'center' : 'flex-start'}}>
                      <span
                        title={col.name}
                        style={{
                          paddingLeft: idx !== 0 ? 0 : 25
                        }}
                        onClick={
                          () =>
                            col.action &&
                            onClick &&
                            onClick(col.action, data.uid)
                        }>
                        {col.render
                          ? col.render((data as any)[col.key], data)
                          : (data as any)[col.key]}
                      </span>
                    </Col>
                  ))}
                </Row>
              ))}
            </Table>
          </Table>
        </div>
      </div>
  )
}