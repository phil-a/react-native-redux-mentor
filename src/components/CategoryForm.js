import React, { Component } from 'react';
import { TouchableOpacity, Text, Modal, View } from 'react-native';
import { connect } from 'react-redux';
import { categoryUpdate } from '../actions';
import { CardSection, Input, Button, Color } from './common';
import { ColorPicker } from 'react-native-color-picker';

class CategoryForm extends Component {

  state = { modalVisible: false }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  setColorInForm(value) {
    this.props.categoryUpdate({ prop: 'color', value })
    this.setModalVisible(false);
  }

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
        <CardSection>
          <View style={styles.colorPickerContainer}>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
               <View style={{flex: 1}}>
                <ColorPicker
                  oldColor={this.props.color}
                  onColorSelected={value => this.setColorInForm(value)}
                  onOldColorSelected={value => this.setColorInForm(value)}
                  style={{flex: 8}}
                />
                  <Button onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                    Hide Modal
                  </Button>
                </View>
              </Modal>

              <View style={styles.colorPicker}>
                <Text style={styles.pickerLabel}>Color</Text>
                <TouchableOpacity
                onPress={() => {this.setModalVisible(true)}}
                style={[styles.colorSelect, {backgroundColor: this.props.color}]}>
                </TouchableOpacity>
              </View>

            </View>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  colorPickerContainer: {
    flex: 1,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorSelect: {
    flex: 2,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 100,
  },
  pickerLabel: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const {name, color} = state.categoryForm;

  return { name, color }
};

export default connect(mapStateToProps, { categoryUpdate })(CategoryForm);
