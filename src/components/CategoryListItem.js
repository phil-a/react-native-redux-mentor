import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goalsFetch } from '../actions';
import { Card, CardSection } from './common';

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

  renderGoal(goal) {
    return (
      <TouchableWithoutFeedback onPress={() => this.onGoalPress(goal)}>
        <View>
          <CardSection>
            <Text>
              {goal.name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderGoalsForCategory() {
    //debugger;
    const goalItems = this.props.goals.map((goal) => (
      (goal.category===this.props.category.name) ? this.renderGoal(goal) : null
    ));
    return goalItems;
  }

  render() {
    const { name } = this.props.category;
    return (
      <Card>
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>
                { name }
              </Text>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
        {this.renderGoalsForCategory()}
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
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

export default connect(mapStateToProps, { goalsFetch })(CategoryListItem);
