import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';

export default class MoreView extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  _logout() {

    this.props.navigation.navigate('Login');
        // try {
        //     firebase.auth().signOut();
        //
        // } catch (error) {
        //     console.log(error);
        // }
    };



  render() {
    return (
      <View style={styles.singleTab}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Settings</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.logoutButtonContainer}
          onPress={this._logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
