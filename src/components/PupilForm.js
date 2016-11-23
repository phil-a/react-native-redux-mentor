import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { pupilUpdate } from '../actions';
import { CardSection, Input } from './common';

class PupilForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="John Smith"
            value={this.props.name}
            onChangeText={value => this.props.pupilUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.pupilUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.pickerLabel}>Select Day</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.pupilUpdate({ prop: 'shift', value })}
            style={styles.picker}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  picker: {
    width: 200,
    marginLeft: 10
  },
  pickerLabel: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const {name, phone, shift} = state.pupilForm;

  return { name, phone, shift }
};

export default connect(mapStateToProps, { pupilUpdate })(PupilForm);
