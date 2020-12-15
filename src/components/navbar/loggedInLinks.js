import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import {signOut} from '../../store/actions/authActions';

// css
import './navbar-style.css';

function LoggedInLinks(props) {
    return(
        <div className="navlinks">
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <Link className="nav-link" to="/">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Help</Link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user-circle"></i> {props.username}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href={"/" + props.username}><i className="fas fa-user-circle"></i> Profile</a></li>
                        <li><a class="dropdown-item" href="/"><i className="fas fa-cog"></i> Settings</a></li>
                        <li><a onClick={()=>console.log("signout")} className="nav-link text-primary" href="/" tabIndex="-1" aria-disabled="true"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        // signOut: ()=> dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks);