import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { categoryUpdate, categoryCreate } from '../actions';
import { Card, CardSection, Button, Spacer } from './common';
import CategoryForm from './CategoryForm';
import { MKColor } from 'react-native-material-kit';

class CategoryCreate extends Component {

  onButtonPress(){
    const { name, color } = this.props;

    this.props.categoryCreate({ name, color })
  }

  render() {
    return (
      <View>
        <Spacer />
        <Card>
          <CategoryForm {...this.props} />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)} backgroundColor={MKColor.Green}>
              Create Category
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  const { name, color } = state.categoryForm;
  return { name, color }
};

export default connect(mapStateToProps, {categoryUpdate, categoryCreate})(CategoryCreate);
