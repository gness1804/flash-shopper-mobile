// @flow

import React, { Component } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import styles from '../styles/AddItem-styles';

class AddItem extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      id: 0,
    }
  }

  state: {
    name: string,
    aisle: string,
    note: string,
    quantity: string,
    id: number,
  }

  props: {
    addNewItem: Function,
    hideAddItem: Function,
    checkForDuplicateNames: Function,
  }

  addItem = (): void => {
    const { name, aisle, note, quantity } = this.state
    if (!name) {
      Alert.alert(
        'Oops! You must enter an item name.',
      )
      return
    }
    const test = this.props.checkForDuplicateNames(name)
    if (test) {
      Alert.alert(
        'An item with this name is already on your list. Please choose a different name.',
        )
      return
    }
    const newItem = {
      name,
      aisle,
      note,
      quantity,
      inCart: false,
    };
    this.props.addNewItem(newItem);
    this.resetItemStates()
    this.hideAddItem()
  }

  hideAddItem = (): void => {
    this.props.hideAddItem()
  }


  resetItemStates = (): void => {
    this.setState({ name: '' });
    this.setState({ aisle: '' });
    this.setState({ note: '' });
    this.setState({ quantity: '' });
    this.setState({ id: 0 });
  }

  render() {
    return (
      <View style={styles.editViewContainer}>
        <Text style={styles.editViewHeadline}>Add Item to Main List</Text>
        <TextInput
          id="item-input"
          value={this.state.name}
          style={styles.inputField}
          placeholder="Item Name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          id="aisle-input"
          value={this.state.aisle}
          style={styles.inputField}
          placeholder="Aisle Name"
          onChangeText={aisle => this.setState({ aisle })}
        />
        <TextInput
          id="note-input"
          value={this.state.note}
          style={styles.inputField}
          placeholder="Note"
          onChangeText={note => this.setState({ note })}
        />
        <TextInput
          id="quantity-input"
          value={this.state.quantity}
          style={styles.inputField}
          placeholder="Quantity"
          onChangeText={quantity => this.setState({ quantity })}
        />
        <View style={styles.editViewButtonContainer}>
          <TouchableOpacity
            onPress={this.addItem}
          >
            <Text style={styles.editViewButtonSave}>
                Add Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.hideAddItem}
          >
            <Text style={styles.editViewButtonCancel}>
                Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AddItem
