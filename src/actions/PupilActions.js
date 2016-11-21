import {
  PUPIL_UPDATE
} from './types';

export const pupilUpdate = ({ prop, value }) => {
  return {
    type: PUPIL_UPDATE,
    payload: { prop, value }
  };
};
