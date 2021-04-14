import { action, observable } from 'mobx';

export class PluginStore {
    context: AgoraExtAppContext
    handle: AgoraExtAppHandle

    @observable
    count: number = 0

    constructor(ctx: AgoraExtAppContext, handle: AgoraExtAppHandle) {
        this.context = ctx
        this.handle = handle
    }

    @action
    async increment() {
        this.count++
        return await this.handle.updateRoomProperty({"count": `${this.count}`}, {cmd:"increment", operator:this.context.localUserInfo})
    }

    @action
    onReceivedProps(properties:any, cause: any) {
        // const {count} = props
        // this.count = parseInt(count)
    }
}