import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import Config from 'react-native-config';
import LoginForm from './components/LoginForm';

class App extends Component {

  componentWillMount() {
    const firebase_config = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: `${Config.FIREBASE_PROJECT_NAME}.firebaseapp.com`,
    databaseURL: `https://${Config.FIREBASE_PROJECT_NAME}.firebaseio.com`,
    storageBucket: `${Config.FIREBASE_PROJECT_NAME}.appspot.com`,
    messagingSenderId: Config.FIREBASE_MESSAGE_ID
    };

    firebase.initializeApp(firebase_config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <LoginForm />
        </View>
      </Provider>
    );
  }
}

export default App;
