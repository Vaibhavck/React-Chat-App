import React, { Component } from 'react';
import Chat, {ChatList} from './chat';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import ResponsiveDrawer from './drawer';

// css
import './home-style.css'

class Home extends Component{

    state = {
        userSelected: false,
        currentUserId : "",
        currentUser : null,
    }

    componentDidMount(){
        if(!this.props.match.params.id){
            this.setState({
                ...this.state,
                userSelected: false,
            })
        }else{
            this.setState({
                ...this.state,
                userSelected: true,
            })
        }
    }

    changeCurrentUser=(id)=>{
        this.props.people.forEach(person => {
            if(person.username === id){
                this.setState({
                    currentUserId : id,
                    userSelected: true,
                    currentUser: person
                })     
            }
            
        });
    }

    render(){

        if(!this.props.auth.uid) return <Redirect to='/' />

        var component;
        var userFound = true;
        var componentType = '';
        if(this.props.match.params.id){
            userFound = false;
            this.props.people.forEach(person => {
                if(person.username === this.props.match.params.id){
                    userFound = true;
                }
            });
        }
        if( userFound && this.state.userSelected && this.state.currentUser != null){
            component = (<Chat userId={this.props.auth.uid} currentUser={this.state.currentUser} />)
            componentType = "chat";
        }
        else{
            if(!userFound){
                component = (
                    <div className="col-sm" id="base-text">
                        <h1>ReactChatApp</h1>
                        <h3>No user found</h3>
                        <h4>Select chat and start chatting...</h4>
                    </div>
                )
                componentType = "no-user-found";
            }else{
                component = (
                    <div className="col-sm" id="base-text">
                        <h1>ReactChatApp</h1>
                        <h3>Select chat and start chatting</h3>
                    </div>
                )
                componentType = "initial-component";
            }
        }
        return(
            <div className="container-fuild" id="chats">
                <div className="row">
                    <ResponsiveDrawer username={this.props.auth.name} chatComponent={component} componentType={componentType}  currentUser={this.state.currentUser} userId={this.props.auth.uid} people={this.props.people} onTap={this.changeCurrentUser} />
                    {
                        // <ChatList userId={this.props.auth.uid} people={this.props.people} onTap={this.changeCurrentUser} />
                        // {component}
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    var people = [];
    if(state.firestore.ordered.people){
        people = state.firestore.ordered.people;
    }
    return {
        people: people,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addMessage: (message) => dispatch(addMessage(message)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "people"}
    ])
)(Home)