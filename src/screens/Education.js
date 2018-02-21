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



  render() {
    return (
      <View style={styles.educationContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Education</Text>
          </View>
        </View>

        <View style={{alignItems:'center', justifyContent: 'center', height: '100%', width: '100%'}}>

          <View style={{alignItems:'center', width: '100%'}}>
            <TouchableOpacity
              style={{width:'100%'}}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "Conflict Management" })}>
              <View style={{width: '100%', alignItems: 'center', paddingVertical: 30, borderWidth: 1, marginTop: 20, marginBottom: 20}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>Conflict Management</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'center', width: '100%'}}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "First Aid" })}>
              <View style={{width: '100%', alignItems: 'center', paddingVertical: 30, borderWidth: 1, marginTop: 20, marginBottom: 20}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>First Aid</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'center', width: '100%'}}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "Health Issues" })}>
              <View style={{width: '100%', alignItems: 'center', paddingVertical: 30, borderWidth: 1, marginTop: 20, marginBottom: 20}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>Health Issues</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    );
  }
}
