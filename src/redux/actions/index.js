export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_SCORE = 'SAVE_SCORE';
export const ADD_IMAGE_URL = 'ADD_IMAGE_URL';
export const RESET_STORE = 'RESET_STORE';

export const saveUserInfo = (payload) => ({ type: SAVE_USER_INFO, payload });

export const saveScore = (payload) => ({ type: SAVE_SCORE, payload });

export const addImageUrl = (payload) => ({ type: ADD_IMAGE_URL, payload });

export const resetStore = () => ({ type: RESET_STORE });
