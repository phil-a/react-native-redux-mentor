import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PupilForm from './PupilForm';
import { pupilUpdate, pupilSave, pupilNotSaved } from '../actions';
import { Card, CardSection, Button } from './common';
import Communications from 'react-native-communications';

class PupilEdit extends Component {

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
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.pupilForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { pupilUpdate, pupilSave, pupilNotSaved })(PupilEdit)
