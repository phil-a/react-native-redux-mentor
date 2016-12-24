import React, { Component } from 'react';
import { AsyncStorage, AppState } from 'react-native';
import { Provider, connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import configureStore from './store/configureStore';
import { renewToken } from './actions/AuthActions';
import firebase from 'firebase';
import Config from 'react-native-config';
import Router from './Router';

const RouterWithRedux = connect()(Router);
const store = configureStore();

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
        whitelist: ['auth']
      },
      () => { this.setState({ rehydrated: true }); }
    );

    AppState.addEventListener('change', () => this.handleAppLoaded(AppState.currentState));

    const firebase_config = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: `${Config.FIREBASE_PROJECT_NAME}.firebaseapp.com`,
    databaseURL: `https://${Config.FIREBASE_PROJECT_NAME}.firebaseio.com`,
    storageBucket: `${Config.FIREBASE_PROJECT_NAME}.appspot.com`,
    messagingSenderId: Config.FIREBASE_MESSAGE_ID
    };

    firebase.initializeApp(firebase_config);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', () => this.handleAppLoaded(AppState.currentState));
  }

  handleAppLoaded(state) {
    if (state === 'active') {
      store.dispatch(renewToken(store.getState()));
    }
    return null;
  }

  render() {
    if (!this.state.rehydrated)
          return null;
    this.handleAppLoaded(AppState.currentState);

    return (
      <Provider store={store}>
        <RouterWithRedux />
      </Provider>
    );
  }
}

export default App;
