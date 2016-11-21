import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pupilUpdate } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class PupilCreate extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="John Smith"
            value={this.props.name}
            onChangeText={text => this.props.pupilUpdate({ prop: 'name', value: text })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={text => this.props.pupilUpdate({ prop: 'phone', value: text })}
          />
        </CardSection>

        <CardSection>
          <Input label="Day" placeholder="Monday" />
        </CardSection>

        <CardSection>
          <Button>
            Create Pupil
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.pupilForm;
  return {name, phone, shift}
};

export default connect(mapStateToProps, { pupilUpdate })(PupilCreate);
