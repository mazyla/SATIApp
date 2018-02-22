import {
    AppRegistry,
    TextInput,
    Text,
    View,
    ImageBackground,
    StyleSheet,
    dismissKeyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";

import React, {Component} from "react";
import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Sae } from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import styles from '../styles/styles.js';
import CommonStyle from "../styles/common.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: "",
            firstName: "",
            lastName: "",
            age: 0,
            gender: "",
        };

        this.signup = this.signup.bind(this);
    }

    async signup() {
      DismissKeyboard();
      try {
          await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
          this.setState({
              response: "account created"
          });
          setTimeout(() => {
              this.props.navigation.navigate('Tabs');
          }, 1500);
      } catch (error) {
          this.setState({
              response: error.toString()
          });
      }

      let userDetailsPath = "/users/" + 1;

      firebase.database().ref("users").push({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        age: this.state.age,
        gender: this.state.gender,
        streak: 0
      });

      var currentUser = firebase.auth().currentUser;
      currentUser.updateProfile({
        displayName: this.state.displayName,
      });
    }

    render() {
      return (
        <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
          <ImageBackground
            style={styles.loginBackgroundImage}
            source={require('../../images/loginBG.png')}>
              <ScrollView contentContainerStyle={styles.loginContainer}>
                <View style={styles.loginFormGroup}>
                  <KeyboardAvoidingView
                    keyboardVerticalOffset={100}
                    behavior="padding">
                  <Sae
                      label={"First Name"}
                      iconClass={FontAwesomeIcon}
                      iconName={"pencil"}
                      iconColor={"white"}
                      onChangeText={(firstName) => this.setState({firstName})}
                      password={true}
                      autoCapitalize="none"
                  />
                  <Sae
                      label={"Last Name"}
                      iconClass={FontAwesomeIcon}
                      iconName={"pencil"}
                      iconColor={"white"}
                      onChangeText={(lastName) => this.setState({lastName})}
                      password={true}
                      autoCapitalize="none"
                  />
                  <Sae
                      label={"Email Address"}
                      iconClass={FontAwesomeIcon}
                      iconName={"envelope"}
                      iconColor={"white"}
                      onChangeText={(email) => this.setState({email})}
                      keyboardType="email-address"
                      autoCapitalize="none"
                  />
                  <Sae
                      label={"Password"}
                      iconClass={FontAwesomeIcon}
                      iconName={"key"}
                      iconColor={"white"}
                      onChangeText={(password) => this.setState({password})}
                      password={true}
                      autoCapitalize="none"
                  />
                  <Sae
                      label={"Gender"}
                      iconClass={FontAwesomeIcon}
                      iconName={"key"}
                      iconColor={"white"}
                      onChangeText={(gender) => this.setState({gender})}
                      password={true}
                      autoCapitalize="none"
                  />
                  <Sae
                      label={"Age"}
                      iconClass={FontAwesomeIcon}
                      iconName={"key"}
                      iconColor={"white"}
                      onChangeText={(age) => this.setState({age})}
                      password={true}
                      autoCapitalize="none"
                  />
                  </KeyboardAvoidingView>
                  <View style={styles.loginSubmitGroup}>
                    <Button
                      onPress={this.signup}
                      style={styles.loginSignUpButton}
                      textStyle={styles.loginSubmitText}>Sign up</Button>
                  </View>

                </View>

                <View style={styles.loginResponseContainer}>
                  <Text style={styles.loginResponse}>{this.state.response}</Text>
                </View>

            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    }
}
