import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REHYDRATE,
  REAUTH_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
email: '',
password: '',
user: null,
loading: false,
authenticated: false
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
      return { ...state, ...INITIAL_STATE, user: action.payload, authenticated: true };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case REHYDRATE:
      return { ...state, ...INITIAL_STATE, user: action.payload.auth.user, authenticated: true };
    case REAUTH_USER_SUCCESS:
      return { ...state, user: action.payload}
    default:
      return state;
  };
};
