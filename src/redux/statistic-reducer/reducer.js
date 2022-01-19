import * as types from "./actionType";

const initialState = {
    stas: [],
    sta: {}
};

const staReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_STAS:
            return{
                ...state,
              stas: action.payload,
            };
        case types.GET_STA:
            return{
                ...state,
                sta: action.payload,
            };

        default:
            return state;
    }
};

export default staReducer;