import { LOAD_PRODUCTS, REMOVE_PRODUCT} from '../actionTypes';

function products  (state = [], action)  {
    switch(action.type){
        case LOAD_PRODUCTS: 
            return [...action.products];
        case REMOVE_PRODUCT:
            return state.products.filter(product => product._id !== action.id) 
        default:
            return state;
    }
}
 
export default products;
