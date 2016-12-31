import React, { Component } from 'react';

import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

var ACTION_TIMER = 2000;
var COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];

class PressAndHoldButton extends Component {


  state = { pressAction: new Animated.Value(0),
            textComplete: '',
            buttonWidth: 130,
            buttonHeight: 36 }

  componentWillMount(){
    this._value = 0;
    this.state.pressAction.addListener((v) => this._value = v.value);
  }
  handlePressIn() {
    Animated.timing(this.state.pressAction, {
        duration: ACTION_TIMER,
        toValue: 1
    }).start(this.animationActionComplete.bind(this));
  }
  handlePressOut() {
    Animated.timing(this.state.pressAction, {
            duration: this._value * ACTION_TIMER,
            toValue: 0
    }).start();
  }
  animationActionComplete() {
    var message = '';
    if (this._value === 1) {
        message = 'You held it long enough to fire the action!';
    }
    this.setState({
        textComplete: message
    });
  }
  getButtonWidthLayout(e) {
    this.setState({
        buttonWidth: e.nativeEvent.layout.width - 6,
        buttonHeight: e.nativeEvent.layout.height - 6
    });
  }
  getProgressStyles() {
    var width = this.state.pressAction.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.state.buttonWidth]
    });
    var bgColor = this.state.pressAction.interpolate({
        inputRange: [0, 1],
        outputRange: COLORS
    })
    return {
        width: width,
        height: this.state.buttonHeight,
        backgroundColor: bgColor
    }
  }
  render() {
    return (
       <View style={styles.container}>
            <TouchableWithoutFeedback
                onPressIn={this.handlePressIn.bind(this)}
                onPressOut={this.handlePressOut.bind(this)}
            >
                <View style={styles.button} onLayout={this.getButtonWidthLayout.bind(this)}>
                    <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
                    <Text style={styles.text}>Hold to complete</Text>
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text>{this.state.textComplete}</Text>
            </View>
       </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  text: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.5)'
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});

export { PressAndHoldButton}
