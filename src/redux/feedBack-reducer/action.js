import * as types from "./actionTypes";
import db from "../../firebase";

const getFeedbacks = (Feedbacks) => ({
    type: types.GET_FEEDBACKS,
    payload: Feedbacks,
});

const deleteFeedback = () => ({
    type: types.DELETE_FEEDBACK,
});

const updateFeedback = () => ({
    type: types.UPDATE_FEEDBACK,
});

const getFeedback = (Feedback) => ({
    type: types.GET_FEEDBACK,
    payload: Feedback,
});

export const reset = () => ({
    type: types.RESET,
});

export const getFeedbacksInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("Feedback").onSnapshot((querySnapshot) => {
            const Feedbacks= [] ;
            querySnapshot.forEach((doc) => {
                Feedbacks.push({...doc.data(), id: doc.id})
            });
            dispatch(getFeedbacks(Feedbacks));
        });
    };
};

export const deleteFeedbackInitiate = (id) =>{
    return function(dispatch) {
        db.firestore().collection("Feedback").doc(id).delete();
        dispatch(deleteFeedback());
    }
};

export const updateFeedbackInitiate = (id, feedback) =>{
    return function(dispatch) {
        db.firestore().collection("Feedback").doc(id).update(feedback);
        dispatch(updateFeedback());
    }
};

export const getFeedbackInitiate = (id, Feedback) =>{
    return function(dispatch) {
        db.firestore().collection("Feedback").doc(id).get().then((Feedback) => {
            dispatch(getFeedback({...Feedback.data()}))
        }).catch((error) => console.log(error));
    }
};