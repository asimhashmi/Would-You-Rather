import React from "react";
import { handleInitialData } from "./actions/shared";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFoundPage";
import SignIn from "./components/SignIn";
import ProtectedRoutesWrapper from "./components/ProtectedRoutesWrapper";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <NavBar />
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/not-found" component={NotFoundPage} />
            <Route path="/" component={ProtectedRoutesWrapper} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar.default,
  };
}

export default connect(mapStateToProps)(App);
