import * as types from "./actionTypes";
import db from "../../firebase";

const getDiscounts = (discounts) => ({
    type: types.GET_DISCOUNTS,
    payload: discounts,
});

const addDiscount = () => ({
    type: types.ADD_DISCOUNT,
});

const deleteDiscount = () => ({
    type: types.DELETE_DISCOUNT,
});

const updateDiscount = () => ({
    type: types.UPDATE_DISCOUNT,
});

const getDiscount = (discount) => ({
    type: types.GET_DISCOUNT,
    payload: discount,
});

export const reset = () => ({
    type: types.RESET,
});

export const getDiscountInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("discounts").onSnapshot((querySnapshot) => {
            const discounts= [] ;
            querySnapshot.forEach((doc) => {
                discounts.push({...doc.data(), id: doc.id})
            });
            dispatch(getDiscounts(discounts));
        });
    };
};

export const addDiscountInitiate = (discount) =>{
    return function(dispatch) {
        db.firestore().collection("discounts").doc().set(discount);
        dispatch(addDiscount());
    }
};

export const deleteDiscountInitiate = (id) =>{
    return function(dispatch) {
        db.firestore().collection("discounts").doc(id).delete();
        dispatch(deleteDiscount());
    }
};

export const updateDiscountInitiate = (id, discount) =>{
    return function(dispatch) {
        db.firestore().collection("discounts").doc(id).update(discount);
        dispatch(updateDiscount());
    }
};

export const getDiscountInitiatee = (id, discount) =>{
    return function(dispatch) {
        db.firestore().collection("discounts").doc(id).get().then((discount) => {
            dispatch(getDiscount({...discount.data()}))
        }).catch((error) => console.log(error));
    }
};