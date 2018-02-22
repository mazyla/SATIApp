import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'

export default class AdminNewsFeed extends Component {
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
          <Text style={styles.topBarText}>Resources</Text>
          <TouchableOpacity
            style={styles.topBarProfileButton}
            onPress={this.goToProfile}>
            <View>
        </View>
      </View>
    );

  }


}
