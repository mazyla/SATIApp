import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'

export default class Profile extends Component {
    constructor(props) {
        super(props);

    }

    _logout() {
          try {
              fb.auth().signOut();
              this.props.navigation.navigate('Login');
          } catch (error) {
              console.log(error);
          }
      };

    render () {
      return(
            <View style={styles.logoutButtonContainer}>
            <TouchableOpacity
              onPress={this._logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            </View>



      );
    }

  }
