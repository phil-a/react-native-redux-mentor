import React, { Component } from 'react';

import {
  Dimensions,
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

var ACTION_TIMER = 2000;
var COLORS = ['rgba(0,0,0,0)', 'rgba(0,255,0,0.25)', 'rgba(0,0,255,1)'];
var {height, width} = Dimensions.get('window');
class PressAndHoldButton extends Component {


  state = { pressAction: new Animated.Value(0),
            textComplete: 'Hold to complete',
            buttonWidth: width/2 - 26,
            buttonHeight: 30 }

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
    const { onCompletePress, goal, action } = this.props;
    var message = 'Hold to complete';
    if (this._value === 1) {
        message = 'Goal completed!';
        onCompletePress(goal, action)
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
        inputRange: [0, 0.25, 1],
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
                <View style={[styles.button]}>
                  <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
                  <Text style={styles.text}>{this.state.textComplete}</Text>
                </View>
            </TouchableWithoutFeedback>
       </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    padding: 0,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.5)'
  },
  bgFill: {
    position: 'absolute',
    top: -6,
    left: 0,
    height: 44
  }
});

export { PressAndHoldButton}
