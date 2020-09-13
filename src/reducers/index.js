import questions from "./questions";
import users from "./users";
import { combineReducers } from "redux";
import authedUser from "./authedUser";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  questions,
  users,
  authedUser,
  loadingBar: loadingBarReducer,
});
