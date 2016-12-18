import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GoalFormReducer from './GoalFormReducer';
import GoalReducer from './GoalReducer';

export default combineReducers({
  auth: AuthReducer,
  goalForm: GoalFormReducer,
  goals: GoalReducer
});
