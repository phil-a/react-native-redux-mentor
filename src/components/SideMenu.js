import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Button } from './common';
import { MKButton, MKColor } from 'react-native-material-kit';

const SideMenu = ({ onClosePress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{flex: 8, alignItems: 'stretch'}}>
        <Image
        resizeMode='cover'
        source={{uri: 'http://i.imgur.com/BgjOLRJ.jpg'}}
        style={styles.imageStyle}
        />
      </View>
      <Button
        onPress={() =>
        {
          onClosePress();
        }}
        backgroundColor={MKColor.Indigo}>
        Settings
      </Button>
      <Button
        onPress={() =>
        {
          onClosePress();
        }}
        backgroundColor={MKColor.BlueGrey}>
        Close Menu
      </Button>
      <Button
        onPress={() =>
        {
          onClosePress();
        }}
        backgroundColor={MKColor.Red}>
        Sign Out
      </Button>
    </View>
  );
};

const styles = {
  imageStyle: {
    flex: 1,
    width: null,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginHorizontal: 5,
    marginVertical: 5
  }
};

export default SideMenu;
