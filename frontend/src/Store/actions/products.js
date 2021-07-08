import { LOAD_PRODUCTS, REMOVE_PRODUCT } from "../actionTypes";
import { apiCall } from '../../Services/api';

const loadProducts = products =>({
    type: LOAD_PRODUCTS,
    products
});

export const removeProduct = product_id => ({
    type: REMOVE_PRODUCT,
    product_id
});

export const fetchProducts =  ()=> {
    return dispatch => {
        return apiCall("get", 'http://localhost:3001/api/products')
        .then(res =>  dispatch(loadProducts(res)))
        .catch(err => err.message)
    }
};

export const postProducts = products => {
    return apiCall('post', `http://localhost:3001/api/products`, products)
    .then(res => res.json())
    .catch(err => {
        return err;
    })
}

export const showProducts =  (product_id)=> {
    return dispatch => {
        return apiCall("get", `http://localhost:3001/api/products/${product_id}`)
        .then(res =>  dispatch(loadProducts(res))) 
        .catch(err => err.message)
    }
};

export const deleteProduct = (product_id) => {
    return dispatch => {
        return apiCall ("delete", `http://localhost:3001/api/products/${product_id}`)
        .then(res => dispatch(removeProduct(product_id)))
        .then(res => alert("Deleted"))
        .catch(err => err.message)
    }
}