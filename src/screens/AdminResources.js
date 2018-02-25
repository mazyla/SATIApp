import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity,
  StatusBar, Alert, FlatList, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';


export default class AdminResources extends Component {
  constructor(props) {
    super(props);

    this.resourcesRef = fb.database().ref().child('resources');

    this.state = {
      currentResources: this.getAllResources(),
      displayedResources: [],
      modalVisible: false,
      newResourceName: "",
      newResourceType: "",
      newResourceLongitude: 0,
      newResourceLatitude: 0,
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
      this.setState({currentResources: tempResources, displayedResources: tempResources});
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
   fb.database().ref("resources").push({
     name: this.state.newResourceName,
     type: this.state.newResourceType,
     coordinate: {
       latitude: parseFloat(this.state.newResourceLatitude),
       longitude: parseFloat(this.state.newResourceLongitude),
     }
   });
 }

 searchAdminResources = (search) => {
   var filteredResources = this.state.currentResources.filter((resource) => {
     // Case insensitive
     return (resource.name.toLowerCase().includes(search.toLowerCase()));
     // TODO: add filters for other fields
   });
   this.setState({ displayedResources: filteredResources });
 }

 removeResource = (resource) => {
   // alert Admin
   Alert.alert(
  'Delete a Resource',
  'Are you sure you want to delete this resource?',
  [
    {text: 'Cancel', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
    {text: 'OK', onPress: () => {
      // delete the resource here
      this.deleteResourceFromDatabase(resource);
    }},
  ],
  { cancelable: false }
);
 }

 deleteResourceFromDatabase = (resource) => {
   var thisResource = this.resourcesRef.child(resource.key).remove();
 }

  render() {
    return (
      <View style={styles.resourcesContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar />
          <View style={styles.topBarViewContainer}>
            <Text style={styles.topBarText}>Add Resources</Text>
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

        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}>
          <View style={styles.adminResourcesAddModalContainer}>
            <View style={styles.adminResourcesAddModalInnerContainer}>
                <Text style={styles.adminResourcesAddModalTitle}>Add New Resource</Text>
                <View style={styles.adminResourcesAddModalForm}>
                  <TextInput
                    placeholder={"Name"}
                    onChangeText={(name) => this.setState({newResourceName: name})}
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
                <Button
                  onPress={() => this.storeResourceInDatabase()}
                  title="Add New Resource">
                </Button>
                <Button
                  onPress={() => this.closeModal()}
                  title="Close">
                </Button>
              </View>
            </View>
          </View>
        </Modal>


        <TouchableOpacity
          style={styles.adminResourcesAddButton}
          onPress={() => this.openModal()}>
          <Text style={styles.adminResourcesAddButtonText}>Add New Resource</Text>
        </TouchableOpacity>

        <View style={styles.adminResourcesSearchContainer}>
          <SearchBar
            placeholder='Type Here...'
            showLoading
            lightTheme
            onChangeText={this.searchAdminResources}
            clearIcon={{color: '#86939e', name: 'close'}}
          />
        </View>
        <View style={styles.adminResourcesSearchResultsContainer}>
          <FlatList
            data={this.state.displayedResources}
            renderItem={({item}) =>
              <View style={styles.adminResourcesListContainer}>
                <Text style={styles.adminResourcesListItemText}>{item.name} - {item.type}</Text>
                <TouchableOpacity
                  style={styles.adminResourcesIconContainer}
                  onPress={() => {this.removeResource(item)}}>
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
