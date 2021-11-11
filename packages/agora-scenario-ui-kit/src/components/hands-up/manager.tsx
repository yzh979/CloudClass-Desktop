import { useWatch } from "~ui-kit/utilities/hooks";
import classnames from "classnames";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Card, Icon, Popover, t, Tooltip } from "~components";
import { checked, close } from '../icon/svg'
import { BaseHandsUpProps, HandsUpState, StudentInfo } from "./types";

export type HandleUpClick = (action: 'confirm' | 'cancel', student: StudentInfo) => Promise<void> | void;

const stateColorDict: Record<string, string> = {
  default: '#7B88A0',
  actived: '#357BF6',
}

export interface HandsUpManagerProps extends BaseHandsUpProps {
  // state?: HandsUpState;
  // timeout?: number;
  onClick: HandleUpClick;
  // unreadCount?: number;
  studentList: StudentInfo[];
  // processUserCount: number;
  // onlineUserCount: number;
}

export const HandsUpManager: FC<HandsUpManagerProps> = ({
  width = 40,
  height = 40,
  borderRadius = 40,
  // state = 'default',
  // timeout = 1500,
  // unreadCount = 0,
  className,
  studentList = [],
  // onlineUserCount = 0,
  // processUserCount = 0,
  onClick,
  ...restProps
}) => {
  const cls = classnames({
    [`hands-up hands-up-manager`]: 1,
    // ['can-not-hover']: processUserCount === 0,
    [`${className}`]: !!className
  });

  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  const [handsUpCount, setHandsUpCount] = useState<number>(0);

  const [twinkle, setTwinkle] = useState<boolean>(false);

  const [twinkleFlag, setTwinkleFlag] = useState(false)

  useEffect(() => {
    setHandsUpCount(studentList.length);
    if(studentList.length > 0){
      setTwinkle(true);
    }else{
      setTwinkle(false);
    }
  }, [studentList, studentList.length])

  useEffect(()=>{
    let timer: null | ReturnType<typeof setInterval> = null;
    let tempTwinkleFlag = false;
    if(twinkle){
      timer = setInterval(()=>{
        setTwinkleFlag(tempTwinkleFlag = !tempTwinkleFlag);
      }, 500);
    }else{
      setTwinkleFlag(false);
    }
    return ()=>{
      timer && clearInterval(timer)
    }
  }, [twinkle]);

  const content = useCallback(() => {
    return (<StudentsHandsUpList
      onClick={onClick}
      students={studentList}
    />)
  }, [studentList, onClick])

  return (
    <div className={cls} {...restProps}>
      <Popover
        visible={popoverVisible}
        onVisibleChange={(visible) => {
          setPopoverVisible(visible)
        }}
        overlayClassName="customize-dialog-popover"
        trigger="hover"
        content={content}
        placement="leftBottom">
        <Card
          width={width}
          height={height}
          borderRadius={borderRadius}
          className={twinkleFlag ? 'card-hands-up-active' : ''}
        >
          <div className="hands-box-line">
            <Icon
              type={twinkleFlag ? 'hands-up-active' : "hands-up-before"}
              useSvg
              size={24}
            />
          </div>
          {handsUpCount ? <span className="hands-up-count">{handsUpCount > 99 ? "99+" : handsUpCount}</span> : null }
        </Card>
      </Popover>
    </div>
  )
}

export interface StudentHandsUpProps extends BaseHandsUpProps {
  student?: StudentInfo;
  state?: string;
  onClick: (type: any, userUuid: string) => void | Promise<void>;
}

export const StudentHandsUp: FC<StudentHandsUpProps> = ({
  student,
  width = 210,
  height = 40,
  borderRadius = 20,
  className,
  onClick,
  state = 'default',
  ...restProps
}) => {
  const cls = classnames({
    [`student-hands-up`]: 1,
    [`${className}`]: !!className,
  });

  return (
    <div className={cls} {...restProps}>
      <Card
        width={width}
        height={height}
        borderRadius={borderRadius}
      >
        <div className="student-box">
          <span className="student-name">{student?.userName}</span>
          <span>
            <Icon hover={true} type="checked" color="#0073FF" onClick={() => onClick('confirm', student!.userUuid)} />
            <Icon hover={true} type="close" style={{ marginLeft: 6 }} onClick={() => onClick('cancel', student!.userUuid)} />
          </span>
        </div>
      </Card>
    </div>
  )
}

export interface StudentsHandsUpListProps extends BaseHandsUpProps {
  students: StudentInfo[];
  onClick: HandleUpClick
}

export const StudentsHandsUpList: FC<StudentsHandsUpListProps> = ({
  students,
  width = 210,
  borderRadius = 12,
  className,
  onClick,
  ...restProps
}) => {
  const cls = classnames({
    [`students-hands-up`]: 1,
    [`${className}`]: !!className,
  });
  return (
    students.length ? <div className={cls} {...restProps}>
      <Card
        className={'hands-up-card'}
        borderRadius={borderRadius}
      >
        {
          students.map((item, index) => (
            <div className="student-item" key={item.userUuid}>
              <span className="student-name">{item?.userName}</span>
              <span className="operation-icon-wrap">
                {
                  item.coVideo ? <Icon type='on-podium' color='#357bf6'/> : 
                  <Icon type='invite-to-podium' color='#7b89a0' hover={true} onClick={() => onClick('confirm', item)}/>
                }
              </span>
            </div>
          ))
        }
      </Card>
    </div> : null
  )
}