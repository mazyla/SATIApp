import React from 'react';
import { TabNavigator, StackNavigator} from 'react-navigation';
import {
    Text,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
//import { Icon } from 'react-native-elements';

import EmergencyCall from './screens/EmergencyCall'
import Resources from './screens/Resources'
import NewsFeed from './screens/NewsFeed'
import CheckIn from './screens/CheckIn'
import More from './screens/More'
import Login from './screens/Login'
//import Home from './screens/Home'




export const Tabs = TabNavigator({

  EmergencyCall: {
    screen: EmergencyCall,
     navigationOptions: {
       tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>Emergency</Text>),
       tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-call' : 'ios-call-outline'}
          size={26}
          style={{marginBottom: 18, color: focused ? '#55ab98' : '#a09e9f'}}
        />
      ),
    },
    },
  Resources: {
    screen: Resources,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>Resources</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-compass' : 'ios-compass-outline'}
         size={26}
         style={{marginBottom: 20, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
  NewsFeed: {
    screen: NewsFeed,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>NewsFeed</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-navigate' : 'ios-navigate-outline'}
         size={26}
         style={{marginBottom: 20, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
  CheckIn: {
    screen: CheckIn,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>Check In</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-checkmark' : 'ios-checkmark-outline'}
         size={32}
         style={{marginBottom: 20, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
  More: {
    screen: More,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>More</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-more' : 'ios-more-outline'}
         size={26}
         style={{marginBottom: 20, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
});

export const LoginStack = StackNavigator({
  Tabs: {
    screen: Tabs,
   headerMode: 'screen',
   navigationOptions: {
     header: null,
   },

  },
  Login: {
    screen: Login,
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
});
