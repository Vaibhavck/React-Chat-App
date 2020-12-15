import React from 'react';
import LoggedInLinks from './loggedInLinks';
import LoggedOutLinks from './loggedOutLinks';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Navbar(props) {
    const {auth, profile} = props;
    var navLinks = auth.uid ? <LoggedInLinks username={profile.username} /> : <LoggedOutLinks/>
    var homeRedirect = auth.uid ? "/chats" : "/";
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={homeRedirect}>ReactChatApp</Link>
                {navLinks}
            </div>
        </nav>
    )
}

const mapStateToProps=(state)=>{
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);