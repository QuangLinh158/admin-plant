import * as types from "./actionTypes";

const initialState = {
    DetailOrders: [],
    DetailOrder: {}
};

const DetailOrdersReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_DETAILORDERS:
            return{
                ...state,
                DetailOrders: action.payload,
            };
        case types.GET_DETAILORDER:
            return{
                ...state,
                DetailOrder: action.payload,
            };
        case types.RESET:
            return{
                ...state,
                DetailOrder: {},
            };
        default:
            return state;
    }
};

export default DetailOrdersReducer;