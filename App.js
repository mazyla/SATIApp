import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, Image,
  View, Animated, Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TabViewAnimated } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Route, NavigationState } from 'react-native-tab-view/types';

// import the views from components folder
import EmergencyCallView from './src/components/EmergencyCall.js';
import CheckInView from './src/components/CheckIn.js';
import NewsFeedView from './src/components/NewsFeed.js';
import MoreView from './src/components/More.js';
import ResourcesView from './src/components/Resources.js';

// import styles from styles folder
import styles from './src/styles/styles.js'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ASPECT_RATIO = width/height;

// initial constant Bangkok location
const LATITUDE = 13.73617;
const LONGITUDE = 100.523186;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const AnimatedIcon = Animated.createAnimatedComponent(Icon);


type State = NavigationState<
  Route<{
    key: string,
    title: string,
    icon: string,
  }>
>;

export default class App extends Component<*, State> {
  static title = 'No animation';
  static backgroundColor = '#f4f4f4';
  static tintColor = '#222';
  static appbarElevation = 4;

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Contact', icon: 'ios-call' },
      { key: '2', title: 'Resources', icon: 'ios-compass' },
      { key: '3', title: 'Newsfeed', icon: 'ios-navigate' },
      { key: '4', title: 'Check In', icon: 'ios-checkmark' },
      { key: '5', title: 'More', icon: 'ios-more' },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderLabel = ({ position, navigationState }) => ({ route, index }) => {
    const inputRange = navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? '#58aa96' : '#939393')
    );
    const color = position.interpolate({
      inputRange,
      outputRange,
    });
    return (
      <Animated.Text style={[styles.label, { color }]}>
        {route.title}
      </Animated.Text>
    );
  };

  _renderIcon = ({ navigationState, position }) => ({ route, index }) => {
    const inputRange = navigationState.routes.map((x, i) => i);
    const filledOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 1 : 0)),
    });
    const outlineOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 0 : 1)),
    });
    return (
      <View style={styles.iconContainer}>
        <AnimatedIcon
          name={route.icon}
          size={26}
          style={[styles.icon, { opacity: filledOpacity }]}
        />
        <AnimatedIcon
          name={route.icon}
          size={26}
          style={[styles.icon, styles.outline, { opacity: outlineOpacity }]}
        />
      </View>
    );
  };

  _renderFooter = props => (
    <View style={styles.tabbar}>
      {props.navigationState.routes.map((route, index) => {
        return (
          <TouchableWithoutFeedback
            key={route.key}
            onPress={() => props.jumpToIndex(index)}
          >
            <Animated.View style={styles.tab}>
              {this._renderIcon(props)({ route, index })}
              {this._renderLabel(props)({ route, index })}
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <View>
            <StatusBar
              barStyle="light-content" />
            <View style={ styles.topBar } >
              <Text style={ styles.topBarText }>
                Emergency </Text>
            </View>
            <EmergencyCallView />
          </View>
        );
      case '2':
        return (
          <View>
            <View style={ styles.topBar } >
              <Text style={ styles.topBarText }>
                Resources </Text>
            </View>
            <ResourcesView/>
          </View>
        );
      case '3':
        return (
          <View>
            <View style={ styles.topBar } >
              <Text style={ styles.topBarText }>
                All Feeds </Text>
            </View>
            <NewsFeedView/>
          </View>
        );
      case '4':
        return (
          <View>
            <View style={ styles.topBar } >
              <Text style={ styles.topBarText }>
                Check-In </Text>
            </View>
            <CheckInView />
          </View>
        );
      case '5':
        return (
          <View>
            <View style={ styles.topBar } >
              <Text style={ styles.topBarText }>
                Settings </Text>
            </View>
            <MoreView />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
        animationEnabled={false}
        swipeEnabled={false}
      />
    );
  }
}
