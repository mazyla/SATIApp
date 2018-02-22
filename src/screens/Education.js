import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar, ImageBackground } from 'react-native';
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
              <ImageBackground
                source={require('../../images/health_issues.jpg')}
                style={styles.educationButtonBackgroundImage}>
                <View style={styles.educationButtonTextContainer}>
                  <View style={styles.educationButtonColor}></View>
                  <Text style={styles.educationButtonText}>Health Issues</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.educationButtonContainer}>
            <TouchableOpacity
              style={styles.educationButton}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "First Aid" })}>
              <ImageBackground
                source={require('../../images/first_aid.jpg')}
                style={styles.educationButtonBackgroundImage}>
                <View style={styles.educationButtonTextContainer}>
                  <View style={styles.educationButtonColor}></View>
                  <Text style={styles.educationButtonText}>First Aid</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.educationButtonContainer}>
            <TouchableOpacity
              style={styles.educationButton}
              onPress={() => this.props.navigation.navigate("EducationSearch", { type: "Conflict Management" })}>
              <ImageBackground
                source={require('../../images/conflict_management.jpg')}
                style={styles.educationButtonBackgroundImage}>
                <View style={styles.educationButtonTextContainer}>
                  <View style={styles.educationButtonColor}></View>
                  <Text style={styles.educationButtonText}>Conflict Management</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </View>
        </View>

      </View>
    );
  }
}
