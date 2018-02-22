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

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  componentWillMount() {
    this.setAdmin();
  }

  setAdmin = () => {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if (user === null) return;
      var userRef = firebaseApp.database().ref().child('users');
      var userDetails = userRef.orderByChild("email").equalTo(user.email);
      userDetails.on("value", function(snapshot) {
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            this.setState({
              isAdmin: item.isAdmin,
              user: user,
              loading: false,
            });
        });
      }, this);
    });
  }

  renderScreen() {
    // The application is initialising
    if (this.state.loading) return null;
    if (this.state.isAdmin) {
      return <AdminTabs />;
    } else if (this.state.user) {
      return <Tabs />;
    } else return <LoginStack />;
  }

  render() {
    return this.renderScreen();
  }
}

export const fb = firebaseApp;
