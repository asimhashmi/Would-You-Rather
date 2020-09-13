import React from "react";
import { connect } from "react-redux";

function LeaderBoardCard(props) {
  const { user } = props;
  const totalCount = user.questions.length + Object.keys(user.answers).length;

  return (
    <div>
      <div className="card shadow m-1">
        <div className="card-body">
          <div className="row no-gutters">
            <div className="col-md-3 border-right pr-3">
              <img
                alt="avatar"
                src={user ? user.avatarURL : undefined}
                className="card-img"
              />
            </div>
            <div className="col-md-6 ml-2">
              <h5 className="mb-3">{user.name}</h5>
              <div>Question Created: {user.questions.length}</div>
              <div>Question Answered: {Object.keys(user.answers).length}</div>
            </div>
            <div className="border-left col-md-2">
              <div className="p-1 pl-4">
                <div className="text-center">Score</div>
                <div>
                  <h1 className="text-center">{totalCount}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id],
  };
}

export default connect(mapStateToProps)(LeaderBoardCard);
