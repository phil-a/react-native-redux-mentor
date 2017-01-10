import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {
  DISPLAY_TYPE_CHANGED,
  SETTINGS_FETCH_SUCCESS,
  SETTINGS_SAVE_SUCCESS
} from './types'

export const displayTypeChanged = (isTypeGrid) => {
  return {
    type: DISPLAY_TYPE_CHANGED,
    payload: isTypeGrid
  };
};

export const settingsFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/settings`)
    .on('value', snapshot => {
      dispatch({ type: SETTINGS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  }
}

export const settingsSave = ({ isTypeGrid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/settings`)
    .update({ isTypeGrid })
    .then(() => {
      dispatch({ type: SETTINGS_SAVE_SUCCESS });
      Actions.pop();
    });
  }
};
