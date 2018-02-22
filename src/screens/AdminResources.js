import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity,
  StatusBar, Alert, FlatList, Modal, KeyboardAvoidingView } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Sae } from "react-native-textinput-effects";
import Icon from 'react-native-vector-icons/Ionicons';

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
<<<<<<< HEAD
      this.setState({resources: tempResources});
      //Alert.alert(resources[5].key.toString());
=======
      this.setState({currentResources: tempResources});
>>>>>>> fa17ec65ba465c7ff487e5ddce97223bdc6d3159
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
          <View style={styles.modalContainer}>
           <View style={styles.innerContainer}>
                <Text>Add New Resource</Text>
                <View style={styles.loginFormGroup}>

                <Button
                    onPress={() => this.closeModal()}
                    title="Close"
                >
                </Button>
              </View>
            </View>
                      </View>
          </Modal>


        <View>
          <FlatList
          data={this.state.currentResources}
          renderItem={({item}) =>
          <View style={styles.adminResourcesListContainer}>
            <Text style={styles.adminResourcesListItemText}>{item.key} - {item.type}</Text>

          </View>
        }
        />
        </View>


        </View>
    );

  }


}
