import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class GoalView extends Component {

  extractDates(dates_completed) {
    var completed_array = [];
    const completed_objects = _.values(dates_completed);
    _.forEach(completed_objects, function(value) {
      completed_array.push(value["completed_datetime"]);
    });
    return completed_array;
  }

  render() {
    const { name, desc, quantity, frequency, category, created_at, dates_completed } = this.props.goal;
    const completed_array = this.extractDates(dates_completed);
    return (
      <View>
        <Text>Name: {name}</Text>
        <Text>Description: {desc}</Text>
        <Text>Quantity: {quantity}</Text>
        <Text>Frequency: {frequency}</Text>
        <Text>Category: {category}</Text>
        <Text>Created at: {created_at}</Text>
        <Text>Completed: {completed_array}</Text>
      </View>
    );
  }
}

export default GoalView;
