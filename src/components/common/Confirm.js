import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
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
        <Text style={textStyle}>
          {children}
        </Text>
      </CardSection>
      <CardSection>
        <Button onPress={onAccept}>Yes</Button>
        <Button onPress={onDecline}>No</Button>
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

export { Confirm };
