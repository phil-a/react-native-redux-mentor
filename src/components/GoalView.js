import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import Calendar from 'react-native-calendar';
import { Spacer } from './common';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { extractDates } from '../helpers';
class GoalView extends Component {

  render() {
    const { name, desc, quantity, frequency, category, imageUrl, created_at, dates_completed } = this.props.goal;
    const completed_array = extractDates(dates_completed);
    return (
      <View style={{flex: 1}}>
      <Spacer />
      <ParallaxScrollView
  backgroundColor="white"
  stickyHeaderHeight={ 40 }
  contentBackgroundColor="skyblue"
  parallaxHeaderHeight={300}
  renderForeground={() => (
    <View>
     <Image
     style={styles.goalImage}
     resizeMode='cover'
     source={{uri: imageUrl}}
     />
     </View>
  )}
  renderStickyHeader={() => (
  <View key="sticky-header" style={styles.stickySection}>
    <Text style={styles.stickySectionText}>{name}</Text>
  </View>
)}

renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>
                <Text style={styles.fixedSectionText}
                      onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                  Cal
                </Text>
              </View>
            )}


>
  <View style={{ height: 500 }}>
  <Text>Name: {name}</Text>
  <Text>Description: {desc}</Text>
  <Text>Quantity: {quantity}</Text>
  <Text>Frequency: {frequency}</Text>
  <Text>Category: {category}</Text>
  <Text>ImageUrl: {imageUrl}</Text>
  <Text>Created at: {created_at}</Text>
  <Text>Completed: {completed_array}</Text>
  <Calendar
    showControls
    hasEventCircle
    showEventIndicators
    eventDates={completed_array}
    customStyle={calendarStyle}
  />
  </View>
</ParallaxScrollView>
</View>
    );
  }
}

const styles = {
  goalImage: {
    width: null,
    height: 300,
  },
  fixedSection: {
  position: 'absolute',
  bottom: 10,
  right: 10
},
fixedSectionText: {
  color: '#999',
  fontSize: 20
},
}

const calendarStyle = {
  currentDayText: {
    color: 'black',
    fontWeight: 'bold',
  },
  hasEventCircle: {
    backgroundColor: 'lightskyblue',
  },
  selectedDayCircle: {
    backgroundColor: 'black',
  },
  weekendDayText: {
    color: 'lightsteelblue',
  },
  day: {
    color: 'steelblue',
  },
}

export default GoalView;
