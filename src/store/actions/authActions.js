import {getFirebase} from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

export const signIn = (credentials) => {
    return (dispatch, getState) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((user)=>{
            firestore.collection("people").doc(user.user.uid).get().then((doc)=>{
                firestore.collection("people").doc(user.user.uid).set({
                    ...doc.data(),
                    online: true,
                }).then(()=>dispatch({type: 'LOGIN_SUCCESS'}));
            })
        }).catch((error)=>{
            dispatch({type: 'LOGIN_ERROR', error:error});
        })
    }
}


export const signOut = (userId) => {
    return (dispatch, getState)=>{
        var firebase = getFirebase();
        var firestore = getFirestore();

        firestore.collection("people").doc(userId).get().then((doc)=>{
            firestore.collection("people").doc(userId).set({
                ...doc.data(),
                online: false,
            }).then(()=>{
                firebase.auth().signOut().then(()=>{
                    dispatch({type: 'SIGNOUT_SUCCESS'});
                })
            });
        })
    }
}

export const register = (newUser) => {
    return (dispatch, getState) => {
        var firebase = getFirebase();
        var firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password
        ).then((response)=>{
            return firestore.collection("people").doc(response.user.uid).set({
                id: response.user.uid,
                name: newUser.name,
                username: newUser.username,
                online: true
            })
        }).then(()=>{
            dispatch({type: 'REGISTER_SUCCESS'});
        }).catch((error)=>{
            dispatch({type: 'REGISTER_ERROR', error:error});
        })
    }
}