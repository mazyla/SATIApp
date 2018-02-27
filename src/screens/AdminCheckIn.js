import React, {Component} from 'react';
import { View, Text, Image, Switch, Button,
  TouchableOpacity, StatusBar, Alert, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';
import { Lang, getText } from '../constants/language.js';

export default class AdminCheckIn extends Component {
  constructor(props) {
    super(props);

    this.checkInRef = fb.database().ref().child('users_checkIn');
    this.usersRef = fb.database().ref().child('users');

    this.state = {
      currentUsers: this.getAllUsersNotAdmin(),
      displayedUsers: [],
      language: "",
      labelTopBarTitle: getText(this.language, Lang.CheckIns),
      labelSearchPlaceholder: getText(this.language, Lang.TypeHere),
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
        this.setState({ labelTopBarTitle: getText(item.language, Lang.CheckIns) });
        this.setState({ labelSearchPlaceholder: getText(item.language, Lang.TypeHere) });
      });
    }, (error) => {
      alert(error);
      this.setState({ language : "Thai" });
    }, this);
  }

  getAllUsersNotAdmin = () => {
    var tempUsers = [];
    var usersNotAdmin = this.usersRef.orderByChild("isAdmin").equalTo("false");
    usersNotAdmin.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {

        let item = childSnapshot.val();
        item.key = childSnapshot.key;

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
    var now = new Date();
    if ((now.getTime() - item.lastCheckIn) < 259200000) {
      //highlight checkin green to show that user has checked in
      // within the last 3 days.
      return '#00ff99';
    } else {
      // if not checked in in last 3 days, highlight it red
      return '#ec7063';
    }

  }

  render() {
    return (
      <View style={styles.resourcesContainer}>

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

        <View style={styles.adminResourcesSearchContainer}>
          <SearchBar
            placeholder={this.state.labelSearchPlaceholder}
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
                {item.firstName}  {item.lastName} - {(new Date(item.lastCheckIn).toString().split("GMT"))[0]}</Text>

              </View>
            }
          />
        </View>

      </View>
    );

  }


}
