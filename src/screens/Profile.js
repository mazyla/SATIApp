import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import { Lang, getText } from '../constants/language.js';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.usersRef = fb.database().ref('users');
        this.state = {
          language: "",
          labelLogoutButton: getText(this.language, Lang.Logout),
          labelToggleLanguageButton: getText(this.language, Lang.ChangeLanguage),
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
          this.setState({ labelLogoutButton: getText(item.language, Lang.Logout) });
          this.setState({ labelToggleLanguageButton: getText(item.language, Lang.ChangeLanguage) });
        });
      }, (error) => {
        alert(error);
        this.setState({ language : "Thai" });
      }, this);
    }

    _logout() {
      try {
        fb.auth().signOut();
        this.props.navigation.navigate('Login');
      } catch (error) {
        console.log(error);
      }
    }

    updateUser = (uid, field, postData) => {
      var updates = {};
      updates['/' + uid + '/' + field] = postData;
      this.usersRef.update(updates);
    }

    _toggleLanguage = () => {
      var user = fb.auth().currentUser;
      this.usersRef.orderByChild("email").equalTo(user.email).once("value", function(snapshot) {
        var userid = Object.keys(snapshot.val())[0];
        snapshot.forEach((userInfo) => {
          let item = userInfo.val();
          let lang = (item.language === "English" ? "Thai" : "English");
          this.updateUser(userid, "language", lang);
          let doneMessage = lang === "English" ? Lang.languageChange.english : Lang.languageChange.thai;
          alert(doneMessage);
        });
      }, (error) => {alert(error)}, this);
    }

    render () {
      return(
        <View style={styles.profileContainer}>
          <View style={styles.toggleLanguageContainer}>
            <TouchableOpacity
              style={styles.toggleLanguageButton}
              onPress={this._toggleLanguage}>
              <Text style={styles.toggleLanguageText}>{this.state.labelToggleLanguageButton}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this._logout}>
              <Text style={styles.logoutText}>{this.state.labelLogoutButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

  }
