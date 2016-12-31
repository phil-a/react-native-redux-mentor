import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import Calendar from 'react-native-calendar';

class GoalView extends Component {

  extractDates(dates_completed) {
    var completed_array = [];
    const completed_objects = _.values(dates_completed);
    _.forEach(completed_objects, function(value) {
      completed_array.push(moment(value["completed_datetime"]).format("YYYY-MM-DD"));
    });
    return completed_array;
  }



  render() {
    const { name, desc, quantity, frequency, category, created_at, dates_completed } = this.props.goal;
    const completed_array = this.extractDates(dates_completed);
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
