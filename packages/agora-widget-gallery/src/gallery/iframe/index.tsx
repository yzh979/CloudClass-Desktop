import * as React from 'react';
import type {AgoraWidgetHandle, AgoraWidgetContext, IAgoraWidget} from 'agora-edu-core'
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

const App = observer(() => {

  return (
    <div id="netless-white" style={{display:'flex', width: '100%', height: '100%'}}>
      <iframe style={{width:'100%',height:'100%'}} src="https://webdemo.agora.io/easemob/"></iframe>
    </div>
  )
})


export class AgoraIFrameWidget implements IAgoraWidget {
  widgetId = "io.agora.widget.iframe"

  constructor(){
  }

  widgetDidLoad(dom: Element, ctx: AgoraWidgetContext, props:any): void {
    ReactDOM.render((
      <App/>
    ),
      dom
    );
  }
  widgetRoomPropertiesDidUpdate(properties:any, cause:any): void {
  }
  widgetWillUnload(): void {
  }
}