import React, {Component} from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/styles.js';

export default class NewsFeedView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source = {require('../images/feed.jpg')}
          style = {[styles.image]}
        />
      </View>
    );
  }
}
