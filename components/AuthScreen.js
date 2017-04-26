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
import styles from '../styles/AuthScreen-styles';
import commonElements from '../styles/CommonElements';

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
    .catch(() => { this.showLogInError() })
  }

  resetEmailAndPWStates = ():void => {
    this.setState({ email: '' })
    this.setState({ password: '' })
  }

  showLogInError = ():void => {
    Alert.alert('There was a problem signing in. Please double check your email and password.')
    this.resetEmailAndPWStates()
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

  showSignUpError = ():void => {
    Alert.alert('There was a problem signing up. Please ensure that you have not already signed up using this email address and that the email format is valid (foo@foobar.com).')
    this.resetEmailAndPWStates()
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
          .catch(() => { this.showSignUpError() })
  }

  render() {
    const { email, password } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Sign Up or Sign In</Text>
        <TextInput
          id="email-input"
          style={styles.inputField}
          value={email}
          placeholder="Enter Your Email Address"
          onChangeText={_email => this.setState({ email: _email })}
        />
        <TextInput
          id="password-input"
          style={styles.inputField}
          secureTextEntry
          value={password}
          placeholder="Enter Your Password"
          onChangeText={_password => this.setState({ password: _password })}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Sign Up"
              color={commonElements.core.button.color}
              onPress={() => { this.signUp(email, password) }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Log In"
              color={commonElements.core.button.color}
              onPress={() => { this.logIn(email, password) }}
            />
          </View>
        </View>
      </View>
    );
  }

}

export default AuthScreen;