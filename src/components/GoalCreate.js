import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { goalUpdate, goalCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import GoalForm from './GoalForm';

class GoalCreate extends Component {

  onButtonPress(){
    const { name, desc, category } = this.props;

    this.props.goalCreate({ name, desc, category })
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
  const { name, desc, category } = state.goalForm;
  return { name, desc, category }
};

export default connect(mapStateToProps, { goalUpdate, goalCreate })(GoalCreate);
