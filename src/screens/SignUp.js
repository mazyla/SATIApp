import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";

import React, {Component} from "react";
import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";

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
            })
        }

        let userDetailsPath = "/users/" + 1 + "/details";

        firebase.database().ref(userDetailsPath).set({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          age: this.state.age,
          gender: this.state.gender
        });



    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <ScrollView style={CommonStyle.container}>
                    <View style={styles.formGroup}>
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
                            onChangeText={(password) => this.setState({password})}
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

                        <View style={styles.submit}>
                            <Button onPress={this.signup} style={CommonStyle.buttons} textStyle={{fontSize: 18}}>
                                Sign up
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.response}>{this.state.response}</Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    formGroup: {
        padding: 50
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        opacity: 0.8,
    },

    submit: {
        paddingTop: 30
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    }
});
