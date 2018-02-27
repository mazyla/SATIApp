import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Image, StatusBar, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons'

export default class NewsFeedSeeAll extends Component {
  constructor(props) {
    super(props);

    this.activitiesRef = fb.database().ref('activities');

    this.state = {
      activities: [],
      displayedActivities: [],
    }
  }

  componentWillMount() {
    this.getEntries();
  }

  getEntries = () => {
    var activities = [];
    var education = [];
    this.activitiesRef.on("value", function(snapshot) {
      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          activities.push(item);

      });
      // if (activities.length < 5) {
      //   this.educationalRef.on("value", function(snapshot) {
      //     snapshot.forEach(childSnapshot => {
      //         let item = childSnapshot.val();
      //         item.key = childSnapshot.key;
      //         education.push(item);
      //     });
      // }

    // sort activities by their time
      for (i = 0; i < activities.length; i++) {
        for (j = 0; j < i; j++) {
          if (activities[i].time < activities[j].time) {
            var temp = activities[i];
            activities[i] = activities[j];
            activities[j] = temp;
          }
        }
      }

      if (activities.length > 5) {
        activities.splice(5, activities.length - 5);
    }
      this.setState({activities: activities, displayedActivities: activities});


    }, this);

  }

  // getActivities = () => {
  //   this.newsFeedRef.on("value", function(snapshot) {
  //     var activityList = snapshot.val();
  //     this.setState({ activities: activityList, displayedActivities: activityList });
  //   }, this);
  // }

  searchActivities = (search) => {
    var filteredActivities = this.state.activities.filter((activity) => {
      return (activity.name.toLowerCase().includes(search.toLowerCase()));
    });
    this.setState({ displayedActivities: filteredActivities });
  }

  _goBack = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('NewsFeed');
  }

  render() {
    return (
      <View style={styles.educationContainer}>

        <View style={styles.topBarContainer}>
          <StatusBar hidden={false} />
          <View style={{flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this._goBack}>
              <View style={{alignItems: 'center', justifyContent: 'center', padding: 3}}><Icon name={'ios-arrow-back'} size={26} style={{color: 'white'}} /></View>
            </TouchableOpacity>
            <View style={styles.topBarTextContainer}>
              <Text style={styles.topBarText}>Activity Search</Text>
            </View>
          </View>
        </View>

        <View>
          <SearchBar
            placeholder='Type Here...'
            showLoading
            lightTheme
            onChangeText={this.searchActivities}
            clearIcon={{color: '#86939e', name: 'close'}}
          />
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={this.state.displayedResources}
            renderItem={({item}) =>
              <View style={{borderWidth: 1, flexDirection: 'row'}}>
                <Image source={{uri:item.picture}} style={{width:100, height:100, borderRadius: 50}} />
                <View>
                  <Text style={{padding: 10, fontSize: 18, height: 44, fontWeight: 'bold'}}>{item.name}</Text>
                  <Text style={{padding: 10}}>Location: {item.location}</Text>
                </View>
              </View>
            }
          />
        </View>


      </View>
    );
  }

}
