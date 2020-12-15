import { getFirestore } from "redux-firestore";

export const addMessage = (message, documentLocation) => {

    return (dispatch, getState) => {
        // make async call to db
        // add new message to db for particular person
        const altDocumentLocation = String(documentLocation).split("_")[1] + "_" + String(documentLocation).split("_")[0];
        const firestore = getFirestore();
        const firestoreLocation = firestore.collection('messages').doc(documentLocation);

        firestoreLocation.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                firestoreLocation.get().then((doc) => {
                    let items = doc.data();
                    message.sentAt = new Date();
                    var messages;
                    if(items.messages){
                        message.id = items.messages.length + 1;
                        messages = [...items.messages, message];
                    }else{
                        messages = [message];
                    }

                    firestoreLocation.set({
                        messages : messages,
                    }).then(()=>{
                        dispatch({
                            type: 'ADD_MSG',
                            message: message
                        });
                    }).catch((error)=>{
                        dispatch({
                            type: 'ADD_MSG_ERROR',
                            error: error
                        });
                    })
                });
            } else {
                const altFirestoreLocation = firestore.collection('messages').doc(altDocumentLocation);
                altFirestoreLocation.get().then((altDocSnapshot)=>{
                    if(altDocSnapshot.exists){
                        altFirestoreLocation.get().then((doc) => {
                            let items = doc.data();
                            message.sentAt = new Date();
                            var messages;
                            if(items.messages){
                                message.id = items.messages.length + 1;
                                messages = [...items.messages, message];
                            }else{
                                messages = [message];
                            }
        
                            altFirestoreLocation.set({
                                messages : messages,
                            }).then(()=>{
                                dispatch({
                                    type: 'ADD_MSG',
                                    message: message
                                });
                            }).catch((error)=>{
                                dispatch({
                                    type: 'ADD_MSG_ERROR',
                                    error: error
                                });
                            })
                        });
                    }else{
                        message.sentAt = new Date();
                        firestoreLocation.set({
                            messages : [message],
                        }).then(()=>{
                            dispatch({
                                type: 'ADD_MSG',
                                message: message
                            });
                        }).catch((error)=>{
                            dispatch({
                                type: 'ADD_MSG_ERROR',
                                error: error
                            });
                        })
                    }
                })
            }
        });
    }
}