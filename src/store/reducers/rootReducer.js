import authReducer from './authReducer';
import peopleReducer from './peopleReducer';
import messageReducer from './messageReducer';
import { combineReducers } from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    people: peopleReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    messages: messageReducer,
})


export default rootReducer;