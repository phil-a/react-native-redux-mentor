import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  PUPIL_UPDATE,
  PUPIL_CREATE,
  PUPILS_FETCH_SUCCESS
} from './types';

export const pupilUpdate = ({ prop, value }) => {
  return {
    type: PUPIL_UPDATE,
    payload: { prop, value }
  };
};

export const pupilCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pupils`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: PUPIL_CREATE });
        Actions.pop();
      });
  };
};

export const pupilsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pupils`)
      .on('value', snapshot => {
        dispatch({ type: PUPILS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
