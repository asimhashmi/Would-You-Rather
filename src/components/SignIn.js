import React from "react";
import { connect } from "react-redux";
import { signIn } from "../actions/shared";
import { Redirect } from "react-router-dom";

class SignIn extends React.Component {
  state = {
    selectedUser: ''
  }
  handleChange = (value) => {
    this.setState({selectedUser: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(signIn(this.state.selectedUser))
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return (
      <div className="container">
        {this.props.authedUser && <Redirect to={from.pathname}></Redirect>}
        <div className="col-md-6 offset-md-3 mt-4">
          <form onSubmit={this.handleSubmit}>
            <div className="card text-center">
            <div className="card-header">Welcome to Would You Rather App</div>
            <div className="card-body">
              <h5 className="card-title">Please Sign In to continue.</h5>
              <div className="card-text">
                <div>
                  <img src="/logo.png" height="200" alt="logo" />
                </div>
                <div className="form-group w-80 p-4">
                  <select onChange={e => this.handleChange(e.target.value)} className="form-control"  value={this.state.selectedUser}>
                    <option>Select a user</option>
                    {this.props.users.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button className="btn btn-secondary">Sign In</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users: Object.values(users),
  };
}

export default connect(mapStateToProps)(SignIn);
