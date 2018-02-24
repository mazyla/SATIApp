import React, {Component} from 'react';
import { View, Text, Image, Switch, Button,
  TouchableOpacity, StatusBar, Alert, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
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
      displayedUsers: [],
    };
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
      this.setState({currentUsers: tempUsers, displayedUsers: tempUsers});
      tempUsers = [];
    }, this);
  }

  searchAdminCheckIns = (search) => {
    var filteredUsers = this.state.currentUsers.filter((user) => {
      // Case insensitive
      return (user.firstName.toLowerCase().includes(search.toLowerCase())) ||
        (user.lastName.toLowerCase().includes(search.toLowerCase())) ||
        (user.email.toLowerCase().includes(search.toLowerCase()));
      // TODO: add filters for other fields
    });
    this.setState({ displayedUsers: filteredUsers });
  }

  recentCheckIn = (item) => {
    // return 'red';
    // return 'green';
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
              <Icon
                name='ios-contact'
                color='white'
                size={styles.topBarProfileButtonSize}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.adminResourcesSearchContainer}>
          <SearchBar
            placeholder='Type Here...'
            showLoading
            lightTheme
            onChangeText={this.searchAdminCheckIns}
            clearIcon={{color: '#86939e', name: 'close'}}
          />
        </View>
        <View>
          <FlatList
            data={this.state.displayedUsers}
            renderItem={({item}) =>
              <View style={styles.adminResourcesListContainer, {backgroundColor: this.recentCheckIn(item)}}>
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
