import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

function LandingPage(props) {

    if(props.auth.uid) return <Redirect to='/chats' />

    return (
        <div className="container">
            <h1>Landing page for the website</h1>
            <Link to="/register">Register</Link>
            <br></br>
            <Link to="/login">Login</Link>
        </div>
    )
    
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(LandingPage);