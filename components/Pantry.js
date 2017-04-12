import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Modal,
  Alert,
} from 'react-native';

class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  cancelOutOfModal = () => {
    this.props.makePantryInvisible()
  }

  warnUser = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to navigate away from this view? You will lose any unsaved changes.',
      [
        {
          text: 'OK',
          onPress: this.cancelOutOfModal,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  render() {
    return (
      <ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.isPantryVisible}
          onRequestClose={this.warnUser}
        >
          <Text>I am the pantry component.</Text>
        </Modal>
      </ScrollView>
    );
  }

}

export default Pantry;
