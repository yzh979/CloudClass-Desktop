

export const userAction = (data) => {
    return { type: 'USER_ACTION', data }
}

export const userInfoAction = (data) => {
    return { type: 'USER_INFO_ACTION', data }
}

export const clearStore = () => {
    return { type: 'CLEAR_STORE', data }
}
