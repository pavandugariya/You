export const increment = (value) => {
    return {
        type: 'COUNT_INCRESE',
        payload: value,
    };
};

export const decrement = (value) => {
    return {
        type: 'COUNT_DECRESE',
        payload: value,
    };
};
export const addArrayElemets = (value) => {
    return {
        type: 'ADD_ARRAY_ELEMENTS',
        val: value,
    };
};
export const deleteArrayElemets = (value) => {
    return {
        type: 'DELETE_ARRAY_ELEMENTS',
        payload: value,
    };
};
export const addSingleArrayElemets = (value) => {
    return {
        type: 'ADD_SINGLE_ARRAY_ELEMENTS',
        payload: value,
    };
};