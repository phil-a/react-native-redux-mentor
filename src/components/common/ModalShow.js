import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { MKColor } from 'react-native-material-kit';

const ModalShow = ({ children, visible, onClose }) => {
  const { containerStyle, cardSectionStyle, textStyle } = styles;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {}}
      transparent
    >
    <View style={containerStyle}>
      <CardSection style={cardSectionStyle}>
        {children}
      </CardSection>
      <CardSection>
        <Button onPress={onClose} backgroundColor={MKColor.Silver} textColor={MKColor.Grey}>Go back</Button>
      </CardSection>
    </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.75)',
  }
};

export { ModalShow };
