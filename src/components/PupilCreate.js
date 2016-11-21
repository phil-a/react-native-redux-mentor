import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './common';

class PupilCreate extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input label="Name" placeholder="John Smith" />
        </CardSection>

        <CardSection>
          <Input label="Phone" placeholder="555-555-5555" />
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

export default PupilCreate;
