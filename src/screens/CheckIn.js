import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Image, Picker, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
//import CheckBox from 'react-native-checkbox-heaven';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { fb } from '../../App'


export default class CheckInView extends Component {
  constructor(props) {
    super(props);

    this.checkInRef = fb.database().ref().child('users_checkIn');

    this.state = {
      lastcheckin: new Date(),
      statusMessage: "None",
      shareLocation: true,
      location: '',
      totalCheckIns: this.getTotalCheckIns(),
    }
    
  }

  getTotalCheckIns = () => {
    var user = fb.auth().currentUser.email;
    var count = 0;
    var userCheckIn = this.checkInRef.orderByChild("email").equalTo(user);
    userCheckIn.on("child_added", function(snapshot) {
      count++;
    });
    return count;
  };

  checkIn = () => {
    this.setState({ lastcheckin: new Date() });
    this.setLocation();

    //this.storeInFirebase();
    // Alert.alert(
    //   'Checked in!',
    //   (this.state.shareLocation ? 'With' : 'Without') + ' location' + '\n' + (this.state.statusMessage === 'None' ? '' : this.state.statusMessage),
    //   [
    //     {text: 'OK', onPress: () => {}},
    //   ],
    //   { cancelable: false },
    // );
  };

  setStatus = (itemValue, itemIndex) => {
    this.setState({statusMessage: itemValue});
  };

  setLocation = () => {
    //alert(this.state.shareLocation);
    if (this.state.shareLocation === true) {
      // if (!("geolocation" in navigator)) {
      //   alert("Geolocation not supported");
      //   var locerr = "Geolocation not supported";
      //   this.setState({ location: locerr });
      //   return;
      // }
      var test = 0;
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var loc = ("Lat:" + lat + " Lon:" + lon);
        //alert(loc);
        this.setState({ location: loc });
        test++;
        //this.storeInFirebase();
      }, (e) => {console.log("ERROR(" + e.code + "):" + e.message)});
      this.storeInFirebase(test);
    } else {
      this.setState({ location: '' });
      this.storeInFirebase();
    }
  };

  storeInFirebase = (test) => {
    alert(test);
    var tempLoc = this.state.shareLocation ? this.state.location : '';
    //alert(tempLoc + ' ' + this.state.shareLocation);
    this.checkInRef.push({
      name: fb.auth().currentUser.displayName,
      time: this.formatDate(this.state.lastcheckin),
      location: tempLoc,
      email: fb.auth().currentUser.email,
    });
  };

  formatDate = (date) => {
    return date.toLocaleString();
  }

  _onPress = () => {
    this.checkIn();
  }

  render() {
    return (
      <View style={styles.checkInContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Update Status</Text>
          </View>
        </View>

        <View style={{height: '100%', justifyContent: 'center'}}>

        <View style={styles.checkInStatsContainer}>
          <View style={styles.checkInTotalCheckInsContainer}>
            <Text style={styles.checkInTotalCheckIns}>{this.getTotalCheckIns()}</Text>
            <Text style={styles.checkInTotalCheckInsLabel}>Total check-ins</Text>
          </View>

          <View style={styles.checkInOtherStatsContainerContainer}>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>15</Text>
              <Text style={styles.checkInOtherStatsLabel}>Consecutive days</Text>
            </View>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>🙂</Text>
              <Text style={styles.checkInOtherStatsLabel}>Average emoji</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInUpdateContainer}>

          <View style={styles.checkInStatusPickerContainer}>
            <Picker
              style={styles.checkInStatusPicker}
              selectedValue={this.state.statusMessage}
              onValueChange={this.setStatus}>
              <Picker.Item label="None" value="None" />
              <Picker.Item label="🙂 Happy" value="🙂 Happy" />
              <Picker.Item label="🌷 Hopeful" value="🌷 Hopeful" />
              <Picker.Item label="😍 Loved" value="😍 Loved" />
              <Picker.Item label="😀 Thankful" value="😀 Thankful" />
              <Picker.Item label="😁 Awesome" value="😁 Awesome" />
              <Picker.Item label="😌 Relaxed" value="😌 Relaxed" />
              <Picker.Item label="😢 Sad" value="😢 Sad" />
              <Picker.Item label="😵 Confused" value="😵 Confused" />
              <Picker.Item label="😊 Good" value="😊 Good" />
              <Picker.Item label="😟 Concerned" value="😟 Concerned" />
              <Picker.Item label="😴 Tired" value="😴 Tired" />
              <Picker.Item label="🆘 Need Help" value="🆘 Need Help" />
              <Picker.Item label="😷 Sick" value="😷 Sick" />
              <Picker.Item label="🤕 Hurt" value="🤕 Hurt" />
            </Picker>
          </View>

          <View style={styles.checkInShareLocationContainer}>
            <CheckBox
              style={styles.checkInShareLocationCheckBox}
              checked={this.state.shareLocation}
              onPress={() => this.setState({ shareLocation: !this.state.shareLocation })}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
            />
            <Text style={styles.checkInShareLocationText}>Share Location</Text>
          </View>

          <View style={styles.checkInUpdateButtonContainer}>
            <TouchableOpacity
            style={styles.checkInUpdateButton}
            activeOpacity={1}
            onPress={this._onPress}>
              <View style={styles.checkInUpdateButtonTextContainer}>
                <Text style={styles.checkInUpdateButtonText}>Safety Check</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        </View>

      </View>
    );
  }
}
