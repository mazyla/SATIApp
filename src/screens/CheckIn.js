import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import { fb } from '../../App'
import { Picker } from 'react-native-picker-dropdown'
import Icon from 'react-native-vector-icons/Ionicons';
import { Constants, lp, wp } from '../constants/constants.js';
import { Lang, getText } from '../constants/language.js';

export default class CheckInView extends Component {
  constructor(props) {
    super(props);

    this.checkInRef = fb.database().ref().child('users_checkIn');
    this.usersRef = fb.database().ref().child('users');

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
      language: "",
      labelTopBarTitle: getText(this.language, Lang.UpdateStatus),
      labelTotalCheckIns: getText(this.language, Lang.TotalCheckIns),
      labelConsecutiveDays: getText(this.language, Lang.ConsecutiveDays),
      labelAverageFeeling: getText(this.language, Lang.AverageFeeling),
      labelShareLocation: getText(this.language, Lang.ShareLocation),
      labelCheckIn: getText(this.language, Lang.CheckIn),
      labelPickerNone: getText(this.language, Lang.None),
      labelPickerHappy: getText(this.language, Lang.Happy),
      labelPickerHopeful: getText(this.language, Lang.Hopeful),
      labelPickerAwesome: getText(this.language, Lang.Awesome),
      labelPickerRelaxed: getText(this.language, Lang.Relaxed),
      labelPickerSad: getText(this.language, Lang.Sad),
      labelPickerConcerned: getText(this.language, Lang.Concerned),
      labelPickerSick: getText(this.language, Lang.Sick),
      labelPickerNeedHelp: getText(this.language, Lang.NeedHelp),
    }
  }

  componentWillMount() {
    this.getLanguage();
  }

  getLanguage = () => {
    var user = fb.auth().currentUser;
    this.usersRef.orderByChild("email").equalTo(user.email).on("value", function(snapshot) {
      var userid = Object.keys(snapshot.val())[0];
      snapshot.forEach((userInfo) => {
        let item = userInfo.val();
        this.setState({ language: item.language });
        this.setState({ labelTopBarTitle: getText(item.language, Lang.UpdateStatus) });
        this.setState({ labelTotalCheckIns: getText(item.language, Lang.TotalCheckIns) });
        this.setState({ labelConsecutiveDays: getText(item.language, Lang.ConsecutiveDays) });
        this.setState({ labelAverageFeeling: getText(item.language, Lang.AverageFeeling) });
        this.setState({ labelShareLocation: getText(item.language, Lang.ShareLocation) });
        this.setState({ labelCheckIn: getText(item.language, Lang.CheckIn) });
        this.setState({ labelPickerNone: getText(item.language, Lang.None) });
        this.setState({ labelPickerHappy: getText(item.language, Lang.Happy) });
        this.setState({ labelPickerHopeful: getText(item.language, Lang.Hopeful) });
        this.setState({ labelPickerAwesome: getText(item.language, Lang.Awesome) });
        this.setState({ labelPickerRelaxed: getText(item.language, Lang.Relaxed) });
        this.setState({ labelPickerSad: getText(item.language, Lang.Sad) });
        this.setState({ labelPickerConcerned: getText(item.language, Lang.Concerned) });
        this.setState({ labelPickerSick: getText(item.language, Lang.Sick) });
        this.setState({ labelPickerNeedHelp: getText(item.language, Lang.NeedHelp) });
      });
    }, (error) => {
      alert(error);
      this.setState({ language : "Thai" });
    }, this);
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
    }
    //  else if ((today.getTime() - this.state.lastCheckIn) > 64800000) {
    //   // more than 18 hours since the last check in, increment streak
    //   this.increaseStreak();
    // }
    else {
      var array = [];
      var userDetails = this.usersRef.orderByChild("email").equalTo(user);
      userDetails.on("value", function(snapshot) {
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            array.push(item);
        });
        // this.increaseStreak();
        if (array[0].streak >= 3) {
          this.setState({streak: (array[0].streak.toString() + "🔥")});
        } else {
          this.setState({streak: array[0].streak.toString()});
        }

      }, this);
    }
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

    var today = new Date();
    // disable check in if less than 4 hours till last
    if ((today.getTime() - this.state.lastCheckIn) < 14400000) {
      var minutesTillCheckIn = Math.round((14400000 - (today.getTime() - this.state.lastCheckIn))/60000);
      var hoursTillCheckIn = Math.floor(minutesTillCheckIn/60);
      var minutesLeft = minutesTillCheckIn - (60*hoursTillCheckIn);
      if (hoursTillCheckIn > 0) {
        if (minutesLeft == 0) {
          Alert.alert("Please wait " + hoursTillCheckIn + " hours to check in");
        } else {
        Alert.alert("Please wait " + hoursTillCheckIn + " hours " + minutesLeft + " minutes to check in");
      }
      } else {
        Alert.alert("Please wait " + minutesTillCheckIn + " minutes to check in");
      }
    } else {
      this.setState({ lastcheckin: new Date() });
      this.setLocation();
      var now = new Date();
      var lastCheckIn = parseInt(this.state.lastCheckIn);
      var temp = now.getTime() - lastCheckIn;
      //if ((now.getTime() - lastCheckIn) > 64800000) {
        // needs to not have checked in for more than 18 hours
        // so that you can increase streak
        this.increaseStreak();
      //}
      this.getLastCheckIn();
      // store last check in as a users attribute
      this.saveLastCheckIn();
    }



  };

  saveLastCheckIn = () => {
    var user = fb.auth().currentUser.email;
    var userDetails = this.usersRef.orderByChild("email").equalTo(user);
    userDetails.once("child_added", function(snapshot) {
      snapshot.ref.update({ lastCheckIn: (new Date()).getTime()});
    });
  }

  increaseStreak = () => {
    var tempStreak = parseInt(this.state.streak) + 1;
    //var tempStreak = 3;
    var user = fb.auth().currentUser.email;
    var userDetails = this.usersRef.orderByChild("email").equalTo(user);
    userDetails.once("child_added", function(snapshot) {
      snapshot.ref.update({ streak: tempStreak});
    });
  };

  resetUserStreak = () => {
    var user = fb.auth().currentUser.email;
    var userDetails = this.usersRef.orderByChild("email").equalTo(user);
    userDetails.once("child_added", function(snapshot) {
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
  };

  goToProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  render() {
    return (
      <View style={styles.checkInContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar />
          <View style={styles.topBarViewContainer}>
            <Text style={styles.topBarText}>{this.state.labelTopBarTitle}</Text>
            <TouchableOpacity
              style={styles.topBarProfileButton}
              onPress={this.goToProfile}>
              <Icon
                name='ios-contact'
                color='white'
                size={styles.topBarProfileButtonSize}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: '100%', justifyContent: 'center'}}>

        <View style={styles.checkInStatsContainer}>
          <View style={styles.checkInTotalCheckInsContainer}>
            <Text style={styles.checkInTotalCheckIns}>{this.state.totalCheckIns}</Text>
            <Text style={styles.checkInTotalCheckInsLabel}>{this.state.labelTotalCheckIns}</Text>
          </View>

          <View style={styles.checkInOtherStatsContainerContainer}>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>{this.state.streak}</Text>
              <Text style={styles.checkInOtherStatsLabel}>{this.state.labelConsecutiveDays}</Text>
            </View>
            <View style={styles.checkInOtherStatsContainer}>
              <Text style={styles.checkInOtherStats}>{this.state.averageFeeling}</Text>
              <Text style={styles.checkInOtherStatsLabel}>{this.state.labelAverageFeeling}</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkInUpdateContainer}>

          <View style={styles.checkInStatusPickerContainer}>
            <Picker
              style={styles.checkInStatusPicker}
              selectedValue={this.state.statusMessage}
              onValueChange={this.setStatus}>
              <Picker.Item label={this.state.labelPickerNone} value="0" />
              <Picker.Item label={this.state.labelPickerHappy} value="60" />
              <Picker.Item label={this.state.labelPickerHopeful} value="50" />
              <Picker.Item label={this.state.labelPickerAwesome} value="70" />
              <Picker.Item label={this.state.labelPickerRelaxed} value="40" />
              <Picker.Item label={this.state.labelPickerSad} value="20" />
              <Picker.Item label={this.state.labelPickerConcerned} value="30" />
              <Picker.Item label={this.state.labelPickerSick} value="10" />
              <Picker.Item label={this.state.labelPickerNeedHelp} value="🆘 Need Help" />
            </Picker>
          </View>

          <View style={styles.checkInShareLocationContainer}>
            <CheckBox
              size={lp(6)}
              textStyle={styles.checkInShareLocationText}
              containerStyle={styles.checkInShareLocationCheckBox}
              checked={this.state.shareLocation}
              onPress={() => this.setState({ shareLocation: !this.state.shareLocation })}
              title={this.state.labelShareLocation}
            />
          </View>

          <View style={styles.checkInUpdateButtonContainer}>
            <TouchableOpacity
            style={[styles.checkInUpdateButton, {
            backgroundColor: "#324D5C"}]}
            activeOpacity={1}
            onPress={this.checkIn}
            styleDisabled={styles.checkInUpdateButtonDisabled}>
              <View style={styles.checkInUpdateButtonTextContainer}>
                <Text style={styles.checkInUpdateButtonText}>{this.state.labelCheckIn}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        </View>

      </View>
    );
  }
}
