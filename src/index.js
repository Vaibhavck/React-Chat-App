import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider, useSelector} from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig';
import firebase from 'firebase/app'

// css
import './assets/css/index.css';

const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, firebaseConfig),
  )
);

const profileSpecificProps = {
  userProfile: 'people',
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

const rrfProps = {
  firebase,
  config: profileSpecificProps, firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  // if (!isLoaded(auth)) return(
  //   <div></div>
  // )
  if (!isLoaded(auth)) return (
    <div id="loading-wrapper">
      <div id="loading-text">ChatApp</div>
      <div id="loading-content"></div>
    </div>
  )
      return children
}

ReactDOM.render(
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);



// const store = createStore(rootReducer, 
//   compose(
//   applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reduxFirestore(firebase, firebaseConfig)
//   )
// )
// const rrfConfig = {
//   userProfile: 'people',
//   useFirestoreForProfile: true
// }
// const rrfProps = {
//   firebase,
//   config: rrfConfig, firebaseConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// }

// const AuthIsLoaded = ({children}) => {
//   const auth = useSelector(state => state.firebase.auth)
//   if(!isLoaded(auth)) return <div className="center">Loading...</div>
//   return children
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store = {store}>
//       <ReactReduxFirebaseProvider {...rrfProps}>
//         <AuthIsLoaded>
//           <App />
//         </AuthIsLoaded>
//       </ReactReduxFirebaseProvider>
//       </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );