import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  CATEGORY_UPDATE,
  CATEGORY_CREATE,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_NOT_SAVED
} from './types';

export const categoryUpdate = ({ prop, value }) => {
  return {
    type: CATEGORY_UPDATE,
    payload: { prop, value }
  };
};

export const categoryCreate = ({ name }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories`)
      .push({ name })
      .then(() => {
        dispatch({ type: CATEGORY_CREATE });
        Actions.pop();
      });
  };
};

export const categoriesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories`)
      .on('value', snapshot => {
        dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const categorySave = ({ name, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories/${uid}`)
      .set({ name })
      .then(() => {
        dispatch({ type: CATEGORY_SAVE_SUCCESS });
        Actions.pop();
      });
  }
};

export const categoryNotSaved = ({ name }) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_NOT_SAVED });
  };
};

// export const categoryDelete = ({ uid }) => {
//   const { currentUser } = firebase.auth();
//
//   return () => {
//     firebase.database().ref(`/users/${currentUser.uid}/goals/${uid}`)
//       .remove()
//       .then(() => {
//         Actions.goalList({ type: 'reset' });
//       });
//   };
// };
