import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'

export default class EducationView extends Component {
  constructor(props) {
    super(props);
    //this._logout = this._logout.bind(this);
  }

/* TODO: move this logout to top right button
  _logout() {
        try {
            firebase.auth().signOut();
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };

    <View style={styles.logoutButtonContainer}>
    <TouchableOpacity
      onPress={this._logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
    </View>

*/

  render() {
    return (
      <View style={styles.educationContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Education</Text>
          </View>
        </View>

        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("EducationSearch", { type: "Conflict Management" })}>
            <View style={{width: '70%', alignItems: 'center', margin: 10, padding: 10, borderWidth: 1, borderRadius: 5}}>
              <Text style={{fontSize: 18, textAlign: 'center'}}>Conflict Management</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("EducationSearch", { type: "First Aid" })}>
            <View style={{width: '70%', alignItems: 'center', margin: 10, padding: 10, borderWidth: 1, borderRadius: 5}}>
              <Text style={{fontSize: 18, textAlign: 'center'}}>First Aid</Text>
            </View>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}
