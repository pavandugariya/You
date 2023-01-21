import { combineReducers } from "redux";
import CartReducer from "./CartReducer/CartReducer";
import AuthReducer from './AuthReducer/AuthReducer';
import ThemeReducer from './ThemeReducer/ThemeReducer';
import AddressReducer from './AddressReducer/AddressReducer';

const RootReducer = combineReducers({
    CartR: CartReducer,
    AuthR: AuthReducer,
    ThemeR: ThemeReducer,
    AddressR: AddressReducer,
});

export default RootReducer;