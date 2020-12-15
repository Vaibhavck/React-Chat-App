import React, { Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addMessage} from '../../store/actions/messageActions';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import moment from 'moment';


class ChatList extends Component {

    render(){

        var people = this.props.people.map(person=>{

            if(person.id !== this.props.userId)
            return (
                <li key={person.username}>
                    <Link onClick={()=>this.props.onTap(person.username)} to={"/chats/" + person.username} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <div id="peopleList" className="list-group-item d-flex justify-content-between align-items-center">
                            <span id="person-chat"><img alt="profile-pic" src="https://image.flaticon.com/icons/png/128/3135/3135715.png"></img> {person.name} {person.online ? (<span className="online-status"><i class="fas fa-circle"></i></span>) : null}</span>
                            <span id="unreadMsg" className="badge bg-primary rounded-pill">{Math.ceil(Math.random()*10)}</span>
                        </div>
                    </Link>
                </li>
            );
        })

        return(
            <div className="col-sm col-lg-4">
                <div className="chat-list" id="people-list">
                    <ul className="list-group">
                        {people}
                    </ul>
                </div>  
            </div>
        )
    };
}



class Chat extends Component {
    
    componentDidMount(){
        console.log("componentDidMount");
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    state = {
        index : null,
        inputMessage : "",
    }

    sendMessage = (e) => {
        e.preventDefault();
        if(this.state.inputMessage.trim() !== ""){
            var documentLocation = String(this.props.userId).trim() + "_" + String(this.props.currentUser.id).trim();
            this.props.addMessage({sender: this.props.userId, content: this.state.inputMessage, id: ""}, documentLocation);

            this.setState({
                inputMessage: "",
            })
        }
    }

    getMessage = (e) => {
        this.setState({
            inputMessage : e.target.value,
        })
    }

    render(){
        var messages;
        var index;

        for(var i=0; i<this.props.messages.length; i++){
            if(
                this.props.messages[i].id === (String(this.props.userId).trim() + "_" + String(this.props.currentUser.id).trim())
                ||
                this.props.messages[i].id === (String(this.props.currentUser.id).trim() + "_" + String(this.props.userId).trim())
            ){
                index = i;
                if(this.props.messages[i].messages){
                    if(this.props.messages[i].messages.length){
                        messages = this.props.messages[i].messages.map(message => {
                            var msgClass = "";
                            var positionClass;
                            var senderTime = "", receiverTime = "", senderProfile = "", receiverProfile = "";
                            var dateString = message.sentAt ? moment(message.sentAt.toDate().toString()).calendar().toString() : "";
                            var day = dateString.split(" ")[0];
                            if(message.sender === this.props.userId){
                                msgClass = "chat-msg-sent";
                                senderTime = dateString.split(" ")[2] + " " + dateString.split(" ")[3];
                                senderProfile = (<img alt="profile-pic" src="https://image.flaticon.com/icons/png/128/3135/3135715.png"></img>);
                                positionClass = "d-flex justify-content-" + "end" + " align-items-center";
                            }else{
                                msgClass = "chat-msg-received";
                                receiverTime = dateString.split(" ")[2] + " " + dateString.split(" ")[3];
                                receiverProfile = (<img alt="profile-pic" src="https://image.flaticon.com/icons/png/128/3135/3135715.png"></img>);
                                positionClass = "d-flex justify-content-" + "start" + " align-items-center";
                            }
                            return(
                                <li key={message.id} id="msg-area" className={positionClass}>
                                    <span>{receiverProfile}</span>
                                    <span className={msgClass}>{message.content} </span>
                                    <span>{senderProfile}</span>
                                </li>
                            )    
                        });
                    }else{
                        messages = (
                            <h3>loading...</h3>
                        )
                    }
                }else{
                    messages = (
                        <h3>No msgs</h3>
                    )
                }

                break;
            }
        }

        // <div className="profile-item">
        //     <ul className="list-group">
        //         <li id="chatHeader" className="list-group-item d-flex justify-content-start align-items-center">
        //             <span><img alt="profile-pic" src="https://image.flaticon.com/icons/png/128/3135/3135715.png"></img></span>
        //             {this.props.currentUser.name}
        //         </li>
        //     </ul>
        // </div>


        // <form onSubmit={(e)=>this.sendMessage(e, index)}>
        //     <div className="msg-input">
        //         <div className="input-group input-group-sm">
        //             <input onChange={this.getMessage} value={this.state.inputMessage} type="text" className="form-control" placeholder="Type here..." aria-label="input-text-area" aria-describedby="button-addon2"/>
        //             {this.state.inputMessage.trim() ? (<button className="btn btn-outline-secondary" type="submit" id="button-addon2">Send</button> ) : ( <button className="btn btn-outline-secondary" type="submit" id="button-addon2" disabled>Send</button> )}
        //         </div>
        //     </div>
        // </form>

        return(
            <div className="col-sm">
                <div className="chat-list" id="indivisualChat">
                    <br></br>
                    <ul ref={(div) => { this.messageList = div; }} className="list-group">
                        {messages}
                    </ul>
                </div> 
                <form onSubmit={(e)=>this.sendMessage(e, index)}>
                    <div className="msg-input">
                        <ul className="list-group">
                            <li id="chatHeader" className="list-group-item d-flex justify-content-start align-items-center">
                                <div className="input-group input-group-sm">
                                <input onChange={this.getMessage} value={this.state.inputMessage} type="text" className="form-control" placeholder="Type here..." aria-label="input-text-area" aria-describedby="button-addon2"/>
                                    {true ? (<button className="btn btn-outline-secondary" type="submit" id="button-addon2">Send</button> ) : ( <button className="btn btn-outline-secondary" type="submit" id="button-addon2" disabled>Send</button> )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    var messages = [];
    if(state.firestore.ordered.messages){
        messages = state.firestore.ordered.messages;
    }
    return {
        messages: messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message, messageId) => dispatch(addMessage(message, messageId)),
    }
}



export  {ChatList};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "messages"}
    ])
)(Chat)