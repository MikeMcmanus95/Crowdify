import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ loggedIn }) => (
  <div className="bottom-nav">
    <nav className="nav-extended">
      {loggedIn ? (
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <Link to="/playlist">
                <i className="large material-icons">audiotrack</i>
              </Link>
            </li>
            <li className="tab">
              <Link to="/search">
                <i className="large material-icons">search</i>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <Link to="/login">
                <i className="large material-icons">account_circle</i>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  </div>
);

const mapState = state => {
  return {
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapState, null)(Navbar);
