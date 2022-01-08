import * as types from "./actionType";
import db from "../../firebase";

const getUsers = (Users) => ({
    type: types.GET_USERS,
    payload: Users,
});

const deleteUser = () => ({
    type: types.DELETE_USER,
});

const updateUser = () => ({
    type: types.UPDATE_USER,
});

const getUser = (User) => ({
    type: types.GET_USER,
    payload: User,
});

export const reset = () => ({
    type: types.RESET,
});

export const getUsersInitiate = () => {
    return function (dispatch) {
        db.firestore().collection("Users").onSnapshot((querySnapshot) => {
            const Users= [] ;
            querySnapshot.forEach((doc) => {
                Users.push({...doc.data(), id: doc.id})
            });
            dispatch(getUsers(Users));
        });
    };
};

// export const deleteFeedbackInitiate = (id) =>{
//     return function(dispatch) {
//         db.firestore().collection("Feedback").doc(id).delete();
//         dispatch(deleteFeedback());
//     }
// };

export const updateUserInitiate = (id, user) =>{
    return function(dispatch) {
        db.firestore().collection("User").doc(id).update(user);
        dispatch(updateUser());
    }
};

export const getUserInitiate = (id, User) =>{
    return function(dispatch) {
        db.firestore().collection("Users").doc(id).get().then((User) => {
            dispatch(getUser({...User.data()}))
        }).catch((error) => console.log(error));
    }
};