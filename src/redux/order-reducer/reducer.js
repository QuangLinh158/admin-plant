import * as types from "./actionTypes";

const initialState = {
    Orders: [],
    Order: {}
};

const orderReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_ORDERS:
            return{
                ...state,
                Orders: action.payload,
            };
        case types.GET_ORDER:
            return{
                ...state,
                Order: action.payload,
            };
        case types.RESET:
            return{
                ...state,
                Order: {},
            };
        default:
            return state;
    }
};

export default orderReducer;