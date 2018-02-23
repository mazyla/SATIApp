import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StatusBar, WebView, Image } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EducationSearchViewResource extends Component {
  constructor(props) {
    super(props);

    console.ignoredYellowBox = [
      'Setting a timer'
    ];

    this.educationRef = fb.database().ref('education');

    this.state = {
      resource: this.props.navigation.state.params.resource,
    };
  }

  renderResource = () => {
    var res = this.state.resource;
    if (res.picture === null || res.picture === undefined) {
      if (res.video === null || res.video === undefined) {
        return null;
      } else {
        return (
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{width: '100%', height: '100%'}}
            source={{uri: res.video}} />
        );
      }
    } else {
      return (
        <Image
          source={{uri: res.picture}}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}} />
      );
    }
  }

  render() {
    return(
      <View style={{flex:1}}>
        {this.renderResource()}
      </View>
    );
  }
}
