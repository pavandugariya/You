const initialState = {
    //  count: 0,
    cartarray: [],
    totalPrice: 0
};


const CartReducer = (state = initialState, action) => {


    switch (action.type) {
        case 'COUNT_INCRESE':
            const newArray = [...state.cartarray];
            newArray[action.payload].quantity.value++;
            return {
                ...state,
                cartarray: newArray,
            };
        case 'COUNT_DECRESE':
            const newArray1 = [...state.cartarray];
            newArray1[action.payload].quantity.value--;
            return {
                ...state,
                cartarray: newArray1,
            };
        case 'ADD_ARRAY_ELEMENTS':
            return {
                ...state,
                cartarray: action.val
            };
        case 'DELETE_ARRAY_ELEMENTS':
            const filteredTodos = state.cartarray.filter((item, index) => index != action.payload)
            return {
                ...state,
                cartarray: filteredTodos,
            };
        case 'ADD_SINGLE_ARRAY_ELEMENTS':
            return {
                ...state,
                cartarray: [...state.cartarray, action.payload],
            };
        case 'SET_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.payload,
            };

        default:
            return state;
    }
};

export default CartReducer;