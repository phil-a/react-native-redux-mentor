import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { categoryUpdate } from '../actions';
import { CardSection, Input, Button } from './common';

class CategoryForm extends Component {

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Category"
            placeholder="Exercise"
            value={this.props.name}
            onChangeText={value => this.props.categoryUpdate({ prop: 'name', value })}
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
  const {name} = state.categoryForm;

  return { name }
};

export default connect(mapStateToProps, { categoryUpdate })(CategoryForm);
