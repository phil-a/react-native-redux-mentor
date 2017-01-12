import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, ListView, View, Image } from 'react-native';
import { goalsFetch, categoriesFetch, settingsFetch } from '../actions';
import GoalListItem from './GoalListItem';
import CategoryListItem from './CategoryListItem';
import EStyleSheet from 'react-native-extended-stylesheet';

class GoalList extends Component {
  componentWillMount() {
    this.props.goalsFetch();
    this.props.categoriesFetch();
    this.props.settingsFetch();
    this.createDataSource(this.props);
    this.createCategorySource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    this.createCategorySource(nextProps);
  }

  createDataSource({ goals }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(goals);
  }

  createCategorySource({ categories }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.categorySource = ds.cloneWithRows(categories);
  }

  renderRow(goal) {
    return <GoalListItem goal={goal} />;
  }

  renderCategoryRow(category) {
    return <CategoryListItem category={category} />;
  }

  render() {
    return (
      <View>
      <Image style={{width: null}} source={{uri: 'https://i.reddituploads.com/8aacffcc028349f5afeb8ca530775174?fit=max&h=1536&w=1536&s=d703fc32306fa0c34e5dc4e9e3095e75'}}>
        <ListView
          enableEmptySections
          dataSource={this.categorySource}
          renderRow={this.renderCategoryRow}
        />
        </Image>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const goals = _.map(state.goals, (val, uid) => {
    return { ...val, uid };
  });

  const categories = _.map(state.categories, (val, uid) => {
    return { ...val, uid };
  });

  return { goals, categories };
}

export default connect(mapStateToProps, { goalsFetch, categoriesFetch, settingsFetch })(GoalList);
