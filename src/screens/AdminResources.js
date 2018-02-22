import React, {Component} from 'react';
import { View, Text, Image, Switch, Button, TouchableOpacity,
  StatusBar, Alert, FlatList } from 'react-native';
import styles from '../styles/styles.js';
import { fb } from '../../App'

export default class AdminResources extends Component {
  constructor(props) {
    super(props);

    this.resourcesRef = fb.database().ref().child('resources');

    this.state = {
      currentResources: this.getAllResources(),
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
      this.setState({resources: tempResources});
      //Alert.alert(resources[5].key.toString());
      tempResources = [];
      },this);

  }

  renderFlatListItem = (item) => {
    return (
      <View key={"parentView"+item.key}>
		    <Text key={"topicCat"+item.type} style={styles.itemTypeText}>{item.type}</Text>
      </View>
	   )
   }

  render() {
    return (
      <View style={styles.resourcesContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={styles.topBarTextContainer}>
            <Text style={styles.topBarText}>Resources</Text>
          </View>
        </View>

        <View>
          <FlatList
          data={this.state.resources}
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
