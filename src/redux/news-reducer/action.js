import * as types from "./actionType";
import db from "../../firebase";

const getNewsList = (news_list) => ({
    type: types.GET_NEWS,
    payload: news_list,
});

const addNews = () => ({
    type: types.ADD_NEWS,
});

const deleteNews = () => ({
    type: types.DELETE_NEWS,
});

const updateNews= () => ({
    type: types.UPDATE_NEWS,
});

const getOneNews = (news) => ({
    type: types.GET_NEW,
    payload: news,
});

 const reset = () => ({
    type: types.RESET,
});

export const getNewsListInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("news").onSnapshot((querySnapshot) => {
            const  news_list= [] ;
            querySnapshot.forEach((doc) => {
                news_list.push({...doc.data(), id: doc.id})
            });
            dispatch(getNewsList(news_list));
        });
    };
};

export const addNewsInitiate = (news) =>{
    return function(dispatch) {
        db.firestore().collection("news").doc().set(news);
        dispatch(addNews());
    }
};

export const deleteNewsInitiate = (id) =>{
    return function(dispatch) {
        db.firestore().collection("news").doc(id).delete();
        dispatch(deleteNews());
    }
};

export const updateNewsInitiate = (id, news) =>{
    return function(dispatch) {
        db.firestore().collection("news").doc(id).update(news);
        dispatch(updateNews());
    }
};

export const getOneNewsInitiate = (id, news) =>{
    return function(dispatch) {
        db.firestore().collection("news").doc(id).get().then((news) => {
            dispatch(getOneNews({...news.data()}))
        }).catch((error) => console.log(error));
    }
};