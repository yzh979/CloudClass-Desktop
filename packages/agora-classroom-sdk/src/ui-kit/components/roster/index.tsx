import React, { FC, ReactNode, useCallback } from 'react';
import { t, transI18n } from '~components/i18n';
import { Icon } from '~components/icon';
import { ModalProps } from '~components/modal';
import { Table, TableHeader, Row, Col } from '~components/table';
import { defaultColumns } from './default-columns';
import Draggable from 'react-draggable';
import './index.css';
import { canOperate, ProfileRole, studentListSort } from './base';
import { Search } from '~components/input'
import SearchSvg from '~components/icon/assets/svg/search.svg'

export * from './user-list';

export type ActionTypes =
  | 'podium'
  | 'whiteboard'
  | 'camera'
  | 'mic'
  | 'kickOut'
  | string;

export enum MediaDeviceState {
  not_available = 0,
  available = 1
}

export type ColumnKey = 
  | 'name' 
  | 'onPodium' 
  | 'whiteboardGranted' 
  | 'cameraEnabled' 
  | 'micEnabled' 
  | 'stars' 
  | 'kickOut'

export interface Profile {
  uid: string | number;
  name: string;
  onPodium: boolean;
  canCoVideo: boolean;
  whiteboardGranted: boolean;
  canGrantBoard: boolean;
  cameraEnabled: boolean;
  micEnabled: boolean;
  cameraDevice: boolean;
  micDevice: boolean;
  stars: number;
  onlineState: boolean;
}

export interface Column {
  key: ColumnKey;
  name: string;
  action?: ActionTypes;
  visibleRoles?: string[];
  render?: (text: string, profile: Profile, canOperate: boolean, userType?: string) => ReactNode;
}


export interface RosterProps extends ModalProps {
  isDraggable?: boolean;
  /**
   * 老师姓名
   */
  teacherName: string;
  /**
   * 表头有默认值
   */
  columns?: Column[];
  /**
   * 数据源
   */
  dataSource?: Profile[];
  /**
   * 自己的userUuid
   */
  localUserUuid: string;
  /**
   * 当前用户角色
   */
  role: ProfileRole;
  /**
   * 老师端或学生端人员列表标记
   */
  userType?: 'teacher' | 'student';
  /**
   * col 点击的回调，是否可以点击，取决于 column 中配置 action 与否和 dataSource 数据中配置 canTriggerAction
   */
  onClick?: (action: ActionTypes, uid: string | number) => void;
  /**
   * onClose
   */
  onClose?: () => void;
  onSearch: (evt: any) => void;
  onOffAllPodiumClick:() => Promise<void>;
  onMuteAll:() => Promise<void>;
  onSendRewardAll:() => Promise<void>;
}

export const Roster: FC<RosterProps> = ({
  teacherName,
  columns = defaultColumns,
  dataSource = [],
  onClick,
  onClose = () => console.log("onClose"),
  role,
  localUserUuid,
  title,
  isDraggable = true,
  userType = 'teacher',
  onMuteAll,
  onSendRewardAll,
  onOffAllPodiumClick,
  onSearch
}) => {

  const studentList = studentListSort(dataSource)

  const cols = columns.filter(({visibleRoles = []}: Column) => visibleRoles.length === 0 || visibleRoles.includes(role))

  const DraggableContainer = useCallback(({children}: {children: React.ReactChild}) => {
    return isDraggable ? <Draggable>{children}</Draggable> : <>{children}</>
  }, [isDraggable])
  return (
    <DraggableContainer>
      <div className="agora-board-resources roster-wrap">
        <div className="btn-pin">
          <Icon type="close" style={{ cursor: 'pointer' }} hover onClick={() => {
            onClose()
          }}></Icon>
        </div>
        <div className="main-title">
          <label>花名册</label>
          <div>(<span>1</span>/15)</div>
        </div>
        <div className="roster-container">
          <div className="roster-header">
            <div className="roster-header_lf">
              <Search
                onSearch={t => onSearch(t)}
                prefix={<img src={SearchSvg} />}
                inputPrefixWidth={32}
                placeholder="请输入学员姓名"
              />
            </div>
            <div className="roster-header_rh">
              <button onClick={onSendRewardAll}>全体奖励</button>
              <button onClick={onMuteAll}>全体静音</button>
              <button onClick={onOffAllPodiumClick}>全体下台</button>
            </div>
          </div>
          
          <Table className="roster-table">
            <TableHeader>
              {cols.map((col) => (
                <Col key={col.key} style={{justifyContent: 'center'}}>{col.name}</Col>
              ))}
            </TableHeader>
            <Table className="table-container">
              {studentList?.map((data: Profile) => (
                <Row className={'border-bottom-width-1'} key={data.uid}>
                  {cols.map((col: Column, idx: number) => (
                    <Col key={col.key} style={{justifyContent: idx !== 0 ? 'center' : 'flex-start'}}>
                      <span
                        className={
                          `${idx === 0 ? 'roster-username' : ''}`
                        }
                        style={{
                          paddingLeft: idx !== 0 ? 0 : 25
                        }}
                        onClick={
                          canOperate(role, localUserUuid, data, col)
                            ? () =>
                                col.action &&
                                onClick &&
                                onClick(col.action, data.uid)
                            : undefined
                        }>
                        {col.render
                          ? col.render((data as any)[col.key], data, canOperate(role, localUserUuid, data, col))
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
    </DraggableContainer>
  );
};
