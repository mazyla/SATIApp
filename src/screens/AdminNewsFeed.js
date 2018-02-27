import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity,
  StatusBar, Alert, FlatList, TextInput, Modal,
  Platform} from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
      newActivityTime: null,
      activityImage: null,
      newActivityOrganizer: "",
      isDateTimePickerVisible: false,

    }

  }


  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ newActivityTime: date});
    this._hideDateTimePicker();
  };

  getAllActivities = () => {
    this.setState({currentActivites: []});
    var tempActivities = [];
    this.activitiesRef.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          tempActivities.push(item);
        });
      this.setState({currentActivites: tempActivities});
      tempActivities = [];
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
     time: this.state.newActivityTime.getTime(),
     description: this.state.newActivityDescription,
     organizer: this.state.newActivityOrganizer,
     location: this.state.newActivityLocation,
   });
  this.closeModal();
 }

 removeActivity = (activity) => {
   // alert Admin
   Alert.alert(
  'Delete an Activity',
  'Are you sure you want to delete this activity?',
  [
    {text: 'Cancel', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
    {text: 'OK', onPress: () => {
      // delete the resource here
      this.deleteResourceFromDatabase(activity);
    }},
  ],
  { cancelable: false }
);
 }

 deleteResourceFromDatabase = (activity) => {
   var thisActivity = this.activitiesRef.child(activity.key).remove();
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
        <View style={styles.adminActivitiesAddModalContainer}>
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
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={'datetime'}
        />
        <TextInput
          placeholder={"Organizer"}
          onChangeText={(organizer) => this.setState({newActivityOrganizer: organizer})}
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
          <TouchableOpacity
            style={styles.adminResourcesIconContainer}
            onPress={() => {this.removeActivity(item)}}>
            <Icon
              name='ios-close-circle'
              color='red'
              size={styles.topBarProfileButtonSize}
            />
          </TouchableOpacity>

        </View>
      }
      />
      </View>


      </View>
    );

  }


}
