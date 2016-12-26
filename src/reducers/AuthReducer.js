import {REHYDRATE} from 'redux-persist/constants'

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
email: '',
password: '',
user: null,
loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload.user, email: action.payload.email, password: action.payload.password };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case REHYDRATE:
      var incoming = action.payload.auth
      if (incoming) return {
        ...state,
        user: incoming.user,
        email: incoming.email,
        password: incoming.password,
      };
      return state;
    default:
      return state;
  };
};
