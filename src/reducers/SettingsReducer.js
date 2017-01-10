import {
  DISPLAY_TYPE_CHANGED,
  SETTINGS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  isTypeGrid: true
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case DISPLAY_TYPE_CHANGED:
      return { ...state, isTypeGrid: action.payload };
    case SETTINGS_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  };
};
