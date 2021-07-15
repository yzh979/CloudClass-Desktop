import { useBoardContext, useGlobalContext, useRoomContext, Resource } from 'agora-edu-core'
import { ZoomItemType } from '@/ui-kit/components'
import { EduRoleTypeEnum, EduRoomType } from 'agora-rte-sdk'
import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { ColorsContainer } from '~capabilities/containers/board/colors'
import { PensContainer } from '~capabilities/containers/board/pens'
import { ToolCabinetContainer } from '~capabilities/containers/board/tool-cabinet'
import { CloseConfirm, UserListDialog } from '~capabilities/containers/dialog'
import { CloudDriverContainer } from '~capabilities/containers/board/cloud-driver'
import { Icon, TabPane, Tabs, Toolbar, ToolItem, transI18n, ZoomController, PreClass } from '~ui-kit'
import { useEffect } from 'react'
import './index.css'
import { Tooltip } from '~components/tooltip';

import IconCloud from './assets/icon-cloud.png'
import IconClear from './assets/icon-clear.png'
import IconMove from './assets/icon-move.png'
import IconMoveActive from './assets/icon-move-active.png'
import IconText from './assets/icon-text.png'
import IconTextActive from './assets/icon-text-active.png'
import IconEase from './assets/icon-ease.png'
import IconEaseActive from './assets/icon-ease-active.png'
import IconMouse from './assets/icon-mouse.png'
import IconMouseActive from './assets/icon-mouse-active.png'
export const allTools: ToolItem[] = [
  {
    value: 'selection',
    label: '选择',
    icon: 'select',
    component: ({isActive, onClick}) => {
      return (
        <Tooltip title='选择' placement="bottom" >
          <div className={`tool ${isActive ? 'active' : ''}`}>
            <img src={isActive ? IconMouseActive:IconMouse} onClick={onClick}/>
          </div>
        </Tooltip>
      )
    }
  },
  {
    value: 'color',
    label: 'scaffold.color',
    icon: 'circle',
    component: (props: any) => {
      return <ColorsContainer {...props}/>
    }
  },
  {
    value: 'pen',
    label: 'scaffold.pencil',
    icon: 'pen',
    component: (props: any) => {
      return <PensContainer {...props}/>
    }
  },
  {
    value: 'text',
    label: '文本',
    icon: 'text',
    component: ({isActive, onClick}) => {
      return (
        <Tooltip title='文本' placement="bottom" >
          <div className={`tool ${isActive ? 'active' : ''}`}>
            <img src={isActive ? IconTextActive:IconText} onClick={onClick}/>
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
          <img src={isActive ? IconEaseActive:IconEase} onClick={onClick}/>
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
            <img src={IconClear} onClick={onClick}/>
          </div>
        </Tooltip>
      )
    }
  },
  // {
  //   value: 'blank-page',
  //   label: 'scaffold.blank_page',
  //   icon: 'blank-page'
  // },
  {
    value: 'hand',
    label: '移动',
    icon: 'hand',
    component: ({isActive, onClick}) => {
      return (
        <Tooltip title='移动' placement="bottom" >
          <div className={`tool ${isActive ? 'active' : ''}`}>
            <img src={isActive ? IconMoveActive:IconMove} onClick={onClick}/>
          </div>
        </Tooltip>
      )
    }
  },
  {
    value: 'cloud',
    label: '云盘',
    icon: 'cloud',
    component: ({isActive, onClick}) => {
      return (
        <Tooltip title='媒体库' placement="bottom" >
          <div className={`tool ${isActive ? 'active' : ''}`}>
            <img src={IconCloud} onClick={onClick}/>
          </div>
        </Tooltip>
      )
    }
  },
  {
    value: 'tools',
    label: 'scaffold.tools',
    icon: 'tools',
    component: () => {
      return <ToolCabinetContainer/>
    }
  },
  // {
  //   value: 'register',
  //   label: 'scaffold.user_list',
  //   icon: 'register'
  // },
  // {
  //   value: 'student_list',
  //   label: 'scaffold.student_list',
  //   icon: 'register'
  // }
]

export type WhiteBoardState = {
  zoomValue: number,
  currentPage: number,
  totalPage: number,

  items: ToolItem[],
  handleToolBarChange: (evt: any) => Promise<any> | any,
  handleZoomControllerChange: (e: any) => Promise<any> | any,
}

const TabsContainer = observer(() => {

  const {
    resourcesList,
    changeSceneItem,
    activeSceneName,
  } = useBoardContext()

  const {
    addDialog,
  } = useGlobalContext()
  return (
    <Tabs className="whiteboard-tab" activeKey={activeSceneName} type="editable-card"
      onChange={changeSceneItem}>
      {resourcesList.map((item: Resource, key: number) => {
        return (
          <TabPane
            key={item.resourceUuid}
            tab={
              <>
                {key === 0 ? transI18n("tool.board_name") : item.file.name}
              </>
            }
            closeIcon={
              <Icon className="whiteboard-tab-item-close" type="close"
                onClick={() => {
                  addDialog(CloseConfirm, {
                    resourceUuid: item.resourceUuid,
                  })
                }}
              ></Icon>
            }
            closable={key !== 0}
          >
          </TabPane>
        )
      })}
    </Tabs>
  )
})

export const WhiteboardContainer = observer(() => {

  const {
    isFullScreen,
    addDialog,
    removeDialog
  } = useGlobalContext()

  const {
    roomInfo,
    liveClassStatus,
  } = useRoomContext()

  const {
    zoomValue,
    currentPage,
    totalPage,
    ready,
    currentSelector,
    activeMap,
    tools,
    hasPermission,
    mountToDOM,
    zoomBoard,
    setZoomScale,
    changeFooterMenu,
    setTool,
    installTools,
    clearScene
  } = useBoardContext()

  const handleToolClick = (type: string) => {
    console.log('handleToolClick tool click', type)
    switch(type) {
      case 'cloud': {
        setTool(type)
        addDialog(CloudDriverContainer)
        break
      }
      case 'register': {
        setTool(type)
        addDialog(UserListDialog)
        break
      }
      case 'clear': {
        clearScene()
        break
      }
      default: {
        setTool(type)
        break
      }
    }
  }

  useEffect(() => {
    installTools(allTools)
  }, [allTools])

  const showTab = roomInfo.userRole === EduRoleTypeEnum.student ? false : true

  const [showToolBar, showZoomControl] = useMemo(() => {
    if ([EduRoleTypeEnum.teacher, EduRoleTypeEnum.assistant].includes(roomInfo.userRole)) {
      return [true, true]
    }
    if (roomInfo.roomType === EduRoomType.SceneType1v1 && roomInfo.userRole === EduRoleTypeEnum.student) {
      return [true, hasPermission]
    }

    if ([EduRoomType.SceneTypeMiddleClass, EduRoomType.SceneTypeBigClass].includes(roomInfo.roomType) && roomInfo.userRole === EduRoleTypeEnum.student) {
      return [true, hasPermission]
    }

    return [false, false]
  }, [roomInfo.roomType, hasPermission, roomInfo.userRole, roomInfo.roomType])

  const handleZoomControllerChange = async (type: ZoomItemType) => {
    const toolbarMap: Record<ZoomItemType, CallableFunction> = {
      'max': () => {
        zoomBoard('fullscreen')
      },
      'min': () => {
        zoomBoard('fullscreenExit')
      },
      'zoom-out': () => {
        setZoomScale('out')
      },
      'zoom-in': () => {
        setZoomScale('in')
      },
      'forward': () => changeFooterMenu('next_page'),
      'backward': () => changeFooterMenu('prev_page'),
    }
    toolbarMap[type] && toolbarMap[type]()
  }
  const userType = useMemo(() => {
    if (roomInfo.userRole === EduRoleTypeEnum.teacher) {
      return 'teacher'
    }
    return 'student'
  }, [roomInfo.userRole])
  return (
    <div className="whiteboard">
      {
        ready ? 
        <div id="netless" ref={mountToDOM} ></div> : <div className="whiteboard-placeholder"></div>
      }
      { userType == 'student' && liveClassStatus.classState == 'pre-class' &&
        <PreClass className="pre-class-position"/>
      }

      {showTab ? 
      <TabsContainer /> : null}
      {showToolBar ? 
        <Toolbar active={currentSelector} activeMap={activeMap} tools={tools} onClick={handleToolClick} className="toolbar-biz" />
      : null}
      {showZoomControl ? <ZoomController
        className='zoom-position-mid'
        zoomValue={zoomValue}
        currentPage={currentPage}
        totalPage={totalPage}
        maximum={!isFullScreen}
        clickHandler={handleZoomControllerChange}
      /> : null}
    </div>
  )
})