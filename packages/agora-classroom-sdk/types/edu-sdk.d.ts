declare module 'agora-classroom-sdk'

declare type AgoraExtAppUserInfo = {
    userUuid: string
    userName: string
    roleType: number
}

declare type AgoraExtAppRoomInfo = {
    roomUuid: string
    roomName: string
    roomType: number
}

declare type AgoraExtAppContext = {
    properties: any
    dependencies: Map<string, any>
    localUserInfo: AgoraExtAppUserInfo,
    roomInfo: AgoraExtAppRoomInfo,
    language: string
}

declare type AgoraExtAppHandle = {
    updateRoomProperty: (properties:any, cause: any) => Promise<void>
    deleteRoomProperties: (properties:string[], cause: any) => Promise<void>
}

declare interface IAgoraExtApp {
    appIdentifier: string
    appName: string
    width: number
    height: number
    extAppDidLoad(dom:Element, ctx:AgoraExtAppContext, handle:AgoraExtAppHandle):void
    extAppRoomPropertiesDidUpdate(properties:any, cause: any):void
    extAppWillUnload():void
}