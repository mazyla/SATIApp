import React, { Component } from 'react';
import { Alert } from 'react-native';
import { LoginStack, Tabs, Login, AdminTabs } from './src/router'
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEZtVvuluF1-A5ilN9UeOgGvkp13WoYeo",
  authDomain: "satiapp-1515724417816.firebaseapp.com",
  databaseURL: "https://satiapp-1515724417816.firebaseio.com",
  projectId: "satiapp-1515724417816",
  storageBucket: "satiapp-1515724417816.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isAdmin: false,
    };

    _setLoadingUser = (user) => {
        this.setState ({
          loading: false,
          user: user,
          isAdmin: false,
        })
      };

      console.ignoredYellowBox = [
        'Setting a timer'
];
    }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      _setLoadingUser(user);
      var userRef = firebaseApp.database().ref().child('users');
      var tempIsAdmin;
      var userDetails = userRef.orderByChild("email").equalTo(user.email);
      userDetails.once("value", function(snapshot) {
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            tempIsAdmin = item.isAdmin;

        });
        this.setState({isAdmin: tempIsAdmin});
        Alert.alert(this.state.isAdmin.toString());
      }, this);
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    // The application is initialising
    if (this.state.loading) return null;
    //Alert.alert(this.state.isAdmin.toString());
    if (this.state.isAdmin) return <AdminTabs />
    if (this.state.user) return <Tabs />
    return <LoginStack />;
  }
}

export const fb = firebaseApp;
