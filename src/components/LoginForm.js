import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { emailChanged, passwordChanged, loginUser, reauthUserSuccess } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class LoginForm extends Component {

  componentWillMount() {
    if (this.props.authenticated) {
      debugger;
      this.props.reauthUserSuccess(this.props.user)
      Actions.main({ type: 'reset' });
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderSpinner(){
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    }
  }

  renderError(){
    if (this.props.error) {
      return (
        <Text style={styles.errorText}>
          {this.props.error}
        </Text>
      );
    }
  }

  render() {
    return (
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Login
            </Button>
          </CardSection>
          {this.renderError()}
          {this.renderSpinner()}
        </Card>
    );
  }
}

const styles = {
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, authenticated, user } = auth;

  return { email, password, error, loading, authenticated, user };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, reauthUserSuccess  })(LoginForm);
