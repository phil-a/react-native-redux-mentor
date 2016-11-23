import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { pupilUpdate, pupilCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import PupilForm from './PupilForm';

class PupilCreate extends Component {

  onButtonPress(){
    const { name, phone, shift } = this.props;

    this.props.pupilCreate({ name, phone, shift: shift || 'Monday' })
  }

  render() {
    return (
      <Card>
        <PupilForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create Pupil
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.pupilForm;
  return { name, phone, shift }
};

export default connect(mapStateToProps, { pupilUpdate, pupilCreate })(PupilCreate);
