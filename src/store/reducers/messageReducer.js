var initState = {
    messages:[
        {type: "received", content: "this is a received message", id: "1"},
        {type: "sent", content: "this is a sent message", id: "2"},
        {type: "sent", content: "this is a sent message", id: "3"},
        {type: "received", content: "this is a received message", id: "4"},
        {type: "sent", content: "this is a sent message", id: "5"},
        {type: "sent", content: "this is a sent message", id: "6"},
        {type: "received", content: "this is a received message", id: "7"},
        {type: "received", content: "this is a received message", id: "8"},
        {type: "sent", content: "this is a sent message", id: "9"},
        {type: "received", content: "this is a received message", id: "10"},
        {type: "received", content: "this is a received message", id: "11"},
        {type: "sent", content: "this is a sent message", id: "12"},
    ]
};

const messageReducer = (state = initState, action) => {
    
    switch(action.type){
        case 'ADD_MSG':
            return state;
        
        case 'ADD_MSG_ERROR':
            console.log("add msg error", action.error);
            return state;

        default:
            return state;
    }
}

export default messageReducer;