import { View, Text, Image, StatusBar,
  TouchableNativeFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';
import { Constants } from '../constants/constants.js';
import Communications from 'react-native-communications';
import React, {Component} from 'react'

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
      <View style={styles.emergencyCallContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Emergency Call</Text>
          </View>
        </View>

        <View style={styles.emergencyCallButtonContainer}>
          <View style={styles.emergencyCallButton}>
            <TouchableOpacity onPress={this.emergencySMS}>
              <View style={styles.emergencyCallButtonImageContainer}>
                <Image
                  source = {require('../../images/message-icon.png')}
                  style = {styles.emergencyCallButtonImage}
                />
                <Text style={styles.emergencyCallButtonText}>Text The Hub</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.emergencyCallButton}>
            <TouchableOpacity onPress={this.emergencyCall}>
              <View style={styles.emergencyCallButtonImageContainer}>
                <Image
                  source = {require('../../images/call_center.png')}
                  style = {styles.emergencyCallButtonImage2}
                />
                <Text style={styles.emergencyCallButtonText}>Call The Childline</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}
