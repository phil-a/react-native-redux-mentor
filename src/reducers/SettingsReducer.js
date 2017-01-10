import {
  DISPLAY_TYPE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  isTypeGrid: true
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case DISPLAY_TYPE_CHANGED:
      return { ...state, isTypeGrid: action.payload };
    default:
      return state;
  };
};
