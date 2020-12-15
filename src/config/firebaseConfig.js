import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDcotdUt9PvvRtH9U9KezDl99HkQ7Xt9aA",
    authDomain: "reactchatapp-9ba80.firebaseapp.com",
    projectId: "reactchatapp-9ba80",
    storageBucket: "reactchatapp-9ba80.appspot.com",
    messagingSenderId: "505047417811",
    appId: "1:505047417811:web:c2053e8fe473bc849a6526",
    measurementId: "G-RERS39BRD1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

firebase.firestore().settings({ timestampsInSnapshots: true });


export default firebase;
export {firebaseConfig};