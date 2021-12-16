import * as types from "./actionTypes";

const initialState = {
    Feedbacks: [],
    Feedback: {}
};

const FeedbacksReducer = (state = initialState,action) => {
    switch(action.type){
        case types.GET_FEEDBACKS:
            return{
                ...state,
                Feedbacks: action.payload,
            };
        case types.GET_FEEDBACK:
            return{
                ...state,
                Feedback: action.payload,
            };
        case types.RESET:
            return{
                ...state,
                Feedback: {},
            };
        default:
            return state;
    }
};

export default FeedbacksReducer;