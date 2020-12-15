import React, { Component } from 'react';
// import Carousel from './carousel';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signIn} from '../../store/actions/authActions';
import Navbar from '../navbar/navbar';

// css
import './register-style.css';

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleInputChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render(){
        if(this.props.auth.uid) return <Redirect to='/chats' />

        return(
            <div>
                <Navbar/>
                <div className="container" style={{padding: 100}}>
                    <div className="card" style={{padding: 10, alignItems: 'center'}}>
                        <div className="container-fluid" id="register-form">
                            <h3>Login</h3>
                            <h5 className="text-danger">{this.props.authError ? this.props.authError : ""}</h5>
                            <form onSubmit={this.handleLogin}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-user-tie"></i></span>
                                    <input required onChange={this.handleInputChange} type="text" id="email" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                                    <input required onChange={this.handleInputChange} type="password" id="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <h6>Don't have an account ? <span><Link to="/register">Register</Link></span></h6>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);