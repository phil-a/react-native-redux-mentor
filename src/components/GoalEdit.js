import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoalForm from './GoalForm';
import { goalUpdate, goalSave, goalNotSaved, goalDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Communications from 'react-native-communications';

class GoalEdit extends Component {
  state = {showModal: false};
  componentWillMount() {
    _.each(this.props.goal, (value, prop) => {
      this.props.goalUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    const { name, desc, category, quantity, frequency } = this.props;
    this.props.goalNotSaved({ name, desc, category, quantity, frequency });
  }

  onButtonPress() {
    const { name, desc, category, quantity, frequency } = this.props;
    this.props.goalSave({ name, desc, category, quantity, frequency, uid: this.props.goal.uid });
  }

  onTextPress() {
    const { name, desc, category, quantity, frequency } = this.props;
    Communications.text('4168988990', `You should probably do ${name} is for ${category}`);
  }

  onAccept() {
    const { uid } = this.props.goal;
    this.props.goalDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Card>
        <GoalForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Session
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Remove Goal
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, desc, category, quantity, frequency } = state.goalForm;

  return { name, desc, category, quantity, frequency };
};

export default connect(mapStateToProps, { goalUpdate, goalSave, goalNotSaved, goalDelete })(GoalEdit)
