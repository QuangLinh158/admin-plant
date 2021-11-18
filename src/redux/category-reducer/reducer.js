import * as types from "./actionType";

const initialState = {
    categories: [],
    category: {}
};

const cateReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_CATE_LIST:
            console.log('REDUCER',action.payload)
            return{
                ...state,
                categories: action.payload,
            };
        case types.GET_CATE:
            return{
                ...state,
               category: action.payload,
            };
        default:
            return state;
    }
};

export default cateReducer;