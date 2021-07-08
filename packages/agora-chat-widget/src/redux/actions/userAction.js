
export const statusAction = (data) => {
    return { type: 'STATUS_ACTION', data }
}

export const userAction = (data) => {
    return { type: 'USER_ACTION', data }
}

export const userInfoAction = (data) => {
    return { type: 'USER_INFO_ACTION', data }
}

export const clearStore = (data) => {
    return { type: 'CLEAR_STORE', data }
}
