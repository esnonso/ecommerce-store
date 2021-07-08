import { SET_CURRENT_USER } from '../actionTypes';  

const DEFAULT_STATE = {
    isAuthenticated:false,
    user:{}// all the user info when the is logged in
}

function currentUser(state = DEFAULT_STATE, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                //turns empty object to false if no keys and true if there are keys
                isAuthenticated: !!Object.keys(action.user).length,
                user:action.user,
                isAdmin: action.user.isAdmin === true
            };
            default:
                return state
    }
}

export default currentUser;