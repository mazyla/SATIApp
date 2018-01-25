import React, {Component} from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/styles.js';

export default class ResourcesView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source = {require('../images/maps.png')}
          style = {[styles.image]}
        />
      </View>
    );
  }
}
