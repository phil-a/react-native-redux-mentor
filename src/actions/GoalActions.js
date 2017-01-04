import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  GOAL_UPDATE,
  GOAL_CREATE,
  GOALS_FETCH_SUCCESS,
  GOAL_SAVE_SUCCESS,
  GOAL_NOT_SAVED
} from './types';

export const goalUpdate = ({ prop, value }) => {
  return {
    type: GOAL_UPDATE,
    payload: { prop, value }
  };
};

export const goalCreate = ({ name, desc, category, quantity, frequency, created_at }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals`)
      .push({ name, desc, category, quantity, frequency, created_at })
      .then(() => {
        dispatch({ type: GOAL_CREATE });
        Actions.pop();
      });
  };
};

export const goalsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals`)
      .on('value', snapshot => {
        dispatch({ type: GOALS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const goalSave = ({ name, desc, category, quantity, frequency, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals/${uid}`)
      .update({ name, desc, category, quantity, frequency })
      .then(() => {
        dispatch({ type: GOAL_SAVE_SUCCESS });
        Actions.pop();
      });
  }
};

export const goalNotSaved = ({ name, desc, category, quantity, frequency }) => {
  return (dispatch) => {
    dispatch({ type: GOAL_NOT_SAVED });
  };
};

export const goalDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/goals/${uid}`)
      .remove()
      .then(() => {
        Actions.goalList({ type: 'reset' });
      });
  };
};

export const goalComplete = ({ completed_datetime, uid }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals/${uid}/dates_completed`)
    .push({ completed_datetime })
  }

}

export const goalCategoryCreate = () => {
  const { currentUser } = firebase.auth();
  return () => {
    Actions.categoryCreate();
  }
};
