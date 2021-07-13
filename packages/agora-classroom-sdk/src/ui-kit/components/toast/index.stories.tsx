import React, {useState} from 'react';
import { Meta } from '@storybook/react';
import { Toast } from '~components/toast';
import { Button } from '~components/button'

import "./index.css"
import closeImage from './assets/icon-close.png'

import levelClass from './assets/icon-level-class.png'

import outClass from './assets/icon-out-class.png'

const meta: Meta = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    toastType: {
      control: {
        type: 'select',
        options: ['success', 'error', 'warning']
      }
    }
  }
};

type DocsProps = {
  success: string,
  error: string,
  warning: string,
  toastText: string,
  toastType: any,
}

export const Docs = ({success, error, warning, toastText, toastType = 'success'}: DocsProps) => {
  const [visible, setVisible] = useState(true)
  return (
  <>
    <div>
      <Toast>{success}</Toast>
    </div>
    <div className="mt-4">
      <Toast type="error">{error}</Toast>
    </div>
    <div className="mt-4">
      {visible ? (<Toast 
        type="warning"
        closeToast={() => {
          setVisible(false)
        }}
        canStop={true}
      >{warning}</Toast>) : ""}
      
    </div>
    <div className="mt-4">
      <Button size="lg" onClick={() => {
        Toast.show({
          type: toastType,
          text: toastType,
          duration: 1,
        })
      }}>show toast - default right top corner</Button>
    </div>
    <div className="mt-4">
      <Button size="lg" onClick={() => {
        Toast.show({
          type: toastType,
          text: '自己定义的内容，时间设置5s，居中',
          duration: 5,
          style: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        })
      }}>show toast - user define</Button>
    </div>
  </>
)};

Docs.args = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  toastText: 'test',
}


export const TeachExit = () => {

  function closeDialog  (){
    console.log('tag', ' -----closeDialog')
  }
  const outClassClick = async() => {
    console.log('tag', ' *****outClassClick')
  }
  const levelClassClick = async () => {
    console.log('tag', ' &&&&$$$$$-----levelClassClick')

  }

  return (<div className={"exit-body"} >
    <div className={'exit-header'}>
      <span>退出直播</span>
      <img src={closeImage}  onClick={()=>console.log('tag', ' -----closeDialog')} />
    </div>

    <div className={'exit-select'}>
      <div className={'level-class'}  onClick={()=> console.log('tag', ' *****outClassClick')}> <img src={levelClass} /> <span>暂时离开</span> </div>
      <div className={'out-class'} onClick={()=>outClassClick}> <img src={outClass}/> <span>下课啦</span> </div>
    </div>

  </div>)
};


export default meta;
