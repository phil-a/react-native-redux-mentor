import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import layout from '../../styles/layout';

const Spacer = (props) => {

  return (
    <View style={styles.navStyle} />
  );
};

const styles = EStyleSheet.create({
  navStyle: {
    height: '$topSpace',
    backgroundColor: 'transparent',
  },
});

export { Spacer };
