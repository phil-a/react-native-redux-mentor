import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import { categoryUpdate, categorySave, categoryNotSaved, categoryDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Communications from 'react-native-communications';

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
      <Card>
        <CategoryForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
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
    );
  }
}

const mapStateToProps = (state) => {
  const { name, color } = state.categoryForm;

  return { name, color };
};

export default connect(mapStateToProps, { categoryUpdate, categorySave, categoryNotSaved, categoryDelete })(CategoryEdit)
