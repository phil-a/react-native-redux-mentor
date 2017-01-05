import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goalsFetch, goalComplete } from '../actions';
import { Card, CardSection, Button, PressAndHoldButton } from './common';
import Grid from 'react-native-grid-component';
import FlipCard from 'react-native-flip-card'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { extractDates } from '../helpers';

class CategoryListItem extends Component {

  componentWillMount() {
    this.props.goalsFetch();
  }

  colorStyle = function(color) {
    return {
      backgroundColor: color,
    }
  }

  completedTodayStyle = function(dates_completed, color) {
    const dates_array = extractDates(dates_completed);
    const today = moment().format("YYYY-MM-DD");
    return (dates_array[dates_array.length-1] == today) ? { borderColor: color } : { borderColor: 'lightgrey' }
  }

  onRowPress() {
    Actions.categoryEdit({ category: this.props.category });
  }

  onGoalPress(goal) {
    Actions.goalEdit({ goal: goal });
  }

  onGoalViewPress(goal) {
    Actions.goalView({ goal: goal });
  }

  onCompletePress(goal, action) {
    let now = moment().format();
    action({ completed_datetime: now, uid: goal.uid });
  }

  _renderItem = (data: any, i: number) => {
    return (
      <FlipCard
        key={i}
        style={[styles.item, this.completedTodayStyle(data.dates_completed, this.props.category.color)]}
        friction={4}
        perspective={900}
        flipHorizontal={false}
        flipVertical={true}
        flip={false}
        clickable={true}
        onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
      >
      {this._renderFront(data)}
      {this._renderBack(data)}
      </FlipCard>
    );
  }

  _renderFront(data) {
    return (
      <Image
      style={styles.goalImage}
      resizeMode='cover'
      source={{uri: data.imageUrl}}
      >
        <View style={styles.face}>
          <LinearGradient colors={['rgba(255,255,255,0.0)', 'rgba(255,255,255,0.0)', 'rgba(255,255,255,0.8)']} style={styles.linearGradient}>
            <View style={styles.goalSpace}>
              <Text style={styles.goalName}>{data.name}</Text>
              <Text style={styles.goalTime}>{data.quantity} every {data.frequency} days</Text>
            </View>
          </LinearGradient>
        </View>
      </Image>
    );
  }

  _renderBack(data) {
    return (
      <Image
      style={styles.goalImage}
      resizeMode='cover'
      source={{uri: data.imageUrl}}
      >
        <View style={styles.back}>
          <View style={styles.backSection}>
            <TouchableOpacity
              style={styles.goalCornerButton}
              onPress={() => this.onGoalViewPress(data)}
            >
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']} style={styles.linearGradient}>
              <Text style={styles.goalView}>View</Text>
            </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goalCornerButton}
              onPress={() => this.onGoalPress(data)}
            >
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']} style={styles.linearGradient}>
              <Text style={styles.goalEdit}>Edit</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.completeSection}>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']} style={styles.linearGradient}>
              <PressAndHoldButton onCompletePress={this.onCompletePress} goal={data} action={this.props.goalComplete}/>
            </LinearGradient>
          </View>
        </View>
      </Image>
    );
  }

  renderCategory() {
    const { name, color } = this.props.category;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={[styles.categoryRowStyle, this.colorStyle(color)]}>
          <Text style={styles.categoryTitle}>
            { name }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <Card>
        {this.renderCategory()}
        <Grid
          style={styles.list}
          renderItem={this._renderItem}
          data={this.props.goals.filter((goal) => goal.category === this.props.category.name)}
          itemsPerRow={2}
          itemHasChanged={(d1, d2) => d1 !== d2}
        />
      </Card>
    );
  }
}

const styles = {
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    paddingLeft: 15,
  },
  categoryRowStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  item: {
    flex: 1,
    height: 160,
    margin: 5,
    borderWidth: 5,
  },
  list: {
    flex: 1,
  },
  face:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  back:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(35,35,35,0.5)',
  },
  backSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(35,35,35,0.2)',
  },
  goalCornerButton: {
    flex: 1,
    height: 40,
  },
  goalCompleteButton: {
    flex: 1,
  },
  goalView: {
    flex: 1,
    textAlign: 'left',
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  goalEdit: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  completeSection: {
    flex: 0.36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.0)'
  },
  goalComplete: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: 'rgba(0,0,0,0.9)',
    padding: 5
  },
  goalName: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.8)',
  },
  goalTime: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.8)',
  },
  goalSpace: {
    flex: 1,
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  goalDesc: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.9)',
  },
  goalImage: {
    width: null,
    height: 150,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
}

const mapStateToProps = state => {
  const goals = _.map(state.goals, (val, uid) => {
    return { ...val, uid };
  });

  const categories = _.map(state.categories, (val, uid) => {
    return { ...val, uid };
  });

  return { goals, categories };
}

export default connect(mapStateToProps, { goalsFetch, goalComplete })(CategoryListItem);
