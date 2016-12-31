import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GoalList from './components/GoalList';
import GoalCreate from './components/GoalCreate';
import GoalEdit from './components/GoalEdit';
import GoalView from './components/GoalView';
import CategoryCreate from './components/CategoryCreate';
import CategoryEdit from './components/CategoryEdit';


const RouterComponent = () => {
  return (
    <Router sceneStyle={styles.navStyle}>
    <Scene key="auth">
      <Scene
        key="login"
        component={LoginForm}
        title="Please Login"
        initial
      />
    </Scene>
    <Scene key="main">
      <Scene
        key="goalList"
        component={GoalList}
        title="Goals"
        rightTitle="Add"
        onRight={() => Actions.goalCreate()}
      />
      <Scene
        key="goalCreate"
        component={GoalCreate}
        title="Create Goal"
      />
      <Scene
        key="goalEdit"
        component={GoalEdit}
        title="Edit Goal"
      />
      <Scene
        key="goalView"
        component={GoalView}
        title="View Goal"
      />
      <Scene
        key="categoryCreate"
        component={CategoryCreate}
        title="Create Category"
      />
      <Scene
        key="categoryEdit"
        component={CategoryEdit}
        title="Edit Category"
      />
    </Scene>
    </Router>
  )
};

const styles = {
  navStyle: {
    paddingTop: Platform.OS === 'ios' ? 65 : 54
  }
};

export default RouterComponent;
