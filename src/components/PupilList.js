import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { pupilsFetch } from '../actions';
import PupilListItem from './PupilListItem';

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

  renderRow(pupil) {
    return <PupilListItem pupil={pupil} />;
  }

  render() {
    console.log(this.props);
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
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
