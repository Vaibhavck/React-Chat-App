import React, { Component } from 'react';
// import Carousel from './carousel';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../store/actions/authActions';
import Navbar from '../navbar/navbar';

// css
import './register-style.css';

class Register extends Component {

    state = {
        name: "",
        email: "",
        username: "",
        password: "",
        password2: "",
    }

    handleInputChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleRegister = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.register(this.state);
    }

    render(){
        if(this.props.auth.uid) return <Redirect to='/chats' />

        return(
            <div>
                <Navbar/>
                <div className="container" style={{padding: 100}}>
                <div className="card" style={{padding: 10, alignItems: 'center'}}>
                    <div className="container-fluid" id="register-form">
                        <h3>Register</h3>
                        <h5 className="text-danger">{this.props.authError ? this.props.authError : ""}</h5>
                        <form onSubmit={this.handleRegister}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                                <input onChange={this.handleInputChange} required id="name" type="text" className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-user-tie"></i></span>
                                <input onChange={this.handleInputChange} required id="username" type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-envelope"></i></span>
                                <input onChange={this.handleInputChange} required id="email" type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                                <input onChange={this.handleInputChange} required id="password" type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                                <input onChange={this.handleInputChange} required id="password2" type="password" className="form-control" placeholder="Confirm Password" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="col-12" id="register-btn">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <h6>Already have an account ? <span><Link to="/login">Login</Link></span></h6>
                    </div>  
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (newUser) => dispatch(register(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);