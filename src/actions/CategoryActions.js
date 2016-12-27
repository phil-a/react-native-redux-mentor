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

export const categoryCreate = ({ name, color }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories`)
      .push({ name, color })
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

export const categorySave = ({ name, color, uid }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    // get old name
    firebase.database().ref(`/users/${currentUser.uid}/categories/${uid}/name`)
      .once('value')
      .then((snapshot) => {
        let oldCategoryName = snapshot.val();

        //Get list of goal keys to update
        let goalsRef = firebase.database().ref(`/users/${currentUser.uid}/goals/`)
        .orderByChild("category")
        .equalTo(oldCategoryName)
        .once('value')
        .then((goalSnapshot) => {
          if (goalSnapshot.val()) {
            const goalKeysToUpdate = Object.keys(goalSnapshot.val())
            //Update goals with new category name
            goalKeysToUpdate.map((goalKey) => {
              firebase.database().ref(`/users/${currentUser.uid}/goals/${goalKey}`)
                .once('value', snapshot => {
                  let updatedGoal = snapshot.val()
                  updatedGoal["category"] = name;
                  firebase.database().ref(`/users/${currentUser.uid}/goals/${goalKey}`).set(updatedGoal);
                });
            });
          }
        });
      });

    //Update category
    firebase.database().ref(`/users/${currentUser.uid}/categories/${uid}`)
      .set({ name, color })
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

export const categoryDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  // TODO: need to check if goals belonging to category exist before
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/categories/${uid}`)
      .remove()
      .then(() => {
        Actions.pop();
      });
  };
};
