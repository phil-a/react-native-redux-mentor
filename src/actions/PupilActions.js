import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  PUPIL_UPDATE,
  PUPIL_CREATE,
  PUPILS_FETCH_SUCCESS,
  PUPIL_SAVE_SUCCESS,
  PUPIL_NOT_SAVED
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

export const pupilSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/pupils/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: PUPIL_SAVE_SUCCESS });
        Actions.pop();
      });
  }
};

export const pupilNotSaved = ({ name, phone, shift }) => {
  return (dispatch) => {
    dispatch({ type: PUPIL_NOT_SAVED });
  };
};
