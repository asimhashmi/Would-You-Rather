import * as API from "../utils/_DATA";

export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function answerQuestion(info) {
  return {
    type: ANSWER_QUESTION,
    ...info,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(info) {
  return {
    type: ADD_QUESTION,
    question: info,
  };
}

export function handleAddQuestion(info, func) {
  return (dispatch) => {
    API._saveQuestion(info).then((question) => {
      dispatch(addQuestion(question));
      func();
    });
  };
}

export function handleAnswerQuestion(info) {
  const { qID, answer, authedUser } = info;
  return (dispatch) => {
    API._saveQuestionAnswer({ qid: qID, answer, authedUser }).then(() =>
      dispatch(answerQuestion(info))
    );
  };
}
