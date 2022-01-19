import * as types from "./actionType";
import db from "../../firebase";

const getStas = (stas) => ({
    type: types.GET_STAS,
    payload: stas,
});

const addSta = () => ({
    type: types.ADD_STA,
});

const deleteSta = () => ({
    type: types.DELETE_STA,
});

const updateSta = () => ({
    type: types.UPDATE_STA,
});

const getSta = (sta) => ({
    type: types.GET_STA,
    payload: sta,
});



export const getSTAInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("statistics").onSnapshot((querySnapshot) => {
            const stas= [] ;
            querySnapshot.forEach((doc) => {
                stas.push({...doc.data(), id: doc.id})
            });
            dispatch(getStas(stas));
        });
    };
};

export const addDiscountInitiate = (sta) =>{
    return function(dispatch) {
        db.firestore().collection("statistics").doc().set(sta);
        dispatch(addSta());
    }
};

// export const deleteDiscountInitiate = (id) =>{
//     return function(dispatch) {
//         db.firestore().collection("discounts").doc(id).delete();
//         dispatch(deleteDiscount());
//     }
// };
//
// export const updateDiscountInitiate = (id, discount) =>{
//     return function(dispatch) {
//         db.firestore().collection("discounts").doc(id).update(discount);
//         dispatch(updateDiscount());
//     }
// };

export const getSTAInitiatee = (id, sta) =>{
    return function(dispatch) {
        db.firestore().collection("statistics").doc(id).get().then((sta) => {
            dispatch(getSta({...sta.data()}))
        }).catch((error) => console.log(error));
    }
};