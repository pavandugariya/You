import { combineReducers } from "redux";
import CartReducer from "./CartReducer/CartReducer";
import AuthReducer from './AuthReducer/AuthReducer';
import ThemeReducer from './ThemeReducer/ThemeReducer';


const RootReducer = combineReducers({
    CartR: CartReducer,
    AuthR: AuthReducer,
    ThemeR: ThemeReducer,
});

export default RootReducer;