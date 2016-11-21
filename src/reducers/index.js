import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PupilFormReducer from './PupilFormReducer';

export default combineReducers({
  auth: AuthReducer,
  pupilForm: PupilFormReducer
});
