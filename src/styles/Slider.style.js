import { StyleSheet, Dimensions, Platform } from 'react-native';
import { itemHorizontalMargin, itemWidth } from './SliderEntry.style';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const slideHeight = viewportHeight * 0.4;


export default StyleSheet.create({
    slider: {
      marginBottom: 0,
    },
    sliderContainer: {
      height: slideHeight,
      marginTop: viewportHeight * 0.2,
    },
    slide: {
        flexDirection: 'column',
        width: itemWidth,
        paddingHorizontal: itemHorizontalMargin
    }
});
