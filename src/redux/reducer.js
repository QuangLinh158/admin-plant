import * as types from "./actionTypes";

const initialState = {
    discounts: [],
    discount: {}
};

const discountReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_DISCOUNTS:
            return{
                ...state,
                discounts: action.payload,
            };
        case types.GET_DISCOUNT:
            return{
                ...state,
                discount: action.payload,
            };
        default:
            return state;
    }
};

export default discountReducer;