import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
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
    let itemList
    return (
      <ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.isPantryVisible}
          onRequestClose={this.warnUser}
        >
          <Text>Pantry</Text>
          <ScrollView>
            {itemList}
          </ScrollView>
          <TouchableOpacity>
            <Image
              source={require('../images/circle-with-plus.png')}
            />
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }

}

export default Pantry;
