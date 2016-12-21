import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goalsFetch } from '../actions';
import { Card, CardSection, Button } from './common';
import Grid from 'react-native-grid-component';

class CategoryListItem extends Component {

  state: {data: Array<any>};

  constructor(props: Object) {
    super(props);
    this.state = {
      data: this.props.goals.filter((goal) => goal.category == this.props.category.name),
    };
  }

  componentWillMount() {
    this.props.goalsFetch();
  }

  onRowPress() {
    Actions.categoryEdit({ category: this.props.category });
  }

  onGoalPress(goal) {
    Actions.goalEdit({ goal: goal });
  }

  _renderItem = (data: any, i: number) => {
    return (
      <View style={[{ backgroundColor: 'orange' }, styles.item]} key={i}>
        <Text>{data.name}</Text>
        <TouchableOpacity onPress={() => this.onGoalPress(data)}><Text>Edit</Text></TouchableOpacity>
      </View>
    );
  }

  renderGoal(goal, index) {
    return (
      <View key={goal.uid} style={styles.goalRowStyle}>
        <View style={styles.goalTextWrapper}>
          <Text style={styles.goalTextStyle}>
            {goal.name}
          </Text>
        </View>
        <View style={styles.editButtonStyle}>
          <Button onPress={() => this.onGoalPress(goal)}>Edit</Button>
        </View>
      </View>
    );
  }

  renderCategory() {
    const { name } = this.props.category;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={styles.categoryRowStyle}>
          <Text style={styles.titleStyle}>
            { name }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <Card>
        {this.renderCategory()}
        <Grid
          style={styles.list}
          renderItem={this._renderItem}
          data={this.state.data}
          itemsPerRow={1}
          itemHasChanged={(d1, d2) => d1 !== d2}
        />
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    paddingLeft: 15
  },
  goalRowStyle:{
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  goalTextWrapper: {
    flex: 6,
  },
  goalTextStyle: {
    fontSize: 15,
    paddingLeft: 15
  },
  editButtonStyle: {
    flex: 1,
  },
  editTextStyle: {
    flex: 1,
    alignSelf: 'center'
  },
  categoryRowStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007aff',
    padding: 15,
  },
  item: {
    flex: 1,
    height: 160,
    margin: 1,
  },
  list: {
    flex: 1,
  },
}

const colors = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#607D8B',
];

function generateRandomColorsArray(length) {
  return Array.from(Array(length)).map(() => colors[Math.floor(Math.random() * colors.length)]);
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

export default connect(mapStateToProps, { goalsFetch })(CategoryListItem);
