import {LOAD_CART } from '../actionTypes';

const loadCart = cart =>( {
    type:LOAD_CART,
    cart
})

export const fetchCart = ()=> {
          const oldProducts = localStorage.getItem("cart")
          const oldProductsArray =  JSON.parse(oldProducts)
    return dispatch => {
        dispatch(loadCart(oldProductsArray));
    }
}