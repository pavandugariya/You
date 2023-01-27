const initialState = {
    userToken: null,
    userEmail: null,
    isLoading: true,
};


const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state,
                userToken: action.payload,
            };
        case 'SIGNOUT':
            return {
                ...state,
                userToken: action.payload,
            };
        case 'RESTORE_TOKEN':
            return {
                ...state,
                userToken: action.payload
            };
        case 'IS_LOADING_SET':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SET_EMAIL':
            return {
                ...state,
                userEmail: action.payload
            }

        default:
            return state;
    }
};

export default AuthReducer;