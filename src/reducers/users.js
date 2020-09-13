import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION, ADD_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qID]: action.answer,
          },
        },
      };
    case ADD_QUESTION:
      const { author: authedUser } = action.question;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([action.question.id]),
        },
      };
    default:
      return state;
  }
}
