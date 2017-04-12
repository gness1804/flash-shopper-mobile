import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Modal,
} from 'react-native';

class Pantry extends Component {

  warnUser = () => {

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
