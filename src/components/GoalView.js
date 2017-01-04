import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import Calendar from 'react-native-calendar';
import { extractDates } from '../helpers';
class GoalView extends Component {

  render() {
    const { name, desc, quantity, frequency, category, created_at, dates_completed } = this.props.goal;
    const completed_array = extractDates(dates_completed);
    return (
      <ScrollView>
        <Text>Name: {name}</Text>
        <Text>Description: {desc}</Text>
        <Text>Quantity: {quantity}</Text>
        <Text>Frequency: {frequency}</Text>
        <Text>Category: {category}</Text>
        <Text>Created at: {created_at}</Text>
        <Text>Completed: {completed_array}</Text>
        <Calendar
          showControls
          hasEventCircle
          showEventIndicators
          eventDates={completed_array}
          customStyle={customStyle}
        />
      </ScrollView>
    );
  }
}

const customStyle = {
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
