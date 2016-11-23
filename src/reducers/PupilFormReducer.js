import {
  PUPIL_UPDATE,
  PUPIL_CREATE,
  PUPIL_SAVE_SUCCESS,
  PUPIL_NOT_SAVED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUPIL_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PUPIL_CREATE:
      return { INITIAL_STATE };
    case PUPIL_SAVE_SUCCESS:
        return { INITIAL_STATE };
    case PUPIL_NOT_SAVED:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
