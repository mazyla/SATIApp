import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity, StatusBar, Alert, FlatList,
  Modal, Keyboard, TouchableWithoutFeedback, TextInput, Picker } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";
import { SearchBar, CheckBox } from 'react-native-elements';

export default class AdminContent extends Component {
  constructor(props) {
    super(props);
    this.educationRef = fb.database().ref('education');
    this.state = {
      currentResources: this.getAllResources(),
      displayedResources: [],
      modalVisible: false,
      newResourceTitle: "",
      newResourceType: "Health Issues",
      newResourceContent: "",
      newResourceContentType: "link",
      searchText: "",
      checkedHealthIssues: false,
      checkedHealthIssuesColor: '#bfbfbf',
      checkedFirstAid: false,
      checkedFirstAidColor: '#bfbfbf',
      checkedConflictManagement: false,
      checkedConflictManagementColor: "#bfbfbf",
    }

  }

  getAllResources = () => {
    var tempResources = [];

    this.educationRef.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          tempResources.push(item);
        });
      this.setState({currentResources: tempResources, displayedResources: tempResources});
      tempResources = [];
      },this);
  }

  // TODO: FIX THIS
  searchAdminResources = (search) => {
    this.setState({ searchText: search });
    var filteredResources = this.state.displayedResources.filter((resource) => {
      // Case insensitive
      return (resource.title.toLowerCase().includes(search.toLowerCase()));
    });
  }

  searchAdminResources = (search, healthIssues=0, firstAid=0, conflictManagement=0) => {
    this.setState({ searchText: search });
    var filteredResources = this.state.currentResources.filter((resource) => {
      // Case insensitive
      return (resource.title.toLowerCase().includes(search.toLowerCase()));
    });
    if (!(healthIssues || firstAid || conflictManagement)) {
      this.setState({ displayedResources: filteredResources });
      return;
    }
    var healthIssuesFilter = healthIssues ? filteredResources.filter((resource) => {
      return resource.type === "Health Issues";
    }) : [];
    var firstAidFilter = firstAid ? filteredResources.filter((resource) => {
      return resource.type === "First Aid";
    }) : [];
    var conflictManagementFilter = conflictManagement ? filteredResources.filter((resource) => {
      return resource.type === "Conflict Management";
    }) : [];
    filteredResources = healthIssuesFilter.concat(firstAidFilter).concat(conflictManagementFilter);
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
    var thisResource = this.educationRef.child(resource.key).remove();
  }

  openModal() {
   this.setState({modalVisible:true});
 }

 closeModal() {
   this.setState({modalVisible:false});
 }

 storeResourceInDatabase = () => {
   if (this.state.newResourceTitle === "" || this.state.newResourceContent === "") {
     Alert.alert(
       'Resource Not Added',
       'Please fill out all empty fields',
       [
         {text: 'OK', onPress: () => {}}
       ],
     );
     return;
   }
   this.educationRef.push({
     title: this.state.newResourceTitle,
     type: this.state.newResourceType,
     content: this.state.newResourceContent,
     contentType: this.state.newResourceContentType,
   });
   Alert.alert('Successfully Added');
   this._textInputTitle.setNativeProps({text: ''});
   this._textInputContent.setNativeProps({text: ''});
 }

  checkHealthIssues = () => {
    let bool = this.state.checkedHealthIssues;
    this.setState({ checkedHealthIssues: !bool });
    this.setState({ checkedHealthIssuesColor: !bool ? "#49bf00" : "#bfbfbf" });
    this.searchAdminResources(this.state.searchText, !bool, this.state.checkedFirstAid, this.state.checkedConflictManagement);
  }

  checkFirstAid = () => {
    let bool = this.state.checkedFirstAid;
    this.setState({
      checkedFirstAidColor: !bool ? "#bf5d00" : "#bfbfbf",
      checkedFirstAid: !bool,
    });
    this.searchAdminResources(this.state.searchText, this.state.checkedHealthIssues, !bool, this.state.checkedConflictManagement);
  }

  checkConflictmanagement = () => {
    let bool = this.state.checkedConflictManagement;
    this.setState({
      checkedConflictManagementColor: !bool ? "#0085bf" : "#bfbfbf",
      checkedConflictManagement: !bool,
    });
    this.searchAdminResources(this.state.searchText, this.state.checkedHealthIssues, this.state.checkedFirstAid, !bool);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.resourcesContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar />
          <View style={styles.topBarViewContainer}>
            <Text style={styles.topBarText}>Education Info</Text>
          </View>
        </View>

        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}>
          <View style={styles.adminResourcesAddModalContainer}>
            <View style={styles.adminResourcesAddModalInnerContainer}>
              <Text style={styles.adminResourcesAddModalTitle}>{this.state.labelAddResourceButton}</Text>
              <View style={styles.adminResourcesAddModalForm}>
                <TextInput
                  ref={component => this._textInputTitle = component}
                  placeholder={"Title"}
                  onChangeText={(title) => this.setState({newResourceTitle: title})}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onSubmitEditing={() => {this.value = ""} }
                />
                <Picker
                  selectedValue={this.state.newResourceType}
                  onValueChange={(itemValue, itemIndex) => this.setState({newResourceType: itemValue})}>
                  <Picker.Item label="Health Issues" value="Health Issues" />
                  <Picker.Item label="First Aid" value="First Aid" />
                  <Picker.Item label="Conflict Management" value="Conflict Management" />
                </Picker>
                <TextInput
                  ref={component => this._textInputContent = component}
                  placeholder={"Content"}
                  onChangeText={(content) => this.setState({newResourceContent: content})}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                />
                <Picker
                  selectedValue={this.state.newResourceContentType}
                  onValueChange={(itemValue, itemIndex) => this.setState({newResourceContentType: itemValue})}>
                  <Picker.Item label="Link" value="link" />
                  <Picker.Item label="Picture/Poster" value="picture" />
                  <Picker.Item label="Video" value="video" />
                </Picker>
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

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button
              onPress={() => this.openModal()}
              title="Add New">
            </Button>
          </View>
          <View style={{ width: '50%', margin: 3 }}>
            <CheckBox
              title='Health Issues'
              checkedIcon=''
              uncheckedIcon=''
              containerStyle={{ backgroundColor: this.state.checkedHealthIssuesColor, margin: 0 }}
              checked={this.state.checkedHealthIssues}
              onPress={this.checkHealthIssues}
            />
            <CheckBox
              title='First Aid'
              checkedIcon=''
              uncheckedIcon=''
              containerStyle={{ backgroundColor: this.state.checkedFirstAidColor, margin: 0 }}
              checked={this.state.checkedFirstAid}
              onPress={this.checkFirstAid}
            />
            <CheckBox
              title='Conflict Management'
              checkedIcon=''
              uncheckedIcon=''
              containerStyle={{ backgroundColor: this.state.checkedConflictManagementColor, margin: 0 }}
              checked={this.state.checkedConflictManagement}
              onPress={this.checkConflictmanagement}
            />
          </View>
        </View>

        <View style={styles.adminResourcesSearchContainer}>
          <SearchBar
            placeholder={this.state.labelSearchPlaceholder}
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
                <Text style={styles.adminResourcesListItemText}>{item.title} - {item.type}</Text>
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
      </TouchableWithoutFeedback>
    );

  }


}
