import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';
import { Actions } from 'react-native-router-flux';

export default class SliderEntry extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        desc: PropTypes.string,
        imageUrl: PropTypes.string
    };

    onPress(goal) {
      Actions.goalView({ goal: this.props });
    }

    render () {
        const { name, desc, imageUrl } = this.props;
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
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={2}>{ name.toUpperCase() }</Text>
                    <Text style={styles.desc} numberOfLines={2}>{ desc }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
