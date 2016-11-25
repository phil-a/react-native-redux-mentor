import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PupilForm from './PupilForm';
import { pupilUpdate, pupilSave, pupilNotSaved, pupilDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Communications from 'react-native-communications';

class PupilEdit extends Component {
  state = {showModal: false};
  componentWillMount() {
    _.each(this.props.pupil, (value, prop) => {
      this.props.pupilUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    const { name, phone, shift } = this.props;
    this.props.pupilNotSaved({ name, phone, shift });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.pupilSave({ name, phone, shift, uid: this.props.pupil.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.pupil;
    this.props.pupilDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Card>
        <PupilForm />

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
            Remove Pupil
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
  const { name, phone, shift } = state.pupilForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { pupilUpdate, pupilSave, pupilNotSaved, pupilDelete })(PupilEdit)
