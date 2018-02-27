import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity,
  StatusBar, Alert, FlatList, TextInput, Modal,
  Platform} from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";
//import ImagePicker from 'react-native-image-picker';

export default class AdminNewsFeed extends Component {
  constructor(props) {
    super(props);

    this.activitiesRef = fb.database().ref().child('activities');
    this.storage = firebase.storage();

    this.state = {
      currentActivities: this.getAllActivities(),
      modalVisible: false,
      newActivityName: "",
      newActivityType: "",
      newActivityDescription: "",
      newActivityLocation: "",
      newActivityTime: "",
      activityImage: null,
    }
  }



  getAllActivities = () => {
    var tempActivities = [];
    this.activitiesRef.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          tempActivities.push(item);
        });
      this.setState({currentActivites: tempActivities});
      tempActivites = [];
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

 storeActivityInDatabase = () => {
   firebase.database().ref("activities").push({
     name: this.state.newActivityName,
     type: this.state.newActivityType,
     description: this.state.newActivityDescription,
     location: this.state.newActivityLocation,
     when: this.state.newActivityTime,
   });
  // this.closeModal();
 }



  render() {
    return (
      <View style={styles.resourcesContainer}>

      <View style={styles.topBarContainer}>
        <StatusBar />
        <View style={styles.topBarViewContainer}>
          <Text style={styles.topBarText}>Activities</Text>
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
        <View style={styles.modalContainer}>
         <View style={styles.innerContainer}>
              <Text>Add New Activity</Text>
              <View>
                <TextInput
                  placeholder={"Name"}
                  onChangeText={(name) => this.setState({newActivityName: name})}
                  autoCapitalize={'none'}
                  autoCorrect={false}
              />
              <TextInput
                placeholder={"Type: educational, meeting"}
                onChangeText={(type) => this.setState({newActivityType: type})}
                autoCapitalize={'none'}
                autoCorrect={false}
            />
            <TextInput
              placeholder={"Location: The Hub, Sati, some building"}
              onChangeText={(location) => this.setState({newActivityLocation: location})}
              autoCapitalize={'none'}
              autoCorrect={false}
          />
          <TextInput
            placeholder={"Description"}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(description) => this.setState({newActivityDescription: description})}
            autoCapitalize={'none'}
            autoCorrect={false}
        />
        <TextInput
          placeholder={"When?"}
          onChangeText={(time) => this.setState({newActivityTime: time})}
          autoCapitalize={'none'}
          autoCorrect={false}
          />


          <Button
            onPress={() => this.storeActivityInDatabase()}
            title="Add New Activity">
          </Button>

          <Button
              onPress={() => this.closeModal()}
              title="Close">
          </Button>
            </View>
          </View>
                    </View>
        </Modal>


      <View>
        <FlatList
        data={this.state.currentActivites}
        renderItem={({item}) =>
        <View style={styles.adminResourcesListContainer}>
          <Text style={styles.adminResourcesListItemText}>{item.name} - {item.description}</Text>

        </View>
      }
      />
      </View>


      </View>
    );

  }


}
