import React, { Component } from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { Provider, connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import configureStore from './store/configureStore';
import firebase from 'firebase';
import Config from 'react-native-config';
import Router from './Router';
import EStyleSheet from 'react-native-extended-stylesheet';

const RouterWithRedux = connect()(Router);
const store = configureStore(this.state);

class App extends Component {

  constructor() {
    super();
    this.state = {
      rehydrated: false,
      store
    };
  }

  componentDidMount() {

    const persistor = persistStore(
      store,
      {
        storage: AsyncStorage,
        whitelist: ['auth', 'goals', 'categories']
      },
      () => { this.setState({ rehydrated: true }); }
    );


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
    if (!this.state.rehydrated)
          return null;

    return (
      <Provider store={store}>
        <RouterWithRedux />
      </Provider>
    );
  }
}

EStyleSheet.build({
  topSpace: Platform.OS === 'ios' ? 65 : 54,
  lightNav: 'rgba(255,255,255,0.8)',
  darkNav: 'rgba(0,0,0,0.8)',
});

export default App;
