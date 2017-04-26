// @flow

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
  ToastAndroid,
  Platform,
} from 'react-native';
import { _ , some } from 'lodash'; // eslint-disable-line
import * as firebase from 'firebase';
import firebaseApp from '../firebaseConfig';  // eslint-disable-line
import styles from '../styles/Pantry-styles';
import cleanUpUserEmail from '../helpers/cleanUpUserEmail';

class Pantry extends Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      items: [],
      showAddView: false,
      showEditView: false,
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      id: '',
      inCart: false,
      userEmail: '',
      userId: '',
    }

    this.itemsRef = {}
  }

  state: {
    items: Array<{ name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }>,
    showAddView: boolean,
    showEditView: boolean,
    name: string,
    aisle: string,
    note: string,
    quantity: string,
    id: string,
    inCart: boolean,
    userEmail: string,
    userId: string,
  }


  componentDidMount = (): void => {
    this.initializeApp()
  }

  itemsRef: Object

  props: {
    isPantryVisible: boolean,
    makePantryInvisible: Function,
  }

  addItem = (): void => {
    const { name, aisle, note, quantity, items } = this.state
    const test = _.some(items, { name: this.state.name })
    if (!name) {
      Alert.alert(
        'Oops! You must enter a name.',
      )
      return
    }
    if (test) {
      Alert.alert(
        'Oops! There is already an item with this name in your pantry.',
      )
      return
    }
    const newItem = {
      name,
      aisle,
      note,
      quantity,
      inCart: false,
    }
    const promise = new Promise((resolve) => {
      resolve(this.itemsRef.push(
        newItem,
      ))
    });
    promise
          .then((): void => { this.resetItemState() })
          .then((): void => { this.hideAddView() })
          .catch((err: string): void => { throw new Error(err) })
  }

  cancelOutOfModal = (): void => {
    this.props.makePantryInvisible()
  }

  editItem = (name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean): void => {
    this.setState({ name });
    this.setState({ aisle });
    this.setState({ note });
    this.setState({ quantity });
    this.setState({ id });
    this.setState({ inCart })
    this.setState({ showEditView: true })
  }

  hideAddView = (): void => {
    this.setState({ showAddView: false })
  }

  hideEditView = (): void => {
    this.setState({ showEditView: false })
  }

  initializeApp = ():void => {
    firebase.auth().onAuthStateChanged((user: Object) => {
      if (user) {
        const email = cleanUpUserEmail(user.email)
        this.setState({ userEmail: user.email })
        this.setState({ userId: user.uid })
        this.itemsRef = firebase.database().ref(email + '/pantry') //eslint-disable-line
        this.listenForItems(this.itemsRef)
      }
    })
  }

  listenForItems = (itemsRef: Object):void => {
    itemsRef.on('value', (snapshot: Array<{ name: string, aisle: string, note: string, quantity: string, inCart: boolean, key: string, val: Function}>) => {
      const newArr = []
      snapshot.forEach((item: { name: string, aisle: string, note: string, quantity: string, inCart: boolean, key: string, val: Function}) => {
        newArr.push({
          name: item.val().name,
          aisle: item.val().aisle,
          quantity: item.val().quantity,
          note: item.val().note,
          inCart: item.val().inCart || false,
          id: item.key,
        })
      });
      this.setState({ items: newArr })
    });
  }

  removeItem = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
    this.itemsRef.child(item.id).remove()
  }

  resetItemState = ():void => {
    this.setState({ name: '' })
    this.setState({ aisle: '' });
    this.setState({ note: '' });
    this.setState({ quantity: '' });
    this.setState({ id: '' });
  }

  saveChanges = (): void => {
    const { name, aisle, quantity, note, id, inCart } = this.state
    if (!name) {
      Alert.alert(
        'Oops! You must enter in an item name!',
      )
      return
    }
    const newItem = {
      name,
      aisle,
      quantity,
      note,
      inCart,
      id,
    }

    const promise = new Promise((resolve) => {
      resolve(this.itemsRef.child(id).update(newItem))
    })
    promise
     .then((): void => { this.resetItemState() })
     .then((): void => { this.hideEditView() })
     .then((): void => { this.showSaveMicrointeraction() })
     .catch((err: string): void => { throw new Error(err) })
  }

  showAddItemMicrointeraction = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item added to main list.', ToastAndroid.SHORT)
    }
  }

  showAddView = ():void => {
    this.resetItemState()
    this.setState({ showAddView: true })
  }

  showSaveMicrointeraction = (): void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item saved!', ToastAndroid.SHORT)
    }
  }

  sortAlpha = (items: Array<{ name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }>): Array<{ name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }> => {
    const newArr = items.sort((a: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }, b: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
      const first = a.name.toLowerCase()
      const second = b.name.toLowerCase()
      if (first < second) {
        return -1
      }
      if (first > second) {
        return 1
      }
      return 0
    },
    );
    return newArr
  }

  transferItemToMainList = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }): void => {
    const email = cleanUpUserEmail(this.state.userEmail)
    firebase.database().ref(email + '/main').push(item) //eslint-disable-line
    this.showAddItemMicrointeraction()
  }

  render() {
    const { items, showAddView } = this.state
    let itemList
    if (items.length > 0) {
      const sortedItems = this.sortAlpha(items)
      itemList = sortedItems.map((item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
        return (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => { this.transferItemToMainList(item) }}
            >
              <Image
                source={require('../images/plus-icon-small.png')}
                style={styles.addIconSmall}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.removeItem(item) }}
            >
              <Image
                source={require('../images/cancel-circle.png')}
                style={styles.deleteIconSmall}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.editItem(
                item.name,
                item.aisle,
                item.note,
                item.quantity,
                item.id,
                item.inCart,
                )
              }}
            >
              <Image
                source={require('../images/pencil.png')}
                style={styles.editIconSmall}
              />
            </TouchableOpacity>
          </View>
        )
      })
    } else {
      itemList = (
        <View>
          <Text>
            There are no items in your pantry.
            Click on the blue 'plus' button below to start adding items.
          </Text>
        </View>
      )
    }

    return (
      <ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showEditView}
          onRequestClose={this.hideEditView}
        >
          <ScrollView contentContainerStyle={styles.editViewContainer}>
            <Text style={styles.editViewHeadline}>
              Edit Pantry Item: {this.state.name}
            </Text>
            <TextInput
              id="item-input"
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
                onPress={this.hideEditView}
              >
                <Text style={styles.editViewButtonCancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={showAddView}
          onRequestClose={() => { this.setState({ showAddView: false }); }}
        >
          <ScrollView contentContainerStyle={styles.addItemView}>
            <Text style={styles.addItemViewHeadline}>
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
            <View style={styles.addItemViewButtonContainer}>
              <TouchableOpacity
                onPress={this.addItem}
              >
                <Text style={styles.addItemButtonSave}>
                  Add
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.hideAddView}
              >
                <Text style={styles.addItemButtonCancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.isPantryVisible}
          onRequestClose={this.cancelOutOfModal}
        >
          <View style={styles.container}>
            <Text style={styles.headline}>Pantry</Text>
            <ScrollView style={styles.itemList}>
              {itemList}
            </ScrollView>
            <View style={styles.bottomIconContainer}>
              <TouchableOpacity
                onPress={this.cancelOutOfModal}
              >
                <Image
                  source={require('../images/arrow-left.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.showAddView}
              >
                <Image
                  source={require('../images/plus-icon-large.png')}
                  style={styles.addIconLarge}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

}

export default Pantry;
