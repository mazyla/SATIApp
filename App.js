/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, Image,
  View, Animated, Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TabViewAnimated } from 'react-native-tab-view';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Route, NavigationState } from 'react-native-tab-view/types';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

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
      inputIndex => (inputIndex === index ? '#2196f3' : '#939393')
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
            <EmergencyCallView />
          </View>
        );
      case '2':
        return (
          <View style={{flex: 1}}>
            <ResourcesView />
          </View>
        );
      case '3':
        return (
          <View>
            <NewsfeedView />
          </View>
        );
      case '4':
        return (
          <View>
            <CheckInView />
          </View>
        );
      case '5':
        return (
          <View>
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

  class EmergencyCallView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source = {require('./emergency.png')}
          style = {[styles.image]}
        />
      </View>
    );
  }
  }

  class ResourcesView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView style={styles.map}
        provider={ PROVIDER_GOOGLE }
        initialRegion={{
          latitude: 13.736717,
          longitude: 100.523186,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>
      );
      }
    }

  class NewsfeedView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source = {require('./feed.jpg')}
          style = {[styles.image]}
        />
      </View>
    );
  }
  }

  class CheckInView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source = {require('./sati.png')}
          style = {[styles.image]}
        />
      </View>
    );
  }
  }

  class MoreView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 200}}> More </Text>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    paddingTop: 4.5,
  },
  iconContainer: {
    height: 26,
    width: 26,
  },
  icon: {
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '#0084ff',
  },
  outline: {
    color: '#939393',
  },
  label: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  image: {
        marginTop: 200,
        height: 200,
        width: 200,
  },
  map: {
        position: 'absolute',
        width: width,
        height: height,
      }
  });
