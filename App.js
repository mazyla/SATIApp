// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text, Image,
//   View, Animated, Dimensions,
//   TouchableWithoutFeedback,
//   StatusBar,
// } from 'react-native';
// import * as firebase from 'firebase';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { TabViewAnimated } from 'react-native-tab-view';
// import Icon from 'react-native-vector-icons/Ionicons';
// import type { Route, NavigationState } from 'react-native-tab-view/types';
// import Navigator from 'react-native-deprecated-components';
//
// // import the views from components folder
// import CheckInView from './src/components/CheckIn.js';
// import NewsFeedView from './src/components/NewsFeed.js';
// import MoreView from './src/components/More.js';
// import ResourcesView from './src/components/Resources.js';
// import EmergencyCallView from './src/components/EmergencyCall.js';
// import LoginView from './src/components/Login.js'
//
// // import styles from styles folder
// import styles from './src/styles/styles.js'
//
// const width = Dimensions.get('window').width
// const height = Dimensions.get('window').height
// const ASPECT_RATIO = width/height;
//
// // initial constant Bangkok location
// const LATITUDE = 13.73617;
// const LONGITUDE = 100.523186;
//
// const LATITUDE_DELTA = 0.01;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//
// const AnimatedIcon = Animated.createAnimatedComponent(Icon);
//
// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCEZtVvuluF1-A5ilN9UeOgGvkp13WoYeo",
//   authDomain: "satiapp-1515724417816.firebaseapp.com",
//   databaseURL: "https://satiapp-1515724417816.firebaseio.com",
//   projectId: "satiapp-1515724417816",
//   storageBucket: "satiapp-1515724417816.appspot.com",
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);
//
//
// type State = NavigationState<
//   Route<{
//     key: string,
//     title: string,
//     icon: string,
//   }>
// >;
//
// import Home from "./src/components/Home.js";
// import Login from "./src/components/Login.js";
// // import Firebase from "./includes/firebase/firebase";
//
// export default class Initial extends Component {
//
//   constructor(props) {
//     super(props);
//
//     this.getInitialView();
//
//     this.state = {
//       userLoaded: false,
//       initialView: null
//     };
//
//     this.getInitialView = this.getInitialView.bind(this);
//
//   }
//
//   getInitialView() {
//
//     firebase.auth().onAuthStateChanged((user) => {
//
//       let initialView = user ? "Home" : "Login";
//
//       this.setState({
//         userLoaded: true,
//         initialView: initialView
//       })
//     });
//
//
//   }
//
//   static renderScene(route, navigator) {
//
//     switch (route.name) {
//
//       case "Home":
//         return (<Home navigator={navigator} />);
//         break;
//
//       case "Login":
//         return (<Login navigator={navigator} />);
//         break;
//
//     }
//
//   }
//
//   static configureScene(route) {
//
//    if (route.sceneConfig) {
//      return (route.sceneConfig);
//    } else {
//      return ({
//        ...Navigator.SceneConfigs.HorizontalSwipeJump,
//        gestures: {}
//      });
//    }
//
//  }
//
//  render() {
//
//    if (this.state.userLoaded) {
//
//      return (
//          <Navigator
//              initialRoute={{name: this.state.initialView}}
//              renderScene={Initial.renderScene}
//              configureScene={Initial.configureScene}
//          />);
//    } else {
//      return null;
//    }
//
//  }
//
// }


import React, { Component } from 'react';
import { LoginStack } from './src/router'

export default class App extends Component {
  render() {
    return <LoginStack />;
  }
}
