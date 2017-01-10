import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { displayTypeChanged } from '../actions';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {

  render() {
    return (
      <View>
        <Text>Settings Page</Text>
        <Text>isTypeGrid: {this.props.isTypeGrid.toString()}</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ settings }) => {
  const { isTypeGrid } = settings;

  return { isTypeGrid };
};

export default connect(mapStateToProps, { displayTypeChanged })(Settings);
