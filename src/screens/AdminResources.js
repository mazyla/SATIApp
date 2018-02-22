import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity,
  StatusBar, Alert, FlatList, Modal, KeyboardAvoidingView,
  TextInput, dismissKeyboard } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";

import ButtonNew from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Sae } from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";

export default class AdminResources extends Component {
  constructor(props) {
    super(props);

    this.resourcesRef = fb.database().ref().child('resources');

    this.state = {
      currentResources: this.getAllResources(),
      modalVisible: false,
      newResourceName: "",
      newResourceType: "",
      newResourceLongitude: "",
      newResourceLatitude: "",
    }
  }

  getAllResources = () => {
    var tempResources = [];
    this.resourcesRef.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          tempResources.push(item);
        });
      this.setState({currentResources: tempResources});
      tempResources = [];
      },this);

  }

  openModal() {
   this.setState({modalVisible:true});
 }

 closeModal() {
   this.setState({modalVisible:false});
 }

 goToProfile = () => {
   this.props.navigation.navigate("Profile");
 }

 storeResourceInDatabase = () => {
   firebase.database().ref("resources").push({
     name: this.state.newResourceName,
     type: this.state.newResourceType,
     coordinate: {
       latitude: this.state.newResourceLatitude,
       longitude: this.state.newResourceLongitude,
     }
   });
   this.closeModal();
 }

  render() {
    return (
      <View style={styles.resourcesContainer}>

      <View style={styles.topBarContainer}>
        <StatusBar />
        <View style={styles.topBarViewContainer}>
          <Text style={styles.topBarText}>Resources</Text>
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

        <TouchableOpacity
        onPress={() => this.openModal()} >
          <Text>Add New Resource</Text>

        </TouchableOpacity>

        <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View>
              <Text style={styles.loginTitle}>Add New Resource</Text>
              <TextInput
                placeholder={"Name"}
                onChangeText={(title) => this.setState({newResourceName: title})}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TextInput
                placeholder={"Type: food, shelter, clinic"}
                onChangeText={(type) => this.setState({newResourceType: type})}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TextInput
                placeholder={"Latitude"}
                onChangeText={(latitude) => this.setState({newResourceLatitude: latitude})}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              <TextInput
                placeholder={"Longitude"}
                onChangeText={(longitude) => this.setState({newResourceLongitude: longitude})}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              <View>
                <ButtonNew
                  onPress={this.storeResourceInDatabase}
                  textStyle={styles.loginSubmitText}>Add</ButtonNew>
              <Button
                  onPress={() => this.closeModal()}
                  title="Close">
              </Button>
              </View>
          </View>
          </Modal>


        <View>
          <FlatList
          data={this.state.currentResources}
          renderItem={({item}) =>
          <View style={styles.adminResourcesListContainer}>
            <Text style={styles.adminResourcesListItemText}>{item.name} - {item.type}</Text>

          </View>
        }
        />
        </View>


        </View>
    );

  }


}
