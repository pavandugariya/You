const initialState = {
    theme: "LIGHT"
};

const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'THEME_SET':
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return state;
    }
};

export default ThemeReducer;