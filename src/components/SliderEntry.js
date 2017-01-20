import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import styles from '../styles/SliderEntry.style';
import { Actions } from 'react-native-router-flux';

export default class SliderEntry extends Component {

    constructor() {
      super();
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        desc: PropTypes.string,
        imageUrl: PropTypes.string,
    };

    completedToSize() {
      LayoutAnimation.spring();
      return this.props.completed ? 100 : 0;
    }

    onPress(goal) {
      Actions.goalView({ goal: this.props });
    }

    renderCompletedIcon() {
      if (this.props.completed) {
        return (
          <View style={styles.checkWrapper}>
            <Image
              style={{width: this.completedToSize(), height: this.completedToSize(), tintColor: 'lightgreen'}}
              source={require('../images/checkmark.png')}
            />
          </View>
        );
      }
      return (
        <View style={styles.checkWrapper}>
          <Image
            style={{width: 0, height: 0}}
            source={require('../images/checkmark.png')}
          />
        </View>
      );
    }

    render () {
        const { name, desc, imageUrl, completed } = this.props;
        return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.slideInnerContainer}
              onPress={() => { this.onPress(this.props) }}
              >
                <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.image}
                    >
                      {this.renderCompletedIcon()}
                    </Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={2}>{ name.toUpperCase() }</Text>
                    <Text style={styles.desc} numberOfLines={2}>{ desc }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
