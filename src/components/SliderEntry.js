import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        desc: PropTypes.string,
        imageUrl: PropTypes.string
    };

    render () {
        const { name, desc, imageUrl } = this.props;

        return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${name}'`); }}
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
