import * as types from "./actionType";

const initialState = {
  product_list: [],
  product: {}
};

const productReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_PRODUCT_LIST:
            console.log('REDUCER',action.payload)
            return{
                ...state,
                product_list: action.payload,
            };
        case types.GET_PRODUCT:
            return{
                ...state,
               product: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;