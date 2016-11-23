import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PupilForm from './PupilForm';
import { pupilUpdate } from '../actions';
import { Card, CardSection, Button } from './common';

class PupilEdit extends Component {

  componentWillMount() {
    _.each(this.props.pupil, (value, prop) => {
      this.props.pupilUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    console.log(name, phone, shift);
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
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.pupilForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { pupilUpdate })(PupilEdit)
