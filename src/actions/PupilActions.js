import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  PUPIL_UPDATE,
  PUPIL_CREATE
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
