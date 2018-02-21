import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
    Text, Platform, View, StatusBar, Button
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Constants, lp, wp } from './constants/constants.js';
import styles from './styles/styles.js';

import EmergencyCall from './screens/EmergencyCall'
import Resources from './screens/Resources'
import NewsFeed from './screens/NewsFeed'
import CheckIn from './screens/CheckIn'
import Education from './screens/Education'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import EducationSearch from './screens/EducationSearch'

import Profile from './screens/Profile'
import NewsFeedSeeAll from './screens/NewsFeedSeeAll'
import LostSeeAll from './screens/LostSeeAll'


export const LoginStack = StackNavigator({
  Login: {
    screen: Login,
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
  Tabs: {
    screen: EmergencyCall,
   headerMode: 'screen',
   navigationOptions: {
     header: null,
   },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
          title: 'Create an account',
    },
  },
});

export const EducationSearchStack = StackNavigator({
  Education: {
    screen: Education,
    navigationOptions: {
      header: null,
    },
  },
  EducationSearch: {
    screen: EducationSearch,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    },
  },
});

export const CheckInProfileStack = StackNavigator({
  CheckIn: {
    screen: CheckIn,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: Profile,
    headerMode: 'screen',
    navigationOptions: {
      headerTitle: "Your Profile",
      tabBarVisible: false,
    },
  },
});

export const NewsFeedStack = StackNavigator({
  NewsFeed: {
    screen: NewsFeed,
    navigationOptions: {
      header: null,
    },
  },
NewsFeedSeeAll: {
  screen: NewsFeedSeeAll,
  navigationOptions: {
    header: null,
    tabBarVisible: false,
  },
},
LostSeeAll: {
  screen: LostSeeAll,
  navigationOptions: {
    header: null,
    tabBarVisible: false,
  },
},
});

export const Tabs = TabNavigator({

  EmergencyCall: {
    screen: EmergencyCall,
     navigationOptions: {
       tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>Emergency</Text>),
       tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-call' : 'ios-call-outline'}
          size={26}
          style={{marginBottom: (Platform.OS === 'ios') ? 20 : 0, color: focused ? '#55ab98' : '#a09e9f'}}
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
         style={{marginBottom: (Platform.OS === 'ios') ? 20 : 0, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
  NewsFeed: {
    screen: NewsFeedStack,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>NewsFeed</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-navigate' : 'ios-navigate-outline'}
         size={26}
         style={{marginBottom: (Platform.OS === 'ios') ? 20 : 0, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
  CheckIn: {
    screen: CheckInProfileStack,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>Check In</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-checkmark' : 'ios-checkmark-outline'}
         size={32}
         style={{marginBottom: (Platform.OS === 'ios') ? 20 : 0, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
  },
  Education: {
    screen: EducationSearchStack,
    navigationOptions: {
      tabBarLabel: ({tintColor, focused}) => (<Text style={{marginBottom: 3, textAlign: 'center', fontSize: 12, color: focused ? '#55ab98' : '#a09e9f'}}>Education</Text>),
      tabBarIcon: ({ tintColor, focused }) => (
       <Icon
         name={focused ? 'ios-clipboard' : 'ios-clipboard-outline'}
         size={26}
         style={{marginBottom: (Platform.OS === 'ios') ? 20 : 0, color: focused ? '#55ab98' : '#a09e9f'}}
       />
     ),
   },
 },
},
 {
    tabBarPosition: 'bottom',  // So your Android tabs go bottom
    tabBarOptions: {
      inactiveTintColor: '#a09e9f', // Color of tab when not pressed
      showIcon: 'true', // Shows an icon for both iOS and Android

      labelStyle: {
        fontSize: 12,
      },

      style: {
        backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue
         height: (Platform.OS === 'ios') ? 49 : lp(8) // I didn't use this in my app, so the numbers may be off.
      }
    },
});
