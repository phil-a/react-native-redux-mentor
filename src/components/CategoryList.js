import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { categoriesFetch } from '../actions';
import CategoryListItem from './CategoryListItem';

class CategoryList extends Component {

  componentWillMount() {
    this.props.categoriesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ categories }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(categories);
  }

  renderRow(category) {
    return <CategoryListItem category={category} />;
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
  const categories = _.map(state.categories, (val, uid) => {
    return { ...val, uid };
  });

  return { categories };
}

export default connect(mapStateToProps, { categoriesFetch })(CategoryList);
