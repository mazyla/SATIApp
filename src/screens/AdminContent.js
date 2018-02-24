import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";

export default class AdminContent extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.resourcesContainer}>
      <View style={styles.topBarContainer}>
        <StatusBar />
        <View style={styles.topBarViewContainer}>
          <Text style={styles.topBarText}>Education Info</Text>
          <TouchableOpacity
            style={styles.topBarProfileButton}
            onPress={this.goToProfile}>
            <View>
            <Icon
              name='ios-contact-outline'
              size={26}
            />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      </View>
    );

  }


}
