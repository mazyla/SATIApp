import React, {Component} from 'react';
import { View, Text, Image, Switch, Button,
  TouchableOpacity, StatusBar, Alert, FlatList } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';

export default class AdminCheckIn extends Component {
  constructor(props) {
    super(props);

    this.checkInRef = fb.database().ref().child('users_checkIn');
    this.usersRef = fb.database().ref().child('users');

    this.state = {
      currentUsers: this.getAllUsersNotAdmin(),
    }
  }

  getAllUsersNotAdmin = () => {
    var tempUsers = [];
    var usersNotAdmin = this.usersRef.orderByChild("isAdmin").equalTo("false");
    usersNotAdmin.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {

        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        // var tempCheckIns = [];
        // var userCheckIn = this.checkInRef.orderByChild("email").equalTo(item.email);
        // userCheckIn.on("value", function(snapshot) {
        //   snapshot.forEach(childSnapshot => {
        //       let checkInSnap = childSnapshot.val();
        //       checkInSnap.key = childSnapshot.key;
        //       tempCheckIns.push(new Date(checkInSnap.time));
        //     });
        //
        //   },this);
        //   item.lastCheckIn = tempCheckIns[(tempCheckIns.length)-1];
        //   Alert.alert(item.lastCheckIn.toString());

        tempUsers.push(item);
      });
      this.setState({currentUsers: tempUsers});
      tempUsers = [];
    }, this);
  }

  render() {
    return (
      <View style={styles.resourcesContainer}>

      <View style={styles.topBarContainer}>
        <StatusBar />
        <View style={styles.topBarViewContainer}>
          <Text style={styles.topBarText}>Check Ins</Text>
          <TouchableOpacity
            style={styles.topBarProfileButton}
            onPress={this.goToProfile}>
            <View>
            <Icon
              name='ios-contact-outline'
              size={26}
            />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <FlatList
        data={this.state.currentUsers}
        renderItem={({item}) =>
        <View style={styles.adminResourcesListContainer}>
          <Text style={styles.adminResourcesListItemText}>
          {item.firstName}  {item.lastName} - {(new Date(item.lastCheckIn).toString().split("GMT+0000"))[0]}</Text>

        </View>
      }
      />
      </View>


      </View>
    );

  }


}
