// @flow

import React, { Component } from 'react';
import { View,
 Text,
 Button,
 TextInput,
 Platform,
 ToastAndroid,
 Alert,
} from 'react-native';
import * as firebase from 'firebase';

class AuthScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  state: {
    email: string,
    password: string,
  }

  logIn = (email: string, password: string):void => {
    if (!email || !password) {
      Alert.alert(
        'Oops! You must enter both an email and a password.',
      )
      return
    }
    const promise = new Promise((resolve) => {
      resolve(
        firebase.auth().signInWithEmailAndPassword(email, password),
      )
    })
    promise
    .then(() => { this.showLogInMicrointeraction() })
    .then(() => { this.resetEmailAndPWStates() })
    .catch((err: string) => { throw new Error(err) })
  }

  resetEmailAndPWStates = ():void => {
    this.setState({ email: '' })
    this.setState({ password: '' })
  }

  showSignUpMicrointeraction = ():void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('You have successfully signed up.', ToastAndroid.SHORT)
    } else {
      Alert.alert('Sign Up successful.')
    }
  }

  showLogInMicrointeraction = ():void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('You have successfully logged in.', ToastAndroid.SHORT)
    } else {
      Alert.alert('Login successful.')
    }
  }

  signUp = (email: string, password: string):void => {
    if (!email || !password) {
      Alert.alert(
        'Oops! You must enter both an email and a password.',
      )
      return
    }
    const promise = new Promise((resolve) => {
      resolve(
        firebase.auth().createUserWithEmailAndPassword(email, password),
      )
    });
    promise
          .then(() => { this.showSignUpMicrointeraction() })
          .then(() => { this.resetEmailAndPWStates() })
          .catch((err: string) => { throw new Error(err) })
  }

  render() {
    const { email, password } = this.state
    return (
      <View>
        <Text>Sign Up or Sign In</Text>
        <TextInput
          id="email-input"
          value={email}
          placeholder="Enter Your Email Address"
          onChangeText={_email => this.setState({ email: _email })}
        />
        <TextInput
          id="password-input"
          secureTextEntry
          value={password}
          placeholder="Enter Your Password"
          onChangeText={_password => this.setState({ password: _password })}
        />
        <Button
          title="Sign Up"
          onPress={() => { this.signUp(email, password) }}
        />
        <Button
          title="Log In"
          onPress={() => { this.logIn(email, password) }}
        />
      </View>
    );
  }

}

export default AuthScreen;
