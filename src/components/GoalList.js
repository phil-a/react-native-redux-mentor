import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, ListView, View, Image, Text } from 'react-native';
import { goalsFetch, categoriesFetch, settingsFetch, goalComplete } from '../actions';
import GoalListItem from './GoalListItem';
import CategoryListItem from './CategoryListItem';
import SliderEntry from './SliderEntry';
import { Spacer, Button } from './common';
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import mainStyles from '../styles/index.style';
import sliderStyles from '../styles/Slider.style';


class GoalList extends Component {
  state = { selectedGoal: null, loaded: false };
  componentWillMount() {
    this.props.goalsFetch();
    this.props.categoriesFetch();
    this.props.settingsFetch();
    this.createDataSource(this.props);
    this.createCategorySource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    this.createCategorySource(nextProps);
  }

  createDataSource({ goals }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(goals);
    if ( (!this.state.loaded) && (this.props.goals.length > 0) ) {
      this.setState({ loaded: true, selectedGoal: this.props.goals[0] });
    }
  }

  createCategorySource({ categories }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.categorySource = ds.cloneWithRows(categories);
  }

  renderRow(goal) {
    return <GoalListItem goal={goal} />;
  }

  renderCarouselItem(goal) {
    return <SliderEntry {...goal} />;
  }

  renderCategoryRow(category) {
    return <CategoryListItem category={category} />;
  }

  onItemChange(itemData) {
    this.setState({selectedGoal: itemData});
  }

  onGoalComplete(uid) {
    let now = moment().format();
    this.props.goalComplete({ completed_datetime: now, uid: uid });
  }

  render() {

    if (this.props.settings.isTypeGrid) {
      return (
        <View>
        <Image style={{width: null}} source={{uri: 'https://i.reddituploads.com/8aacffcc028349f5afeb8ca530775174?fit=max&h=1536&w=1536&s=d703fc32306fa0c34e5dc4e9e3095e75'}}>
          <ListView
            enableEmptySections
            dataSource={this.categorySource}
            renderRow={this.renderCategoryRow}
          />
          </Image>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#242424'}}>
        <View style={{flex: 1}}></View>
        <Spacer />
        <Carousel
          items={this.props.goals}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.6}
          renderItem={this.renderCarouselItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          slideStyle={sliderStyles.slide}
          containerCustomStyle={sliderStyles.slider}
          contentContainerCustomStyle={sliderStyles.sliderContainer}
          showsHorizontalScrollIndicator={false}
          snapOnAndroid={true}
          removeClippedSubviews={false}
          onSnapToItem={(slideIndex, itemData) => this.onItemChange(itemData)}
        />
        <View style={{ height: 75 }}>
          <Button onPress={() => this.onGoalComplete(this.state.selectedGoal.uid)}>
            Complete '{this.state.selectedGoal.name}'
          </Button>
        </View>
        </View>
      );
    }

  }
}

const mapStateToProps = state => {
  const goals = _.map(state.goals, (val, uid) => {
    return { ...val, uid };
  });

  const categories = _.map(state.categories, (val, uid) => {
    return { ...val, uid };
  });

  const settings = state.settings;

  return { goals, categories, settings };
}

export default connect(mapStateToProps, { goalsFetch, categoriesFetch, settingsFetch, goalComplete })(GoalList);
