import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { extractDates } from '../helpers';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Spacer, SmallSpacer, ModalShow } from './common';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { MKButton, MKColor } from 'react-native-material-kit';
import Calendar from 'react-native-calendar';

class GoalView extends Component {
  state = {showModal: false};

  onCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    const AwardsFab = MKButton.accentColoredFab()
    .withBackgroundColor(MKColor.Teal)
    .withStyle({width: 55, height: 55, borderRadius: 100})
    .withOnPress(() => console.log("Pressed Awards"))
    .build();

    const CalendarFab = MKButton.accentColoredFab()
    .withBackgroundColor(MKColor.Orange)
    .withStyle({width: 55, height: 55, borderRadius: 100})
    .withOnPress(() => this.setState({ showModal: !this.state.showModal }))
    .build();

    const FriendsFab = MKButton.accentColoredFab()
    .withBackgroundColor(MKColor.Blue)
    .withStyle({width: 55, height: 55, borderRadius: 100})
    .withOnPress(() => console.log("Pressed Friends"))
    .build();

    const { name, desc, quantity, frequency, category, imageUrl, created_at, dates_completed } = this.props.goal;
    const completed_array = extractDates(dates_completed);
    return (
      <View style={{flex: 1}}>
      <SmallSpacer />
      <ParallaxScrollView
        backgroundColor="white"
        stickyHeaderHeight={ 50 }
        contentBackgroundColor="white"
        parallaxHeaderHeight={300}
        renderForeground={
          () => (
          <View style={{backgroundColor: 'black'}}>
          <Image
          style={styles.goalImage}
          resizeMode='cover'
          source={{uri: imageUrl}}
          >
            <View style={styles.overlay}>
              <View style={styles.overlaySection}>
                <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
              </View>
              <View style={styles.overlaySection}>
                <Text style={styles.nameText}>{name}</Text>
              </View>
              <View style={styles.overlayButtonSection}>
              <View style={{flex: 1}}/>
              <View style={styles.fabWrapper}>
                <AwardsFab>
                  <Text>Awrd</Text>
                </AwardsFab>
              </View>
              <View style={styles.fabWrapper}>
                <CalendarFab>
                  <Text>Cal</Text>
                </CalendarFab>
              </View>
              <View style={styles.fabWrapper}>
                <FriendsFab>
                  <Text>Frnd</Text>
                </FriendsFab>
              </View>
              <View style={{flex: 1}}/>
              </View>
            </View>
          </Image>
          </View>
          )
        }
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{name}</Text>
          </View>
        )}
      >
      <View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>" {desc} "</Text>
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.frequencyText}>I will need to do this {quantity} times every {frequency} days.</Text>
      </View>
      <ModalShow
        visible={this.state.showModal}
        onClose={this.onCloseModal.bind(this)}
        >
        <Calendar
        showControls
        hasEventCircle
        showEventIndicators
        eventDates={completed_array}
        customStyle={calendarStyle}
        />
      </ModalShow>
      </View>
      </ParallaxScrollView>
      </View>
    );
  }
}

const styles = {
  goalImage: {
    width: null,
    height: 300,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  overlay: {
    height: 300,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlaySection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  overlayButtonSection: {
    flex: 1,
    flexDirection: 'row',
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  nameText: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  stickySection: {
    backgroundColor: 'black',
    paddingBottom: 6,
  },
  stickySectionText: {
    color: '#999',
    fontSize: 20,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  descriptionWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  descriptionText: {
    flex: 1,
    color: '#999',
    fontSize: 24,
    padding: 40,
  },
  frequencyText: {
    flex: 1,
    color: '#999',
    fontSize: 18,
    padding: 40,
  }
}

const calendarStyle = {
  currentDayText: {
    color: 'black',
    fontWeight: 'bold',
  },
  hasEventCircle: {
    backgroundColor: 'lightskyblue',
  },
  selectedDayCircle: {
    backgroundColor: 'black',
  },
  weekendDayText: {
    color: 'lightsteelblue',
  },
  day: {
    color: 'steelblue',
  },
}

export default GoalView;
