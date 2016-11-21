import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import { Platform } from 'react-native';

const RouterComponent = () => {
  return (
    <Router sceneStyle={styles.navStyle}>
      <Scene
        key="login"
        component={LoginForm}
        title="Please Login"
      />
    </Router>
  )
};

const styles = {
  navStyle: {
    paddingTop: Platform.OS === 'ios' ? 60 : 50
  }
};

export default RouterComponent;
