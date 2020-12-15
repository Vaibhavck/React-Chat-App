// import Login from './components/auth/loginPage';
import Register from './components/auth/registerPage';
import Login from './components/auth/loginPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import LandingPage from './components/landingPage';
import Profile from './components/profile/profile';
import {connect} from 'react-redux';

// css
import './assets/css/global-style.css';

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/chats/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path={"/" + props.profile.username} component={Profile} />
          <Route exact path="/chats/:id" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
      profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(App);
