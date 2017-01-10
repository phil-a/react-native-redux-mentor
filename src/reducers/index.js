import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import GoalFormReducer from './GoalFormReducer';
import GoalReducer from './GoalReducer';
import CategoryFormReducer from './CategoryFormReducer';
import CategoryReducer from './CategoryReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  auth: AuthReducer,
  goalForm: GoalFormReducer,
  goals: GoalReducer,
  categoryForm: CategoryFormReducer,
  categories: CategoryReducer,
  settings: SettingsReducer
});
