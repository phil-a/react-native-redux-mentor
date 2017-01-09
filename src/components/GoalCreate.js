import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { goalUpdate, goalCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import GoalForm from './GoalForm';
import moment from 'moment';
import { MKColor } from 'react-native-material-kit';

class GoalCreate extends Component {

  onButtonPress(){
    let created_at = moment().format();
    const { name, desc, category, quantity, frequency, imageUrl } = this.props;
    this.props.goalCreate({ name, desc, category: category || 'Default', quantity, frequency, imageUrl, created_at })
  }

  render() {
    return (
      <Card>
        <GoalForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)} backgroundColor={MKColor.Green}>
            Create Goal
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, desc, category, quantity, frequency, imageUrl } = state.goalForm;
  return { name, desc, category, quantity, frequency, imageUrl }
};

export default connect(mapStateToProps, { goalUpdate, goalCreate })(GoalCreate);
