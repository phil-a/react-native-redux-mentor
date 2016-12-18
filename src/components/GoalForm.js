import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { goalUpdate, categoryCreate, goalCategoryCreate } from '../actions';
import { CardSection, Input, Button } from './common';

class GoalForm extends Component {
  onAddCategoryPress() {
    this.props.goalCategoryCreate();
  }

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
          <Button
          onPress={this.onAddCategoryPress.bind(this)}>
          + cat
          </Button>
        </CardSection>

        <CardSection>
          <Input
            label="Quantity"
            placeholder="50"
            keyboardType="numeric"
            value={this.props.quantity}
            onChangeText={value => this.props.goalUpdate({ prop: 'quantity', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Frequency"
            placeholder="1"
            keyboardType="numeric"
            value={this.props.frequency}
            onChangeText={value => this.props.goalUpdate({ prop: 'frequency', value })}
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
  const {name, desc, category, quantity, frequency} = state.goalForm;

  return { name, desc, category, quantity, frequency }
};

export default connect(mapStateToProps, { goalUpdate, categoryCreate, goalCategoryCreate })(GoalForm);
