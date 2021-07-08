import { combineReducers } from 'redux';
import currentUser from './currentUser';
import products from './products';
import cart from './cart';

const rootReducer = combineReducers({
    currentUser,
    products,
    cart
})

export default rootReducer;