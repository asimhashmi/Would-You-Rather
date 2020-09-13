import React from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { signOut } from "../actions/shared";

function NavBar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Would You Rather
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link" href="#">
              Home
            </Link>
            <Link to="/leaderboard" className="nav-item nav-link" href="#">
              Leaderboard
            </Link>
            <Link to="/add" className="nav-item nav-link" href="#">
              New Question
            </Link>
          </div>
        </div>
        <span className="navbar-text">
          {props.user && <span>Hello, {props.user.name} <button className="btn btn-light" onClick={e => props.dispatch(signOut())}>Logout</button></span>}
        </span>
      </nav>
    </div>
  );
}

function mapStateToProps({users, authedUser}) {
  return {
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(NavBar)