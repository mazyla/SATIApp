import firebase from 'firebase';
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, Image, StatusBar, Keyboard, WebView } from 'react-native';
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
      var filteredList = [];
      this.setState({ resources: snapshot.val() });
      snapshot.forEach(item => {
        if (item.val().type === this.props.navigation.state.params.type) {
          filteredList.push(item.val());
        }
      });
      this.setState({ displayedResources: filteredList });
    }, this);
  }

  searchResources = (search) => {
    var filteredResources = this.state.resources.filter((resource) => {
      // Case insensitive
      return (resource.contentType === this.state.type) && (resource.title.toLowerCase().includes(search.toLowerCase()));
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
          <View style={{flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center'}}>

            <TouchableOpacity onPress={this._goBack} style={{alignItems: 'center', justifyContent: 'center', width: '5%'}}>
              <Icon name={'ios-arrow-back'} size={26} style={{color: 'white'}} />
            </TouchableOpacity>

            <View style={{alignItems: 'center', justifyContent: 'center', width: '90%'}}>
              <Text style={styles.topBarText}>{this.state.type}</Text>
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
            renderItem={({item}) => {
              if (item.contentType === "link") {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EducationSearchViewResource', {resource: item})}>
                  <View style={styles.educationListItemContainer}>
                    <View style={styles.educationListItemContentPicture}>
                      <Text style={styles.educationListItemContentLinkText}>Link</Text>
                    </View>
                    <View style={styles.educationListItemTextContainer}>
                      <Text style={styles.educationListItemText}>{item.title}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                );
              } else if (item.contentType === "picture") {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EducationSearchViewResource', {resource: item})}>
                  <View style={styles.educationListItemContainer}>
                    <View>
                      <Image
                        source={{uri: item.content}}
                        style={styles.educationListItemContentPicture} />
                    </View>
                    <View style={styles.educationListItemTextContainer}>
                      <Text style={styles.educationListItemText}>{item.title}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                );
              } else if (item.contentType == "video") {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('EducationSearchViewResource', {resource: item})}>
                  <View style={styles.educationListItemContainer}>
                    <View pointerEvents='none'>
                      <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        style={styles.educationListItemContentPicture}
                        source={{uri: item.content}} />
                    </View>
                    <View style={styles.educationListItemTextContainer}>
                      <Text style={styles.educationListItemText}>{item.title}</Text>
                    </View>
                  </View>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>


      </View>
    );
  }
}
