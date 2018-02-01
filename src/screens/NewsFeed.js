import React, {Component} from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../styles/styles.js';

export default class NewsFeedView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.singleTab}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Feed</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source = {require('../../images/feed.jpg')}
            style = {[styles.satiImage]}
          />
        </View>
      </View>
    );
  }
}
