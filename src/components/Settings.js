import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { displayTypeChanged, settingsSave, settingsFetch } from '../actions';
import { Actions } from 'react-native-router-flux';
import { MKSwitch, MKColor } from 'react-native-material-kit';
import { Card, CardSection, Button } from './common';

class Settings extends Component {
  componentWillMount() {
    this.props.settingsFetch();
  }

  onSavePress() {
    const { isTypeGrid } = this.props;
    this.props.settingsSave({ isTypeGrid });
  }

  renderGridSample() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{width: null, height: 125}}
          source={require('../images/grid_view.png')}
        />
        <Text style={styles.switchText}>Grid</Text>
      </View>
    );
  }

  renderCarouselSample() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{width: null, height: 125}}
          source={require('../images/carousel_view.png')}
        />
        <Text style={styles.switchText}>Carousel</Text>
      </View>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          {
            (this.props.isTypeGrid)
            ?
            this.renderGridSample()
            :
            this.renderCarouselSample()
          }
          <View style={styles.switchStyle}>
            <MKSwitch
                checked={this.props.isTypeGrid}
                trackSize={30}
                trackLength={52}
                onColor="rgba(255,152,0,.3)"
                thumbOnColor={MKColor.Orange}
                rippleColor="rgba(255,152,0,.2)"
                onPress={() => console.log('orange switch pressed')}
                onCheckedChange={(e) => this.props.displayTypeChanged(e.checked)}
            />
          </View>
        </CardSection>
        <CardSection>
          <Button onPress={this.onSavePress.bind(this)}>
            Save Settings
          </Button>
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  switchStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  switchText: {
    color: '#007aff',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
}

const mapStateToProps = ({ settings }) => {
  const { isTypeGrid } = settings;

  return { isTypeGrid };
};

export default connect(mapStateToProps, { displayTypeChanged, settingsSave, settingsFetch })(Settings);
