import {
  Platform,
  Dimensions
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const { width, height } = Dimensions.get('window');

export default EStyleSheet.create({
  navSpace: {
    paddingTop: '$topSpace',
  },
  goalViewNav: {
    backgroundColor: '$lightNav'
  },
  navText: {
    color: '$navText'
  }
});
