import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from 'react-native';
import styles from '../styles/Pantry-styles';

class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      showItemView: false,
      name: '',
      aisle: null,
      note: '',
      quantity: null,
      id: null,
    }
  }

  showItemView = () => {
    this.setState({ showItemView: true });
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
          visible={this.state.showItemView}
          onRequestClose={this.warnUser}
        >
          <Text>
            Add Item to Pantry
          </Text>
          <TextInput
            value={this.state.name}
            style={styles.inputField}
            placeholder="Item Name"
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            value={this.state.aisle}
            style={styles.inputField}
            placeholder="Item Aisle"
            onChangeText={aisle => this.setState({ aisle })}
          />
          <TextInput
            value={this.state.note}
            style={styles.inputField}
            placeholder="Item Note"
            onChangeText={note => this.setState({ note })}
          />
          <TextInput
            value={this.state.quantity}
            style={styles.inputField}
            placeholder="Item Quantity"
            onChangeText={quantity => this.setState({ quantity })}
          />
          <TouchableOpacity>
            <Text>
              Add
            </Text>
          </TouchableOpacity>
        </Modal>
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
          <View style={styles.bottonIconContainer}>
            <TouchableOpacity
              onPress={this.warnUser}
            >
              <Image
                source={require('../images/arrow-left.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.showItemView}
            >
              <Image
                source={require('../images/circle-with-plus.png')}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    );
  }

}

export default Pantry;
