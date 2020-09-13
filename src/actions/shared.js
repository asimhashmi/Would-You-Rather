import { _getQuestions, _getUsers } from "../utils/_DATA";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export function signIn(userID) {
  return {
    type: SIGN_IN,
    userID,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}
export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([_getQuestions(), _getUsers()]).then(
      ([questions, users]) => {
        dispatch(showLoading());
        dispatch(receiveQuestions(questions));
        dispatch(receiveUsers(users));
        dispatch(hideLoading());
      }
    );
  };
}
