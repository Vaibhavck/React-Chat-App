
import {connect} from 'react-redux';

function Profile(props){

    return (
        <h1>Your Profile : {props.profile.username}</h1>
    )
}


const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Profile);