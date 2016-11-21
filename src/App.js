import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Config from 'react-native-config';
import Router from './Router';

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
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
