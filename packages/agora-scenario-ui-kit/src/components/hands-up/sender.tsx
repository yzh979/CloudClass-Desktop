import React, { useState, useEffect } from 'react'
import { Card } from '~components/card'
import { Icon } from '~components/icon'
import { BaseProps } from '~components/interface/base-props'
import { transI18n } from '~ui-kit'
export interface HandsUpSenderProps extends BaseProps {
  handsUpDuration: (duration: 3 | -1) => Promise<void> | void;
}

export type HandsUpStateEnum = 'hands-up-before' | 'hands-up-ing' | 'hands-up-after'
export interface HandlerCondition {
  oldState: HandsUpStateEnum,
  newState: HandsUpStateEnum,
  callbackFn: () => void,
}

class FSM {

  currentState: HandsUpStateEnum;
  handlers: HandlerCondition[];
  timer: ReturnType<typeof setTimeout> | null = null;

  constructor(currentState: HandsUpStateEnum) {
    this.currentState = currentState;
    this.handlers = [];
  }

  handlerConditionMatch(oldeState: HandsUpStateEnum, newState: HandsUpStateEnum) {
    for(let i=0; i<this.handlers.length; i++){
      if(this.handlers[i].oldState === oldeState && this.handlers[i].newState === newState){
        this.handlers[i].callbackFn();
      }
    }

  }

  /**
   * 跳转到新状态
   * @param newState 
   * @returns 
   */
  changeState(newState: HandsUpStateEnum) {
    const oldState = this.currentState;
    switch(newState) {
      case 'hands-up-ing':
        if(oldState === 'hands-up-before'){
          this.currentState = newState;
          this.handlerConditionMatch(oldState, newState);
        }
        break;
      case 'hands-up-after':
        if(oldState === 'hands-up-ing'){
          this.currentState = newState;
          this.handlerConditionMatch(oldState, newState);
          this.timer && clearTimeout(this.timer);
          this.timer = setTimeout(()=>{
            this.currentState = "hands-up-before";
            this.handlerConditionMatch("hands-up-after", "hands-up-before");
          }, 3000);
        }
        break;
    }
  }
  /**
   * 当从oldState跳转到newState时，执行handler
   * @param oldState 老状态
   * @param newState 新状态
   * @param handler 回调方法
   */
  whenAfter(oldState: HandsUpStateEnum, newState: HandsUpStateEnum, handler: () => void) {
    this.handlers.push({
      oldState: oldState,
      newState: newState,
      callbackFn: handler
    })
  }

  getCurrentState() {
    return this.currentState;
  };
}

export const HandsUpSender: React.FC<HandsUpSenderProps> = ({ handsUpDuration }) => {

  const [fsm, setFSM] = useState<FSM>(new FSM('hands-up-before'));
  const [countDownNum, setCountDownNum] = useState<number>(3);
  const [firstTip, setFirstTip] = useState<boolean>(true);
  const [tipTimer ,setTipTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [countDownTimer, setCountDownTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  const [showCountDown, setShowCountDown] = useState<boolean>(false);


  useEffect(() => {
    setFirstTip(true);
    let promise: Promise<any> | null = null;
    fsm.whenAfter('hands-up-before', 'hands-up-ing', ()=>{
      setShowCountDown(true);
      setCountDownNum(3);
      promise = new Promise(async (resolve: any)=>{
        await handsUpDuration(-1);
        resolve();
      });
    });
    fsm.whenAfter('hands-up-ing', 'hands-up-after', ()=>{
      setShowCountDown(true);
      startCountDown(3);
      promise?.then(async ()=>{
        await handsUpDuration(3);
        promise = null;
      });
    });
  }, [])

  const showFirstTips = () => {
    tipTimer && clearTimeout(tipTimer);
    if(firstTip){
      setTipTimer(setTimeout(() => {
        setFirstTip(false);
        tipTimer && clearTimeout(tipTimer);
      }, 3000));
    };
  }

  const handleMouseDown = () => {
    showFirstTips();
    fsm.changeState('hands-up-ing');
  }

  const handleMouseUp = () => {
    fsm.changeState('hands-up-after');
  }

  useEffect(() => {
    if(countDownNum <= 0) {
      countDownTimer && clearInterval(countDownTimer);
      setShowCountDown(false);
    }
  }, [countDownNum, countDownTimer])

  const startCountDown = (time:number) => {
    setCountDownNum(time)
    countDownTimer && clearInterval(countDownTimer);
    let tmpCount = time
    let timer = setInterval(() => {
      if (countDownNum > 0) {
        tmpCount--
        setCountDownNum(tmpCount);
      }
    }, 1000);
    setCountDownTimer(timer)
  }

  return (
    <Card
      className={["hands-up-sender"]}
      width={40}
      height={40}
      borderRadius={40}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      { !showCountDown ?
        <Icon type='hands-up-before' useSvg size={24} /> :
        <div className="hands-up-ing">{countDownNum}</div>}
      { fsm.getCurrentState() !== 'hands-up-before' && firstTip ? <div className="hands-up-tip">{transI18n('hands_up_tip')}</div> : null}
    </Card>
  )
}