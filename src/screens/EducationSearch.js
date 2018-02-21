import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Image, StatusBar, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../styles/styles.js';
import { fb } from '../../App'
import Icon from 'react-native-vector-icons/Ionicons'

export default class EducationSearchView extends Component {
  constructor(props) {
    super(props);

    this.educationRef = fb.database().ref('education');

    this.state = {
      type: null, // Conflict management, first aid, stds, etc.
      //***can check this to query instead of having to make separate pages for the 3 different types.***
      resources: [],
      displayedResources: [],
    }
  }

  componentWillMount() {
    this.setState({ type: this.props.navigation.state.params.type});
    this.getResources();
  }

  getResources = () => {
    this.educationRef.on("value", function(snapshot) {
      var resourceList = snapshot.val();
      this.setState({ resources: resourceList });
      this.setState({ displayedResources: resourceList.filter(item => item.type === this.props.navigation.state.params.type) });
    }, this);
  }

  searchResources = (search) => {
    var filteredResources = this.state.resources.filter((resource) => {
      // Case insensitive
      return (resource.type === this.state.type) && (resource.name.toLowerCase().includes(search.toLowerCase()));
      // TODO: add filters for other fields
    });
    this.setState({ displayedResources: filteredResources });
  }

  _goBack = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('Education');
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
              <Text style={styles.topBarText}>Education Search</Text>
            </View>
          </View>
        </View>

        <View>
          <SearchBar
            placeholder='Type Here...'
            showLoading
            lightTheme
            onChangeText={this.searchResources}
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
