import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PupilFormReducer from './PupilFormReducer';
import PupilReducer from './PupilReducer';

export default combineReducers({
  auth: AuthReducer,
  pupilForm: PupilFormReducer,
  pupils: PupilReducer
});
