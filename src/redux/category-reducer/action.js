//action.js file
import * as types from "./actionType";
import db from "../../firebase";

const getCategories = (categories) => ({
    type: types.GET_CATE_LIST,
    payload: categories,
});

const addCate = () => ({
    type: types.ADD_CATE,
});

const deleteCate = () => ({
    type: types.DELETE_CATE,
});

const updateCate = () => ({
    type: types.UPDATE_CATE,
});

const getCate = (cate) => ({
    type: types.GET_CATE,
    payload: cate,
});

export const getCateInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("categories").onSnapshot((querySnapshot) => {
            const categories= [] ;
            querySnapshot.forEach((doc) => {
                categories.push({...doc.data(), id: doc.id})
            });
            dispatch(getCategories(categories));

        });
    };
};

export const addCateInitiate = (cate) =>{
    return function(dispatch) {
        db.firestore().collection("categories").doc().set(cate);
        dispatch(addCate());
    }
};

export const deleteCatetInitiate = (id) =>{
    return function(dispatch) {
        db.firestore().collection("categories").doc(id).delete();
        dispatch(deleteCate());
    }
};

export const updateCateInitiate = (id, cate) =>{
    return function(dispatch) {
        db.firestore().collection("categories").doc(id).update(cate);
        dispatch(updateCate());
    }
};

export const getOneCateInitiate = (id, cate) =>{
    return function(dispatch) {
        db.firestore().collection("categories").doc(id).get().then((cate) => {
            dispatch(getCate({...cate.data()}))
        }).catch((error) => console.log(error));
    }
};