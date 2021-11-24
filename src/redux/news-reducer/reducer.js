import * as types from "./actionType";

const initialState = {
    news_list: [],
    news: {}
};

const newsReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_NEWS:
            return{
                ...state,
                news_list: action.payload,
            };
        case types.GET_NEW:
            return{
                ...state,
                news: action.payload,
            };
        case types.RESET:
            return{
                ...state,
                news: {},
            };
        default:
            return state;
    }
};

export default newsReducer;