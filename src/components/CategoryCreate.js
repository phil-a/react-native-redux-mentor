import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { categoryUpdate, categoryCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import CategoryForm from './CategoryForm';

class CategoryCreate extends Component {

  onButtonPress(){
    const { name } = this.props;

    this.props.categoryCreate({ name })
  }

  render() {
    return (
      <Card>
        <CategoryForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create Category
          </Button>
        </CardSection>
      </Card>
    );
  }

}

const mapStateToProps = (state) => {
  const { name } = state.categoryForm;
  return { name }
};

export default connect(mapStateToProps, {categoryUpdate, categoryCreate})(CategoryCreate);
