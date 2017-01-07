import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

const SideMenu = ({ onClosePress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <View style={{flex: 1}}>
    <View style={{flex: 8, alignItems: 'stretch'}}>
      <Image
      resizeMode='cover'
      source={{uri: 'http://i.imgur.com/BgjOLRJ.jpg'}}
      style={styles.imageStyle}
      />
    </View>
    <TouchableOpacity onPress={onClosePress} style={buttonStyle}>
      <Text style={textStyle}>
        Button 1
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onClosePress} style={buttonStyle}>
      <Text style={textStyle}>
        Button 2
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onClosePress} style={buttonStyle}>
      <Text style={textStyle}>
        Button 3
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onClosePress} style={buttonStyle}>
      <Text style={textStyle}>
        Button 4
      </Text>
    </TouchableOpacity>
    <View style={{flex: 4}}></View>
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
