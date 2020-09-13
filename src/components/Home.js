import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="offset-md-3 col-md-6 pt-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="answered-tab"
                data-toggle="tab"
                href="#answered"
                role="tab"
                aria-controls="answered"
                aria-selected="true"
              >
                Answered
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="unanswered-tab"
                data-toggle="tab"
                href="#unanswered"
                role="tab"
                aria-controls="unanswered"
                aria-selected="false"
              >
                Unanswered
              </a>
            </li>
          </ul>
          <div className="tab-content" id="questions">
            <div
              className="tab-pane fade show active"
              id="answered"
              role="tabpanel"
              aria-labelledby="answered-tab"
            >
              <ul className="list-group">
                {this.props.answeredIDs.map((qID) => (
                  <QuestionCard key={qID} id={qID} />
                ))}
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="unanswered"
              role="tabpanel"
              aria-labelledby="unanswered-tab"
            >
              <ul className="list-group">
                {this.props.unansweredIDs.map((qID) => (
                  <QuestionCard key={qID} id={qID} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions, loadingBar }) {
  const answeredIDs = Object.keys(users[authedUser].answers);

  return {
    answeredIDs: answeredIDs.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredIDs: Object.keys(questions).filter(
      (qID) => !answeredIDs.includes(qID)
    ).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    loading: loadingBar.default,
  };
}

export default connect(mapStateToProps)(Home);
