import { LOAD_CART } from '../actionTypes';

const cart = (state=[], action) => {
    switch(action.type){
        case LOAD_CART:
            return action.cart !== null ?[...action.cart]: state
        default:
            return state;
    }
}

export default cart;