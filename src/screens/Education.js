import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'

export default class EducationView extends Component {
  constructor(props) {
    super(props);

    this.educationRef = fb.database().ref('education');

    this.state = {
      resources: [],
    }
    this.getResources();
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
  getResources = () => {
    this.educationRef.on("value", function(snapshot) {
      var resourceList = snapshot.val();
      this.setState({ resources: resourceList });
    }, this);
  }

  // componentDidMount() {
  //   this.getResources();
  // }

  render() {
    return (
      <View style={styles.educationContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Education</Text>
          </View>
        </View>

        <View>
          <SearchBar
            placeholder='Type Here...'
            showLoading
            lightTheme
            onChangeText={()=>{}}
            onClearText={()=>{}}
            clearIcon={{color: '#86939e', name: 'close'}}
          />
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={this.state.resources}
            renderItem={({item}) =>
              <View>
                <Text style={{padding: 10, fontSize: 18, height: 44}}>{item.name}</Text>
              </View>
            }
          />
        </View>


      </View>
    );
  }
}
