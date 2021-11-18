
import * as types from "./actionType";
import db from "../../firebase";

const getProductList = (product_list) => ({
    type: types.GET_PRODUCT_LIST,
    payload: product_list,
});

const addProduct = () => ({
    type: types.ADD_PRODUCT,
});

const deleteProduct= () => ({
    type: types.DELETE_PRODUCT,
});

const updateProduct = () => ({
    type: types.UPDATE_PRODUCT,
});

const getProduct = (product) => ({
    type: types.GET_PRODUCT,
    payload: product,
});

export const getProductInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("products").onSnapshot((querySnapshot) => {
            const product_list= [] ;
            querySnapshot.forEach((doc) => {
                product_list.push({...doc.data(), id: doc.id})
            });
            dispatch(getProductList(product_list));

        });
    };
};

export const addProductInitiate = (product) =>{
    return function(dispatch) {
        db.firestore().collection("products").doc().set(product);
        dispatch(addProduct());
        console.log(product);
    }
};

export const deleteProductInitiate = (id) =>{
    return function(dispatch) {
        db.firestore().collection("products").doc(id).delete();
        dispatch(deleteProduct());
    }
};

export const updateProductInitiate = (id, product) =>{
    return function(dispatch) {
        db.firestore().collection("products").doc(id).update(product);
        dispatch(updateProduct());
    }
};

export const getOneProductInitiate = (id, product) =>{
    return function(dispatch) {
        db.firestore().collection("products").doc(id).get().then((product) => {
            dispatch(getProduct({...product.data()}))
        }).catch((error) => console.log(error));
    }
};