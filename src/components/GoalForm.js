import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { goalUpdate } from '../actions';
import { CardSection, Input } from './common';

class GoalForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Pushups"
            value={this.props.name}
            onChangeText={value => this.props.goalUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Description"
            placeholder="I want to be healthy"
            value={this.props.desc}
            onChangeText={value => this.props.goalUpdate({ prop: 'desc', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Category"
            placeholder="Exercise"
            value={this.props.category}
            onChangeText={value => this.props.goalUpdate({ prop: 'category', value })}
          />
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
  const {name, desc, category} = state.goalForm;

  return { name, desc, category }
};

export default connect(mapStateToProps, { goalUpdate })(GoalForm);
