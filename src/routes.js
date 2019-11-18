import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { loginWithSpotify } from './store/login';
import Login from './components/Login';
import Home from './components/Home';
import Search from './components/Search';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    console.log('ISLOGGEDIN? ', this.props);
    return (
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/playlist" component={Home}></Route>
        <Route path="/search" component={Search}></Route>
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(loginWithSpotify());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
