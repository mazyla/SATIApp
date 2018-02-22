import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { fb } from '../../App'
import { Picker } from 'react-native-picker-dropdown'
import Icon from 'react-native-vector-icons/Ionicons';

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
      checkIns: this.getAllCheckInsForCurrentUser(),
      totalCheckIns: 0,
      lastCheckIn: 0,
      streak: 0,
      shouldDisableCheckIn: false,
      averageFeeling: "😐",


    }
  }

  getAllCheckInsForCurrentUser = () => {
    var user = fb.auth().currentUser.email;
    var tempCheckIns = [];
    var userCheckIn = this.checkInRef.orderByChild("email").equalTo(user);
    userCheckIn.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          tempCheckIns.push(item);
        });
      this.setState({checkIns: tempCheckIns});
      this.getTotalCheckIns();
      this.getLastCheckIn();
      this.getAverageFeeling();
      tempCheckIns = [];
      },this);


  }

  getTotalCheckIns = () => {
      this.setState({totalCheckIns: this.state.checkIns.length});
    }

getLastCheckIn = () => {

  var user = fb.auth().currentUser.email;
  var today = new Date();
  if (this.state.checkIns.length > 0) {
    this.setState({lastCheckIn: this.state.checkIns[this.state.checkIns.length - 1].time});
    if ((today.getTime() - this.state.lastCheckIn) > 86400000) {
      // more than a day since last check in // reset
      this.setState({streak: 0})
      this.resetUserStreak();
    } else if ((today.getTime() - this.state.lastCheckIn) > 64800000) {
      // more than 18 hours since the last check in, increment streak
      this.increaseStreak();
    } else {
      var array = [];
      var userDetails = this.userRef.orderByChild("email").equalTo(user);
      userDetails.on("value", function(snapshot) {
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            array.push(item);
        });
        if (array[0].streak >= 3) {
          this.setState({streak: (array[0].streak.toString() + "🔥")});
        } else {
          this.setState({streak: array[0].streak.toString()});
        }

      }, this);
    }
  }
  // disable check in if less than 4 hours till last
  if ((today.getTime() - this.state.lastCheckIn) < 14400000) {
    this.setState({shouldDisableCheckIn: true});
  } else {
    this.setState({shouldDisableCheckIn: false});
  }
}

getAverageFeeling = () => {
  var feelingScores = [];
  for (i = 0; i < this.state.checkIns.length; i++) {
    if (this.state.checkIns[i].status !== "None") {
      feelingScores.push(parseInt(this.state.checkIns[i].status));
    }
  }
  var score = 0;
  for (i = 0; i < feelingScores.length; i++) {
    score += parseInt(feelingScores[i]);
  }
  score = score / feelingScores.length;
  if (score > 48) {
    this.setState({averageFeeling: "😀"});
  } else if (score > 30) {
    this.setState({averageFeeling: "😐"});
  } else {
    this.setState({averageFeeling: "😔"});
  }
}

  checkIn = () => {
    this.setState({ lastcheckin: new Date() });
    this.setLocation();
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

  goToProfile = () => {
    this.props.navigation.navigate("Profile");
  }

  render() {
    return (
      <View style={styles.checkInContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar />
          <View style={styles.topBarViewContainer}>
            <Text style={styles.topBarText}>Update Status</Text>
            <TouchableOpacity
              style={styles.topBarProfileButton}
              onPress={this.goToProfile}>
              <View style={{width:30,height:30,borderRadius:15, backgroundColor:'white'}}>
                <Icon
                  name='ios-contact'
                  size={30}
                />
              </View>
            </TouchableOpacity>
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
              <Text style={styles.checkInOtherStats}>{this.state.averageFeeling}</Text>
              <Text style={styles.checkInOtherStatsLabel}>Average Feeling</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInUpdateContainer}>

          <View style={styles.checkInStatusPickerContainer}>
            <Picker
              style={styles.checkInStatusPicker}
              selectedValue={this.state.statusMessage}
              onValueChange={this.setStatus}>
              <Picker.Item label="None" value="0" />
              <Picker.Item label="🙂 Happy" value="60" />
              <Picker.Item label="🌷 Hopeful" value="50" />
              <Picker.Item label="😁 Awesome" value="70" />
              <Picker.Item label="😌 Relaxed" value="40" />
              <Picker.Item label="😢 Sad" value="20" />
              <Picker.Item label="😟 Concerned" value="30" />
              <Picker.Item label="😷 Sick" value="10" />
              <Picker.Item label="🆘 Need Help" value="🆘 Need Help" />
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
            style={[styles.checkInUpdateButton, {
            backgroundColor: this.state.shouldDisableCheckIn ? "#ebebed" : "#324D5C"}]}
            activeOpacity={1}
            onPress={this.checkIn}
            disabled={this.state.shouldDisableCheckIn}
            styleDisabled={styles.checkInUpdateButtonDisabled}>
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
