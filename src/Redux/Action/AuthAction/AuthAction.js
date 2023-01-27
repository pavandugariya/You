
export const RestoreToken = (value) => {
    return {
        type: 'RESTORE_TOKEN',
        payload: value,
    };
};

export const isLoadingSet = (value) => {
    return {
        type: 'IS_LOADING_SET',
        payload: value,
    };
};
export const setEmailId = (value) => {
    return {
        type: 'SET_EMAIL',
        payload: value,
    };
};
