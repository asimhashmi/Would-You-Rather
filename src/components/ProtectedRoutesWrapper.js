import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import QuestionPage from "./QuestionPage";
import Home from "./Home";

function ProtectedRoutesWrapper(props) {
  return (
    <div>
      {!props.authedUser ? (
        <Redirect
          to={{ pathname: "/sign-in", state: { from: props.location } }}
        ></Redirect>
      ) : (
        <Switch>
          <Route path="/add" component={NewQuestion} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route path="/questions/:id" component={QuestionPage} />
          <Route exact path="/" component={Home} />
        </Switch>
      )}
    </div>
  );
}

function mapPropsToState({ authedUser }) {
  return { authedUser };
}

export default connect(mapPropsToState)(ProtectedRoutesWrapper);
