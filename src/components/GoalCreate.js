import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { goalUpdate, goalCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import GoalForm from './GoalForm';

class GoalCreate extends Component {

  onButtonPress(){
    const { name, desc, category, quantity, frequency } = this.props;

    this.props.goalCreate({ name, desc, category, quantity, frequency })
  }

  render() {
    return (
      <Card>
        <GoalForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create Goal
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, desc, category, quantity, frequency } = state.goalForm;
  return { name, desc, category, quantity, frequency }
};

export default connect(mapStateToProps, { goalUpdate, goalCreate })(GoalCreate);
