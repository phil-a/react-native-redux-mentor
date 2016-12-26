import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { goalsFetch } from '../actions';
import { Card, CardSection, Button } from './common';
import Grid from 'react-native-grid-component';
import FlipCard from 'react-native-flip-card'

class CategoryListItem extends Component {

  componentWillMount() {
    this.props.goalsFetch();
  }

  colorStyle = function(color) {
    return {
      backgroundColor: color,
    }
  }

  onRowPress() {
    Actions.categoryEdit({ category: this.props.category });
  }

  onGoalPress(goal) {
    Actions.goalEdit({ goal: goal });
  }

  _renderItem = (data: any, i: number) => {
    return (
      <FlipCard
        key={i}
        style={styles.item}
        friction={25}
        perspective={200}
        flipHorizontal={true}
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
      source={{uri: 'https://lh3.googleusercontent.com/6Wy8-iSfaJhcbzym-vMOd6l2393bDmaJKOBUqYtO6pjvi3ZfHVGe41IWmVOF6nnZr64DWCzkLQ=s640-h400-e365'}}
      >
        <View style={styles.face}>
          <Text style={styles.goalName}>{data.name}</Text>
          <View style={styles.goalSpace}>
            <Text style={styles.goalTime}>{data.quantity} every {data.frequency} days</Text>
          </View>
          <Text style={styles.goalDesc}>{data.desc}</Text>
        </View>
      </Image>
    );
  }

  _renderBack(data) {
    return (
      <View style={styles.back}>
        <View style={styles.backSection}>
          <TouchableOpacity  style={styles.goalCornerButton} onPress={() => console.log("View pressed")}><Text style={styles.goalView}>View</Text></TouchableOpacity>
          <TouchableOpacity  style={styles.goalCornerButton} onPress={() => this.onGoalPress(data)}><Text style={styles.goalEdit}>Edit</Text></TouchableOpacity>
        </View>
        <View style={styles.backSection}>
          <TouchableOpacity  style={styles.goalCompleteButton} onPress={() => console.log("Complete pressed")}><Text style={styles.goalComplete}>Complete</Text></TouchableOpacity>
        </View>

        <View style={styles.backSection}>
        </View>

      </View>
    );
  }

  renderCategory() {
    const { name, color } = this.props.category;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View style={[styles.categoryRowStyle, this.colorStyle(color)]}>
          <Text style={styles.categoryTitle}>
            { name } { color }
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
          data={this.props.goals.filter((goal) => goal.category == this.props.category.name)}
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
    paddingLeft: 15
  },
  categoryRowStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  item: {
    flex: 1,
    height: 160,
    margin: 1,
    backgroundColor: 'rgba(0,122,255, 0.15)',
    borderWidth: 0,
    borderColor: '#007aff'
  },
  list: {
    flex: 1,
  },
  face:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  back:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  backSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  goalName: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)'
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
    color: 'rgba(255,255,255,0.6)',
    padding: 5,
    backgroundColor: 'rgba(0,122,255, 0.15)'
  },
  goalEdit: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
    padding: 5,
    backgroundColor: 'rgba(0,122,255, 0.15)'
  },
  goalComplete: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: 'rgba(255,255,255,0.6)',
    padding: 5,
    backgroundColor: 'rgba(0,255,122, 0.15)'
  },
  goalTime: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)'
  },
  goalSpace: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  goalDesc: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)'
  },
  goalImage: {
    width: null,
    height: 160
  }
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

export default connect(mapStateToProps, { goalsFetch })(CategoryListItem);
