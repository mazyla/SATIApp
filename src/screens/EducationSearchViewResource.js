import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StatusBar, WebView, Image, Modal } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';

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
    switch (res.contentType) {
      case "picture":
        return (
          <ImageViewer imageUrls={[{url: res.content}]} />
        );
        break;
      case "video":
        return (
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{width: '100%', height: '100%'}}
            source={{uri: res.content}} />
        );
        break;
      case "link":
        return (
          <Text>{res.content}</Text>
        );
        break;
      // link by default
      default:
        return (
          <Text>{res.content}</Text>
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
