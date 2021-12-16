import * as types from "./actionTypes";
import db from "../../firebase";

const getOrders = (Orders) => ({
    type: types.GET_ORDERS,
    payload: Orders,
});

// const addDiscount = () => ({
//     type: types.ADD_DISCOUNT,
// });

const deleteOrder = () => ({
    type: types.DELETE_ORDER,
});

const updateOrder = () => ({
    type: types.UPDATE_ORDER,
});

const getOder = (Order) => ({
    type: types.GET_ORDER,
    payload: Order,
});

export const reset = () => ({
    type: types.RESET,
});

export const getOrdersInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("Orders").onSnapshot((querySnapshot) => {
            const Orders= [] ;
            querySnapshot.forEach((doc) => {
                Orders.push({...doc.data(), id: doc.id})
            });
            dispatch(getOrders(Orders));
        });
    };
};

// export const addDiscountInitiate = (discount) =>{
//     return function(dispatch) {
//         db.firestore().collection("discounts").doc().set(discount);
//         dispatch(addDiscount());
//     }
// };

export const deleteOrderInitiate = (id) =>{
    return function(dispatch) {
        db.firestore().collection("Orders").doc(id).delete();
        dispatch(deleteOrder());
    }
};

export const updateOrderInitiate = (id, Order) =>{
    return function(dispatch) {
        db.firestore().collection("Orders").doc(id).update(Order);
        dispatch(updateOrder());
    }
};

export const getOrderInitiate = (id, Order) =>{
    return function(dispatch) {
        db.firestore().collection("Orders").doc(id).get().then((Order) => {
            dispatch(getOder({...Order.data()}))
        }).catch((error) => console.log(error));
    }
};