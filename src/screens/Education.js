import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'

export default class EducationView extends Component {
  constructor(props) {
    super(props);
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

        <View style={{justifyContent: 'center'}}>
        <View style={styles.educationButtonContainerContainer}>

          <View style={styles.educationButtonContainer}>
            <TouchableOpacity
              style={styles.educationButton}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "Health Issues" })}>
              <View style={styles.educationButtonTextContainer}>
                <Text style={styles.educationButtonText}>Health Issues</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.educationButtonContainer}>
            <TouchableOpacity
              style={styles.educationButton}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "First Aid" })}>
              <View style={styles.educationButtonTextContainer}>
                <Text style={styles.educationButtonText}>First Aid</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.educationButtonContainer}>
            <TouchableOpacity
              style={styles.educationButton}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "Conflict Management" })}>
              <View style={styles.educationButtonTextContainer}>
                <Text style={styles.educationButtonText}>Conflict Management</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        </View>

      </View>
    );
  }
}
