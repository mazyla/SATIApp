import React, { Component } from 'react';
import { LoginStack, Tabs, Login } from './src/router'
// import  { Login } from './src/screens/Login';
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
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user: user,
      });
    });
  }

  // componentWillUnmount() {
  //   this.authSubscription();
  // }


  render() {
    // The application is initialising
        if (this.state.loading) return null;
        // The user is an Object, so they're logged in
        if (this.state.user) return <Tabs />;
        // The user is null, so they're logged out
        return <LoginStack />;
  }
}

export const fb = firebaseApp;
