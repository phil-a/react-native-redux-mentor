import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { pupilsFetch } from '../actions';

class PupilList extends Component {

  componentWillMount() {
    this.props.pupilsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ pupils }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(pupils);
  }

  render() {
    console.log(this.props);
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

const mapStateToProps = state => {
  const pupils = _.map(state.pupils, (val, uid) => {
    return { ...val, uid };
  });

  return { pupils };
}

export default connect(mapStateToProps, { pupilsFetch })(PupilList);
