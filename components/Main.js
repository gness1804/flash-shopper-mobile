// @flow

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Platform,
} from 'react-native';
import Pantry from './Pantry';
import styles from '../styles/Main-styles';

class Main extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      id: 0,
      inCart: false,
      tempName: '',
      tempAisle: '',
      tempNote: '',
      tempQuantity: '',
      tempId: 0,
      showEditView: false,
      isPantryVisible: false,
    }
  }

  state: {
    name: string,
    aisle: string,
    note: string,
    quantity: string,
    id: number,
    inCart: boolean,
    tempName: string,
    tempAisle: string,
    tempNote: string,
    tempQuantity: string,
    tempId: number,
    showEditView: boolean,
    isPantryVisible: boolean,
  }

  props: {
    items: Array<{ name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean}>,
    deleteItem: Function,
    saveChanges: Function,
    transferItemToMainList: Function,
    toggleInCart: Function,
  }

  cancelOutOfModal = (): void => {
    this.resetItemStates()
    this.setState({ showEditView: false })
    this.resetTempStates()
  }

  deleteItem = (id: number): void => {
    this.props.deleteItem(id);
  }

  editItem = (name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean): void => {
    this.setState({ name });
    this.setState({ aisle });
    this.setState({ note });
    this.setState({ quantity });
    this.setState({ id });
    this.setState({ inCart });
    this.setState({ tempName: name });
    this.setState({ tempAisle: aisle });
    this.setState({ tempNote: note });
    this.setState({ tempQuantity: quantity });
    this.setState({ tempId: id });
    this.setState({ showEditView: true })
  }

  goToPantry = (): void => {
    this.setState({ isPantryVisible: true })
  }

  makePantryInvisible = (): void => {
    this.setState({ isPantryVisible: false });
  }

  resetItemStates = (): void => {
    this.setState({ name: '' });
    this.setState({ aisle: '' });
    this.setState({ note: '' });
    this.setState({ quantity: '' });
    this.setState({ id: 0 });
  }

  resetTempStates = (): void => {
    this.setState({ tempName: '' });
    this.setState({ tempAisle: '' });
    this.setState({ tempNote: '' });
    this.setState({ tempQuantity: '' });
    this.setState({ tempId: 0 });
  }

  saveChanges = (): void => {
    const { name, aisle, quantity, note, id, inCart } = this.state
    if (!name) {
      Alert.alert(
        'Oops! You must enter in an item name!',
      )
      return
    }
    this.props.saveChanges(name, aisle, quantity, note, id, inCart)
    this.resetItemStates()
    this.setState({ showEditView: false })
    this.showSaveMicrointeraction()
  }

  showSaveMicrointeraction = (): void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item saved!', ToastAndroid.SHORT)
    }
  }

  toggleInCart = (id: number) => {
    this.props.toggleInCart(id)
  }

  transferItemToMainList = (item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }): void => {
    this.props.transferItemToMainList(item)
  }

  warnUser = (): void => {
    const { name, aisle, note, quantity, tempName, tempAisle, tempNote, tempQuantity } = this.state
    if (name !== tempName
    || aisle !== tempAisle
    || note !== tempNote
    || quantity !== tempQuantity) {
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
    } else {
      this.cancelOutOfModal()
    }
  }

  render() {
    const { items } = this.props

    let itemsDisplay;

    if (items.length > 0) {
      itemsDisplay = items.map((item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => {
        const { name, aisle, note, quantity, id, inCart } = item
        let nameStyle
        let textStyle
        if (inCart) {
          nameStyle = styles.nameInCart
        } else {
          nameStyle = styles.name
        }
        if (inCart) {
          textStyle = styles.textInCart
        } else {
          textStyle = styles.text
        }
        return (<View style={styles.eachItemContainer} key={item.id}>
          <Text style={nameStyle}>{name}</Text>
          <Text style={textStyle}>Aisle: {aisle}</Text>
          <Text style={textStyle}>Note: {note}</Text>
          <Text style={textStyle}>Quantity: {quantity}</Text>
          <View style={styles.eachItemButtonsContainer}>
            <TouchableOpacity
              onPress={() => { this.deleteItem(id) }}
            >
              <Image
                source={require('../images/cancel-circle.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.editItem(name, aisle, note, quantity, id, inCart) }}
            >
              <Image
                source={require('../images/pencil.png')}
                style={styles.pencilIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.toggleInCart(id) }}
            >
              <Image
                source={require('../images/cart.png')}
                style={styles.cartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>)
      })
    }

    return (
      <ScrollView style={styles.container}>
        <Pantry
          isPantryVisible={this.state.isPantryVisible}
          makePantryInvisible={this.makePantryInvisible.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showEditView}
          onRequestClose={this.warnUser}
        >
          <ScrollView contentContainerStyle={styles.editViewContainer}>
            <Text style={styles.editViewHeadline}>
              Edit Item: {this.state.name}
            </Text>
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
                onPress={this.saveChanges}
              >
                <Text style={styles.editViewButtonSave}>
                  Save Changes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.warnUser}
              >
                <Text style={styles.editViewButtonCancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>

        <View style={styles.button}>
          <Button
            title="Delete ALL Items"
            onPress={() => { this.deleteAllItems() }}
            disabled={this.props.items.length === 0}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Pantry"
            onPress={() => { this.goToPantry() }}
          />
        </View>
        <View style={styles.itemsDisplayContainer}>
          {itemsDisplay}
        </View>
      </ScrollView>
    );
  }

}

export default Main;
