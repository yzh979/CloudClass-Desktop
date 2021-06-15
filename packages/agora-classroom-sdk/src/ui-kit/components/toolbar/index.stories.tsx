import { Meta } from '@storybook/react';
import React, { FC, useState, useRef } from 'react';
import { Icon } from '~components/icon';
import { CloudDisk, Colors, Pens, Toolbar, ToolbarProps, ToolCabinet, ToolItem  } from '~components/toolbar';
import { Tooltip } from '~components/tooltip';

import IconClear from './assets/icon-clear.png'
import IconMove from './assets/icon-move.png'
import IconMoveActive from './assets/icon-move-active.png'
import IconText from './assets/icon-text.png'
import IconTextActive from './assets/icon-text-active.png'
import IconEase from './assets/icon-ease.png'
import IconEaseActive from './assets/icon-ease-active.png'
import IconMouse from './assets/icon-mouse.png'
import IconMouseActive from './assets/icon-mouse-active.png'

const meta: Meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
};

export const Docs: FC<ToolbarProps> = (props) => {
  const [activeColor, updateColor]= useState<string>('#7ed321')
  const [pen, updatePen]= useState<string>('pen')

  const [activeItem, updateActiveItem] = useState<string>('')

  const handleClick = React.useCallback(async (type: string) => {
    updateActiveItem(type)
  }, [updateActiveItem])
  const tools: ToolItem[] = [
    {
      value: 'selection',
      label: '选择',
      icon: 'select',
      component: ({isActive, onClick}) => {
        return (
          <Tooltip title='选择' placement="bottom" >
            <div className={`tool ${isActive ? 'active' : ''}`}>
              <img src={isActive ? IconMouseActive:IconMouse} onClick={_ => onClick('selection')}/>
            </div>
          </Tooltip>
        )
      }
    },
    {
      value: 'color',
      label: '颜色',
      icon: 'color',
      component: () => {
        return (
          <Colors
            value='color'
            label='颜色'
            icon='color'
            activeColor={activeColor}
            onClick={(color) => updateColor(color)}
          />
        )
      },
    },
    {
      value: 'pen',
      label: '铅笔',
      icon: 'pen',
      component: () => {
        return (
          <Pens
            value="pen"
            label="铅笔"
            icon="pen"
            activePen={pen}
            onClick={(color) => updatePen(color)}
          />
        )
        },
    },
    {
      value: 'text',
      label: '文本',
      icon: 'text',
      component: ({isActive, onClick}) => {
        return (
          <Tooltip title='文本' placement="bottom" >
            <div className={`tool ${isActive ? 'active' : ''}`}>
              <img src={isActive ? IconTextActive:IconText} onClick={_ => onClick('text')}/>
            </div>
          </Tooltip>
        )
      }
    },
    {
      value: 'eraser',
      label: '橡皮',
      icon: 'eraser',
      component: ({isActive, onClick}) => {
        return (
          <Tooltip title='橡皮' placement="bottom" >
            <div className={`tool ${isActive ? 'active' : ''}`}>
            <img src={isActive ? IconEaseActive:IconEase} onClick={_ => onClick('eraser')}/>
            </div>
          </Tooltip>
        )
      }
    },
    {
      value: 'clear',
      label: '清空',
      icon: 'clear',
      component: ({isActive, onClick}) => {
        return (
          <Tooltip title='清空' placement="bottom" >
            <div className={`tool ${isActive ? 'active' : ''}`}>
              <img src={IconClear} onClick={_ => onClick('clear')}/>
            </div>
          </Tooltip>
        )
      }
    },
    // {
    //   value: 'blank-page',
    //   label: '新增空白页',
    //   icon: 'blank-page',
    // },
    {
      value: 'hand',
      label: '举手',
      icon: 'hand',
      component: ({isActive, onClick}) => {
        return (
          <Tooltip title='橡皮' placement="bottom" >
            <div className={`tool ${isActive ? 'active' : ''}`}>
              <img src={isActive ? IconMoveActive:IconMove} onClick={_ => onClick('hand')}/>
            </div>
          </Tooltip>
        )
      }
    },
    {
      value: 'cloud',
      label: '云盘',
      icon: 'cloud',
      component: () => {
        return (
          <CloudDisk
            value="cloud"
            label="云盘"
            icon="cloud"
          />
        )
      }
    },
    // {
    //   value: 'follow',
    //   label: '视角跟随',
    //   icon: 'follow',
    // },
    {
      value: 'tools',
      label: '工具箱',
      icon: 'tools',
      component: () => {
        return (
          <ToolCabinet
            value='tools'
            label='工具箱'
            icon='tools'
            cabinetList={[
              {
                id: 'screenShare',
                icon: <Icon type="tools"/>,
                name: '屏幕共享'
              },
              {
                id: 'laserPoint',
                icon: <Icon type="tools"/>,
                name: '激光笔'
              },
            ]}
          />
        )
      }
    },
    // {
    //   value: 'register',
    //   label: '用户列表',
    //   icon: 'register',
    // }
  ];
  return <Toolbar {...props} active={activeItem} onClick={handleClick} activeMap={{}} tools={tools}></Toolbar>
};

export default meta;
