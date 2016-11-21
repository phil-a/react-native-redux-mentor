import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PupilList from './components/PupilList';

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
        key = "pupilList"
        component={PupilList}
        title="Pupils"
      />
    </Scene>
    </Router>
  )
};

const styles = {
  navStyle: {
    paddingTop: Platform.OS === 'ios' ? 60 : 50
  }
};

export default RouterComponent;
