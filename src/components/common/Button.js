import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MKButton, MKColor } from 'react-native-material-kit';

const Button = ({ onPress, children, backgroundColor, textColor }) => {
  const { buttonStyle, textStyle } = styles;
  const buttonColor = backgroundColor || MKColor.Teal;
  const copyStyle = { copyColor: { color: textColor || 'white' } };

  return (
    <MKButton
      backgroundColor={[MKColor.Teal], buttonColor}
      shadowRadius={2}
      shadowOffset={{width:0, height:2}}
      shadowOpacity={.7}
      shadowColor="black"
      onPress={onPress}
      style={buttonStyle}
      >
      <Text pointerEvents="none"
            style={[textStyle, copyStyle.copyColor]}>
        { children }
      </Text>
    </MKButton>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 15,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  }
};

export { Button };
