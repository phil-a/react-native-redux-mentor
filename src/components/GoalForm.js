import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { goalUpdate, categoryCreate, goalCategoryCreate, categoriesFetch } from '../actions';
import { CardSection, Input, Button } from './common';
import ModalPicker from 'react-native-modal-picker';

class GoalForm extends Component {

  constructor() {
      super();
      this.state = {
          categoryInputValue: ''
      }
  }
  componentWillMount() {
    this.props.categoriesFetch();
    this.setState({categoryInputValue: this.props.category || "Select Category"});
  }

  onAddCategoryPress() {
    this.props.goalCategoryCreate();
  }

  mapCategoryData(category, category_data) {
   const data = {key: category.uid, label: category.name}
   return category_data.push(data)
  }

  onPressCategory(value) {
    this.props.goalUpdate({ prop: 'category', value: value.label })
    this.setState({ categoryInputValue: value.label })
  }

  render() {
    var category_data = [];
    this.props.categories.map((category) => this.mapCategoryData(category, category_data));
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
        <View style={styles.categoryRowStyle}>
          <Text style={styles.pickerLabel}>Category</Text>
          <ModalPicker
            data={category_data}
            onChange={value => this.onPressCategory(value)}
            style={styles.picker}
          >
          <Text style={styles.pickerText}>{this.state.categoryInputValue}</Text>
          </ModalPicker>
            <TouchableOpacity
              onPress={this.onAddCategoryPress.bind(this)}
              style={styles.addCategoryButton}
            >
              <Text style={styles.addCategoryText}>+</Text>
            </TouchableOpacity>
        </View>
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
  categoryRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  picker: {
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#007aff',
    borderWidth: 1
  },
  pickerLabel: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  pickerText: {
    color: '#007aff',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  addCategoryButton: {
    width: 40
  },
  addCategoryText: {
    backgroundColor: 'transparent',
    fontSize: 24,
    padding: 5
  }
};

const mapStateToProps = (state) => {
  const {name, desc, category, quantity, frequency} = state.goalForm;
  const categories = _.map(state.categories, (val, uid) => {
    return { ...val, uid };
  });
  return { name, desc, category, quantity, frequency, categories }
};

export default connect(mapStateToProps, { goalUpdate, categoryCreate, goalCategoryCreate, categoriesFetch })(GoalForm);
