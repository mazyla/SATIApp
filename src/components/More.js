import React, {Component} from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles.js';

export default class MoreView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 200}}> More </Text>
      </View>
    );
  }
}
