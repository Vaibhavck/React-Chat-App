var initState = {
    people:[
        {name: "Vaibhav Kanade", numUnreadMessages: Math.ceil(Math.random()*100,), id:"1"},
        {name: "Gaurav Kanade", numUnreadMessages: Math.ceil(Math.random()*100,), id: "2"},
        {name: "Rohan Kanade", numUnreadMessages: Math.ceil(Math.random()*100,), id: "3"},
        {name: "Chandrakant Kanade", numUnreadMessages: Math.ceil(Math.random()*100,), id: "5"},
        {name: "Sujata Kanade", numUnreadMessages: Math.ceil(Math.random()*100,), id: "9"},
    ]
};

const peopleReducer = (state = initState, action) => {
    switch(action.type){

        default:
            return state;
    }
}

export default peopleReducer;