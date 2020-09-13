import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EllipsisText from "react-ellipsis-text";
class QuestionCard extends Component {
  render() {
    const { author, id, history, question } = this.props;
    return (
      <div>
        <div className="card shadow m-1">
          <h5 className="card-header">{author && author.name} asks:</h5>
          <div className="card-body">
            <div className="row no-gutters">
              <div className="col-md-3 border-right pr-3">
                <img
                  src={author ? author.avatarURL : undefined}
                  className="card-img"
                  alt="avatar"
                />
              </div>
              <div className="col-md-6 ml-2">
                <h5>Would You Rather</h5>
                <p>
                  <EllipsisText text={question.optionOne.text} length={15} />
                </p>
                <button
                  onClick={() => history.push(`/questions/${id}`)}
                  className="btn btn-secondary"
                >
                  View Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const author = users[question.author];

  return {
    author,
    question,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionCard));
