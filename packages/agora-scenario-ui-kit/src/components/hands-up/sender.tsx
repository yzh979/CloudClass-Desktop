import React, {useState, useEffect} from 'react'
import { Card } from '~components/card'
import { Icon } from '~components/icon'
import { BaseProps } from '~components/interface/base-props'
import { transI18n } from '~ui-kit'
export interface HandsUpSenderProps extends BaseProps {
  onMouseDown: () => Promise<void> | void;
  onMouseUp: () => Promise<void> | void;
}

export type HandsUpStateEnum = 'hands-up-before' | 'hands-up-ing' | 'hands-up-after'

export const HandsUpSender: React.FC<HandsUpSenderProps> = ({onMouseDown, onMouseUp}) => {

  const [handsUpState, setHandsUpState] = useState<HandsUpStateEnum>('hands-up-before');
  const [countDownNum, setCountDownNum] = useState<number>(3);
  const [firstTip, setFirstTip] = useState<boolean>(true);

  useEffect(() => {
    setFirstTip(true)
  }, [])

  const handleMouseDown = () => {
    if(firstTip){
      const tipTimer = setTimeout(()=>{
        setFirstTip(false);
        clearTimeout(tipTimer);
      }, 3000);
    }
    if(handsUpState === 'hands-up-before'){
      setHandsUpState('hands-up-ing');
      onMouseDown()
    }
  }

  const handleMouseUp = () => {
    if(handsUpState === 'hands-up-ing'){
      setHandsUpState('hands-up-after');
      start();
      onMouseUp();
    }
  }

  const start = () => {
    let tempNum = countDownNum;
    let timer = setInterval(()=>{
      if ( tempNum > 0 ) {
        tempNum -= 1;
        setCountDownNum(tempNum);
      } else {
        clearInterval(timer);
        setCountDownNum(3);
        setHandsUpState('hands-up-before');
      }
    }, 1000);
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
      { handsUpState === 'hands-up-before' ? 
        <Icon type='hands-up-before' useSvg size={24}/> : 
         <div className="hands-up-ing">{countDownNum}</div>}
      { handsUpState !== 'hands-up-before' && firstTip ? <div className="hands-up-tip">{transI18n('hands_up_tip')}</div> : null}
    </Card>
  )
}