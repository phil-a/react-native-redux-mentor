import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { DISPLAY_TYPE_CHANGED } from './types'

export const displayTypeChanged = (isTypeGrid) => {
  return {
    type: DISPLAY_TYPE_CHANGED,
    payload: isTypeGrid
  };
};
