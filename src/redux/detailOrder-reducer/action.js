import * as types from "./actionTypes";
import db from "../../firebase";

const getDetailOrders = (DetailOrders) => ({
    type: types.GET_DETAILORDERS,
    payload: DetailOrders,
});

const updateDetailOrder = () => ({
    type: types.UPDATE_DETAILORDER,
});

const getDetailOrder = (DetailOrder) => ({
    type: types.GET_DETAILORDER,
    payload: DetailOrder,
});

export const reset = () => ({
    type: types.RESET,
});

export const getDetailOrdersInitiate = () => {
    return async function (dispatch) {
        await db.firestore().collection("DetailOrders").onSnapshot((querySnapshot) => {
            const DetailOrders= [] ;
            querySnapshot.forEach((doc) => {
                DetailOrders.push({...doc.data(), id: doc.id})
            });
            dispatch(getDetailOrders(DetailOrders));
        });
    };
};

export const updateDetailOrderInitiate = (id, DetailOrder) =>{
    return function(dispatch) {
        db.firestore().collection("DetailOrders").doc(id).update(DetailOrder);
        dispatch(updateDetailOrder());
    }
};

export const getDetailOrderInitiate = (id, DetailOrder) =>{
    return function(dispatch) {
        db.firestore().collection("DetailOrders").doc(id).get().then((DetailOrder) => {
            dispatch(getDetailOrder({...DetailOrder.data()}))
        }).catch((error) => console.log(error));
    }
};