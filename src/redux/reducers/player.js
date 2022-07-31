import { ADD_IMAGE_URL, SAVE_SCORE, SAVE_USER_INFO, SAVE_SETTINGS, RESET_STORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  url: '',
  category: '',
  difficulty: '',
  questions: 5,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case SAVE_SETTINGS:
    return {
      ...state,
      category: action.payload.category,
      difficulty: action.payload.difficulty,
      questions: action.payload.questions,
    };
  case ADD_IMAGE_URL:
    return {
      ...state,
      url: action.payload,
    };
  case RESET_STORE:
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default player;
