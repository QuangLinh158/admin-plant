import * as types from "./actionType";

const initialState = {
    Users: [],
    User: {}
};

const usersReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_USERS:
            return{
                ...state,
                Users: action.payload,
            };
        case types.GET_USER:
            return{
                ...state,
                User: action.payload,
            };
        case types.RESET:
            return{
                ...state,
                User: {},
            };
        default:
            return state;
    }
};

export default usersReducer;