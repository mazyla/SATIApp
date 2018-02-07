import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles/styles.js';

export default class MoreView extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  _logout() {
        try {
            firebase.auth().signOut();
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };



  render() {
    return (
      <View style={styles.singleTab}>

      <View style={styles.topBarContainer}>
        <StatusBar hidden={false} />
        <View style={styles.topBarTextContainer}>
          <Text style={styles.topBarText}>Settings</Text>
        </View>
      </View>

        <View style={styles.logoutButtonContainer}>
        <TouchableOpacity
          onPress={this._logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
