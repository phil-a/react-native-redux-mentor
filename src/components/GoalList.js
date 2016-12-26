import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { goalsFetch, categoriesFetch } from '../actions';
import GoalListItem from './GoalListItem';
import CategoryListItem from './CategoryListItem';


class GoalList extends Component {
  componentWillMount() {
    this.props.goalsFetch();
    this.props.categoriesFetch();
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
      <ListView
        enableEmptySections
        dataSource={this.categorySource}
        renderRow={this.renderCategoryRow}
      />
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

export default connect(mapStateToProps, { goalsFetch, categoriesFetch })(GoalList);
