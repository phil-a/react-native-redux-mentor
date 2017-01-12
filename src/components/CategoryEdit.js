import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import { categoryUpdate, categorySave, categoryNotSaved, categoryDelete } from '../actions';
import { Card, CardSection, Button, Confirm, Spacer } from './common';
import Communications from 'react-native-communications';
import { MKColor } from 'react-native-material-kit';

class CategoryEdit extends Component {
  state = {showModal: false};
  componentWillMount() {
    _.each(this.props.category, (value, prop) => {
      this.props.categoryUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    const { name, color } = this.props;
    this.props.categoryNotSaved({ name });
  }

  onButtonPress() {
    const { name, color } = this.props;
    this.props.categorySave({ name, color, uid: this.props.category.uid });
  }

  onAccept() {
    const { uid } = this.props.category;
    this.props.categoryDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <View>
        <Spacer />
        <Card>
          <CategoryForm />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)} backgroundColor={MKColor.Blue}>
              Save Changes
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })} backgroundColor={'#F44336'}>
              Remove Category
            </Button>
          </CardSection>
          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to delete this?
          </Confirm>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, color } = state.categoryForm;

  return { name, color };
};

export default connect(mapStateToProps, { categoryUpdate, categorySave, categoryNotSaved, categoryDelete })(CategoryEdit)
