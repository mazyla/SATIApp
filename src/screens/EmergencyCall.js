import React, {Component} from 'react';
import { View, Text, Image, StatusBar,
  TouchableNativeFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';
import { Constants } from '../constants/constants.js';
import Communications from 'react-native-communications';

export default class EmergencyCallView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    }
  }

  emergencyCall = () => {
    Communications.phonecall(Constants.EMERGENCY_NUMBER, true);
  }

  emergencySMS = () => {
    Communications.text(Constants.EMERGENCY_NUMBER, null);
  }

  render() {
    return (
      <View style={styles.singleTab}>

        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Emergency</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>

          <TouchableOpacity
            onPress={this.emergencyCall}>
            <View style={styles.btnimagecontainer}>
              <Image
                source = {require('../../images/call.jpg')}
                style = {styles.btnimage}
              />
              <Text>Call The Hub</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.emergencySMS}>
            <View style={styles.btnimagecontainer}>
              <Image
                source = {require('../../images/message.jpg')}
                style = {styles.btnimage}
              />
              <Text>Text The Hub</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
