import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goalsFetch } from '../actions';
import { Card, CardSection, Button } from './common';

class CategoryListItem extends Component {

  componentWillMount() {
    this.props.goalsFetch();
  }

  onRowPress() {
    Actions.categoryEdit({ category: this.props.category });
  }

  onGoalPress(goal) {
    Actions.goalEdit({ goal: goal });
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

  renderGoalsForCategory() {
    return this.props.goals.map((goal, index, array) => (
      (goal.category===this.props.category.name) ? this.renderGoal(goal, index) : null
    ));
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
        {this.renderGoalsForCategory()}
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
