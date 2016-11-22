import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { pupilsFetch } from '../actions';

class PupilList extends Component {

  componentWillMount() {
    this.props.pupilsFetch();
  }

  render() {
    return (
      <View>
        <Text>Pupil</Text>
        <Text>Pupil</Text>
        <Text>Pupil</Text>
        <Text>Pupil</Text>
      </View>
    );
  }
}

export default connect(null, { pupilsFetch })(PupilList);
