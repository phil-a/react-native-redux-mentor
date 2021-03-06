import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PupilList from './components/PupilList';
import PupilCreate from './components/PupilCreate';
import PupilEdit from './components/PupilEdit';

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
        key="pupilList"
        component={PupilList}
        title="Pupils"
        rightTitle="Add"
        onRight={() => Actions.pupilCreate()}
      />
      <Scene
        key="pupilCreate"
        component={PupilCreate}
        title="Create Pupil"
      />
      <Scene
        key="pupilEdit"
        component={PupilEdit}
        title="Edit Pupil"
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
