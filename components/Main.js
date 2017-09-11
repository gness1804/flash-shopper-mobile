// @flow

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Platform,
  Linking,
} from 'react-native';
import styles from '../styles/Main-styles';
import NoItemsDisplay from './NoItemsDisplay';

class Main extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      id: '',
      inCart: false,
      tempName: '',
      tempAisle: '',
      tempNote: '',
      tempQuantity: '',
      tempId: '',
      showEditView: false,
      dirtyAttributes: false,
    }
  }

  state: {
    name: string,
    aisle: string,
    note: string,
    quantity: string,
    id: string,
    inCart: boolean,
    tempName: string,
    tempAisle: string,
    tempNote: string,
    tempQuantity: string,
    tempId: string,
    showEditView: boolean,
    dirtyAttributes: boolean,
  }

  props: {
    items: Array<{ name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }>,
    deleteItem: Function,
    saveChanges: Function,
    toggleInCart: Function,
    showAddItem: Function,
    addItemToCart: Function,
  }

  cancelOutOfModal = (): void => {
    this.resetItemStates()
    this.setState({ showEditView: false })
    this.resetTempStates()
  }

  addItemToAmazonPrimeNow = (item: Object): void => {
    Linking.openURL(`https://primenow.amazon.com/search?k=${item.name}`);
    this.props.addItemToCart(item);
  }

  deleteItem = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }): void => {
    Alert.alert(
      'Warning',
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteItem(item)
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  }

  editItem = (name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean): void => {
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
    this.setState({ dirtyAttributes: false });
    this.setState({ showEditView: true })
  }

  resetItemStates = (): void => {
    this.setState({ name: '' });
    this.setState({ aisle: '' });
    this.setState({ note: '' });
    this.setState({ quantity: '' });
    this.setState({ id: '' });
  }

  resetTempStates = (): void => {
    this.setState({ tempName: '' });
    this.setState({ tempAisle: '' });
    this.setState({ tempNote: '' });
    this.setState({ tempQuantity: '' });
    this.setState({ tempId: '' });
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

  showAddItem = ():void => {
    this.props.showAddItem()
  }

  showSaveMicrointeraction = (): void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item saved!', ToastAndroid.SHORT)
    }
  }

  toggleInCart = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
    this.props.toggleInCart(item)
  }

  updateAisle = (aisle: string): void => {
    const promise = new Promise((resolve, reject) => {
      resolve(this.setState({ aisle }))
      reject((err: string) => { console.log(err) }) //eslint-disable-line
    });
    promise.then(() => {
      if (this.state.aisle !== this.state.tempAisle) {
        this.setState({ dirtyAttributes: true })
      }
    })
    .catch((err: string) => { throw new Error(err) })
  }

  updateName = (name: string): void => {
    const promise = new Promise((resolve, reject) => {
      resolve(this.setState({ name }))
      reject((err: string) => { console.log(err) }) //eslint-disable-line
    });
    promise.then(() => {
      if (this.state.name !== this.state.tempName) {
        this.setState({ dirtyAttributes: true })
      }
    })
    .catch((err: string) => { throw new Error(err) })
  }

  updateNote = (note: string): void => {
    const promise = new Promise((resolve, reject) => {
      resolve(this.setState({ note }))
      reject((err: string) => { console.log(err) }) //eslint-disable-line
    });
    promise.then(() => {
      if (this.state.note !== this.state.tempNote) {
        this.setState({ dirtyAttributes: true })
      }
    })
    .catch((err: string) => { throw new Error(err) })
  }

  updateQuantity = (quantity: string): void => {
    const promise = new Promise((resolve, reject) => {
      resolve(this.setState({ quantity }))
      reject((err: string) => { console.log(err) }) //eslint-disable-line
    });
    promise.then(() => {
      if (this.state.quantity !== this.state.tempQuantity) {
        this.setState({ dirtyAttributes: true })
      }
    })
    .catch((err: string) => { throw new Error(err) })
  }

  warnUser = (): void => {
    if (this.state.dirtyAttributes) {
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
      itemsDisplay = items.map((item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
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
          {aisle ? <Text style={textStyle}>Aisle: {aisle}</Text> : <Text />}
          {note ? <Text style={textStyle}>Note: {note}</Text> : <Text />}
          {quantity ? <Text style={textStyle}>Quantity: {quantity}</Text> : <Text />}
          <View style={styles.eachItemButtonsContainer}>
            <TouchableOpacity
              onPress={() => { this.deleteItem(item) }}
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
              onPress={() => { this.toggleInCart(item) }}
            >
              <Image
                source={require('../images/cart.png')}
                style={styles.cartIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.addItemToAmazonPrimeNow(item) }}
            >
              <Image
                source={require('../images/amazon-prime-now.png')}
                style={styles.cartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>)
      })
    } else {
      itemsDisplay = (
        <NoItemsDisplay
          showAddItem={this.showAddItem.bind(this)}
        />
      )
    }

    return (
      <ScrollView style={styles.container}>
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
              onChangeText={name => this.updateName(name)}
            />
            <TextInput
              id="aisle-input"
              value={this.state.aisle}
              style={styles.inputField}
              placeholder="Aisle Name"
              onChangeText={aisle => this.updateAisle(aisle)}
            />
            <TextInput
              id="note-input"
              value={this.state.note}
              style={styles.inputField}
              placeholder="Note"
              onChangeText={note => this.updateNote(note)}
            />
            <TextInput
              id="quantity-input"
              value={this.state.quantity}
              style={styles.inputField}
              placeholder="Quantity"
              onChangeText={quantity => this.updateQuantity(quantity)}
            />
            <View style={styles.editViewButtonContainer}>
              <TouchableOpacity
                onPress={this.saveChanges}
                disabled={!this.state.dirtyAttributes}
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

        <View style={styles.itemsDisplayContainer}>
          {itemsDisplay}
        </View>
      </ScrollView>
    );
  }

}

export default Main;
