import React, {Component} from 'react';
import { View, Text, Image, Picker, Switch, Button, StyleSheet } from 'react-native';
import styles from '../styles/styles.js';

export default class CheckInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastcheckin: new Date(),
      statusMessage: "happy",
      shareLocation: true,
    }

    checkin = (now) => {
      this.setState({ lastcheckin: now });
    }
  }

  formatDate = (date) => {
    return date.toLocaleString();
  }

  _onPress() {
    var now = new Date();
    checkin(now);
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source = {require('../../images/sati.png')}
          style = {[styles.satiImage]}
        />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Switch
              onValueChange={() => {this.setState({shareLocation: !this.state.shareLocation})}}
              value={this.state.shareLocation}
            />
            <Text>Share Location</Text>
          </View>
          <Button
            onPress={this._onPress}
            title="Update Status"
          />
          <Text style={{padding:0}}>{ this.formatDate(this.state.lastcheckin) }</Text>
        </View>
        <View style={{marginTop:0}}>
          <Text style={{fontSize: 30, alignSelf: 'center', color: 'blue'}}>How I feel today</Text>
          <Text style={{fontSize: 20, alignSelf: 'center', color: 'red'}}>{ this.state.statusMessage }</Text>
          <Picker
            style={{width:200}}
            selectedValue={this.state.statusMessage}
            onValueChange={(itemValue, itemIndex) => this.setState({statusMessage: itemValue})}>
            <Picker.Item label="🙂 Happy" value="happy" />
            <Picker.Item label="🌷 Hopeful" value="hopeful" />
            <Picker.Item label="😍 Loved" value="loved" />
            <Picker.Item label="😀 Thankful" value="thankful" />
            <Picker.Item label="😁 Awesome" value="awesome" />
            <Picker.Item label="😌 Relaxed" value="relaxed" />
            <Picker.Item label="😢 Sad" value="sad" />
            <Picker.Item label="😵 Confused" value="confused" />
            <Picker.Item label="😊 Good" value="good" />
            <Picker.Item label="😟 Concerned" value="concerned" />
            <Picker.Item label="😴 Tired" value="tired" />
            <Picker.Item label="🆘 Need Help" value="help" />
            <Picker.Item label="😷 Sick" value="sick" />
            <Picker.Item label="🤕 Hurt" value="hurt" />
          </Picker>
        </View>
      </View>
    );
  }
}
