
export const messageAction = (data, options) => {
    return { type: 'SAVE_ROOM_MESSAGE', data, options }
}

export const selectTabAction = (data, options) => {
    return { type: 'SELECT_TAB_ACTION', data, options }
}

export const showRedNotification = (data) => {
    return { type: 'SHOW_RED_NOTIFICSTION', data }
}
