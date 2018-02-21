import {
    AppRegistry,
    TextInput,
    Text,
    View,
    ImageBackground,
    StyleSheet,
    dismissKeyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
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
            response: ""
        };

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    signup() {
      DismissKeyboard();
      this.props.navigation.navigate('SignUp');
    }

    async login() {
      DismissKeyboard();
      try {
          await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
          this.setState({ response: "Logged In!" });
          setTimeout(() => {
              this.props.navigation.navigate('Tabs');
          }, 1500);
      } catch (error) {
          this.setState({
              response: error.toString()
          });
      }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
              <ImageBackground
                style={styles.loginBackgroundImage}
                source={require('../../images/loginBG.png')}>
                <View style={styles.loginContainer}>
                    <View style={styles.loginFormGroup}>
                        <KeyboardAvoidingView
                          behavior="padding">
                          <Text style={styles.loginTitle}>SATIconnect</Text>
                          <Sae
                              label={"Email Address"}
                              iconClass={FontAwesomeIcon}
                              iconName={"envelope"}
                              iconColor={"white"}
                              onChangeText={(email) => this.setState({email})}
                              keyboardType="email-address"
                              autoCapitalize={'none'}
                              autoCorrect={false}
                          />
                          <Sae
                              label={"Password"}
                              iconClass={FontAwesomeIcon}
                              iconName={"lock"}
                              iconColor={"white"}
                              onChangeText={(password) => this.setState({password})}
                              password={true}
                              autoCapitalize={'none'}
                              autoCorrect={false}
                          />
                        </KeyboardAvoidingView>

                        <View style={styles.loginSubmitGroup}>
                          <Button
                            onPress={this.login}
                            textStyle={styles.loginSubmitText}>Login</Button>
                          <Button
                            onPress={this.signup}
                            style={styles.loginSignUpButton}
                            textStyle={styles.loginSubmitText}>Sign up</Button>
                        </View>
                    </View>
                    <View style={styles.loginResponseContainer}>
                        <Text style={styles.loginResponse}>{this.state.response}</Text>
                    </View>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}
