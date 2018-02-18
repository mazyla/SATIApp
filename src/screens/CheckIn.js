import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { fb } from '../../App'
import { Picker } from 'react-native-picker-dropdown'




export default class CheckInView extends Component {
  constructor(props) {
    super(props);

    this.checkInRef = fb.database().ref().child('users_checkIn');
    this.userRef = fb.database().ref().child('users');

    this.state = {
      lastcheckin: new Date(),
      statusMessage: "None",
      shareLocation: true,
      location: {
        lat: null,
        long: null,
      },
      totalCheckIns: this.getTotalCheckIns(),
      lastCheckIn: this.getLastCheckIn(),
      streak: 0,

    }
  }

  getTotalCheckIns = () => {
    var user = fb.auth().currentUser.email;
    var count = 0;
    var userCheckIn = this.checkInRef.orderByChild("email").equalTo(user);
    userCheckIn.on("value", function(snapshot) {
      var snapVal = snapshot.val();
      if (snapVal != undefined && snapVal != null) {
        count = Object.keys(snapVal).length;
        this.setState({totalCheckIns: count});
      } else {
        this.setState({totalCheckIns: 0});
      }
    }, this);
}

getLastCheckIn = () => {
  var user = fb.auth().currentUser.email;

  /* Get last day of check in */
  var lastCheckInArr = [];
  var userCheckIn = this.checkInRef.orderByChild("email").equalTo(user).limitToLast(1);
  userCheckIn.on("value", function(snapshot) {
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        lastCheckInArr.push(item);

        if (lastCheckInArr.length > 0) {
          var lastCheckIn = lastCheckInArr[lastCheckInArr.length - 1].time;
          this.setState({lastCheckIn: lastCheckIn});
          var today = new Date();
          if ((today.getTime() - lastCheckIn) > 86400000) {
            // more than a day since last check in // reset
            this.setState({streak: 0})
            this.resetUserStreak();
          } else {
            var streakTemp = 0;
            var array = [];
            var userDetails = this.userRef.orderByChild("email").equalTo(user);
            userDetails.on("value", function(snapshot) {
              snapshot.forEach(childSnapshot => {
                  let item = childSnapshot.val();
                  item.key = childSnapshot.key;
                  array.push(item);
              });
              this.setState({streak: array[0].streak.toString()});
            }, this);
          }
        }
      });
    }, this);
  }

  checkIn = () => {
    this.setState({ lastcheckin: new Date() });
    this.setLocation();
<<<<<<< HEAD
    var now = new Date();
    var lastCheckIn = parseInt(this.state.lastCheckIn);
    var temp = now.getTime() - lastCheckIn;
    if ((now.getTime() - lastCheckIn) > 64800000) {
      // needs to not have checked in for more than 18 hours
      // so that you can increase streak
      this.increaseStreak();
    }
    this.getLastCheckIn();
  };

  increaseStreak = () => {
    var tempStreak = parseInt(this.state.streak) + 1;
    var user = fb.auth().currentUser.email;
    var userDetails = this.userRef.orderByChild("email").equalTo(user);
    userDetails.once("child_added", function(snapshot) {
      snapshot.ref.update({ streak: tempStreak});
    });
=======
    Alert.alert("checked in");
>>>>>>> ad121ebe8a2a60eb6bd40516d0ac2ff81fecaeaf
  };

  resetUserStreak = () => {
    var user = fb.auth().currentUser.email;
    var userDetails = this.userRef.orderByChild("email").equalTo(user);
    userDetails.once("value", function(snapshot) {
      snapshot.ref.update({ streak: 0});
    });
  }

  setStatus = (itemValue, itemIndex) => {
    this.setState({statusMessage: itemValue});
  };

  setLocation = () => { // *** TODO: NEEDS FIXIN' ***
    if (this.state.shareLocation === true) {

      navigator.geolocation.getCurrentPosition((position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        this.setState({
          location: {
            lat: latitude,
            long: longitude
          }
        });
        this.storeInFirebase();
      }, (e) => {console.log("ERROR(" + e.code + "):" + e.message)});

    } else {
      this.setState({ location: '' });
      this.storeInFirebase();
    }
  };

  storeInFirebase = () => {
    var loc = this.state.shareLocation ? this.state.location : '';
    this.checkInRef.push({
      name: fb.auth().currentUser.displayName,
      time: this.formatDate(this.state.lastcheckin),
      location: this.state.location,
      status: this.state.statusMessage,
      email: fb.auth().currentUser.email,
    });
  };

  formatDate = (date) => {
    return date.getTime();
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
            <Text style={styles.checkInTotalCheckIns}>{this.state.totalCheckIns}</Text>
            <Text style={styles.checkInTotalCheckInsLabel}>Total check-ins</Text>
          </View>

          <View style={styles.checkInOtherStatsContainerContainer}>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>{this.state.streak}</Text>
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
              title='Share Location'
            />
          </View>

          <View style={styles.checkInUpdateButtonContainer}>
            <TouchableOpacity
            style={styles.checkInUpdateButton}
            activeOpacity={1}
            onPress={this.checkIn}>
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
