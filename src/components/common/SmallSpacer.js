import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import layout from '../../styles/layout';

const SmallSpacer = (props) => {

  return (
    <View style={styles.navStyle} />
  );
};

const styles = EStyleSheet.create({
  navStyle: {
    height: '$smallTopSpace',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export { SmallSpacer };
