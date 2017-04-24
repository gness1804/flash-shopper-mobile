// @flow

import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Alert,
  ToastAndroid,
  Platform,
  Button,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { _ , some } from 'lodash'; // eslint-disable-line
import firebaseApp from './firebaseConfig';
import styles from './styles/App-styles';
import commonElements from './styles/CommonElements';
import Main from './components/Main';
import AddItem from './components/AddItem';
import Pantry from './components/Pantry';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
      showAddItem: false,
      isPantryVisible: false,
      showButtons: true,
    }
    this.itemsRef = firebaseApp.database().ref()
  }

  state: {
  items: Array<{ name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean}>,
  showAddItem: boolean,
  isPantryVisible: boolean,
  showButtons: boolean,
}

  componentDidMount = () => {
    this.listenForItems(this.itemsRef)
  }

  addNewItem = (newItem: { name: string, aisle: string, note: string, quantity: string, inCart: boolean }): void => { // eslint-disable-line
    const promise = new Promise((resolve, reject) => {
      resolve(this.itemsRef.push(
        newItem,
      ))
      // reject(console.error('There was an error.')) // eslint-disable-line
    });
    promise
            .then(() => { this.showAddedItemMicrointeraction() })
            // .catch((err) => { throw new Error(err) })
  }

  checkItemsInCart = (): boolean => {
    const test = this.countItemsInCart()
    let result
    if (test > 0) {
      result = false
    } else {
      result = true
    }
    return result
  }

  checkForDuplicateNames = (name: string): boolean => {
    const { items } = this.state
    const test = _.some(items, { name })
    let result
    if (test) {
      result = true
    } else {
      result = false
    }
    return result
  }

  countItemsInCart = (): number => {
    let count = 0
    this.state.items.forEach((i: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }):void => {
      if (i.inCart) {
        count++
      }
    });
    return count
  }

  deleteAllInCart = ():void => {
    Alert.alert(
      'Warning',
      'Do you really want to delete all items in your cart? This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: ():void => {
            const newArr = this.state.items.filter((i: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => {
              return !i.inCart
            })
            AsyncStorage.setItem('items', JSON.stringify(
              newArr,
            ))
            .then(():void => { this.setState({ items: newArr }) })
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  deleteAllItems = ():void => {
    Alert.alert(
      'Warning',
      'You are about to delete all items! This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: ():void => {
            AsyncStorage.setItem('items', JSON.stringify(
               [],
             ))
             .then(():void => { this.setState({ items: [] }) })
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  deleteItem = (id: number) => {
    Alert.alert(
     'Warning',
     'You are about to delete this item! This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: ():void => {
            this.itemsRef.child(id).remove()
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
   )
  }

  goToPantry = (): void => {
    this.setState({ isPantryVisible: true })
  }

  hideAddItem = ():void => {
    this.setState({ showAddItem: false })
  }

  hideButtons = (): void => {
    this.setState({ showButtons: false })
  }

  listenForItems = (itemsRef):void => {
    itemsRef.on('value', (snapshot: Array<{ name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean}>) => {
      const newArr = []
      snapshot.forEach((item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => {
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

  makePantryInvisible = (): void => {
    this.setState({ isPantryVisible: false });
  }

  saveChanges = (name: string, aisle: string, quantity: string, note: string, id: number, inCart: boolean):void => {
    const newArr = this.state.items.filter((item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => {
      return item.id !== id
    })
    newArr.push({
      name,
      aisle,
      quantity,
      note,
      id,
      inCart,
    })
    AsyncStorage.setItem('items', JSON.stringify(
       newArr,
     ))
     .then(():void => { this.setState({ items: newArr }) })
  }

  showAddItem = ():void => {
    this.setState({ showAddItem: true })
  }

  showAddedItemMicrointeraction = ():void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item added to main list.', ToastAndroid.SHORT)
    }
  }

  showButtons = (): void => {
    this.setState({ showButtons: true })
  }

  sortAlpha = ():void => {
    const newArr = this.state.items.sort((a: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }, b: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => {
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
    this.setState({ items: newArr });
  }

  sortByAisle = ():void => {
    const newArr = this.state.items.sort((a: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }, b: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => { return parseInt(a.aisle, 10) - parseInt(b.aisle, 10) });
    this.setState({ items: newArr });
  }

  toggleInCart = (id: number): void => {
    const newArr = this.state.items
    newArr.forEach((i: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }):void => {
      if (i.id === id) {
        Object.assign(i, { inCart: !i.inCart })
      }
    });
    AsyncStorage.setItem('items', JSON.stringify(
       newArr,
     ))
     .then(():void => { this.setState({ items: newArr }) })
  }

  transferItemToMainList = (item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }): void => {
    const { items } = this.state
    const test = _.some(items, { id: item.id })
    if (test) {
      Alert.alert(
        'Oops! This item is already in your main list.',
      )
      return
    }
    this.addNewItem(item)
    this.showAddedItemMicrointeraction()
  }

  render() {
    const { items, isPantryVisible, showButtons } = this.state
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showAddItem}
          onRequestClose={this.hideAddItem}
        >
          <AddItem
            addNewItem={this.addNewItem.bind(this)}
            hideAddItem={this.hideAddItem.bind(this)}
            checkForDuplicateNames={this.checkForDuplicateNames.bind(this)}
          />
        </Modal>

        <Pantry
          isPantryVisible={isPantryVisible}
          makePantryInvisible={this.makePantryInvisible.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
        />

        <View style={styles.header}>
          <Text style={styles.headline}>
          Flash Shopper
        </Text>

          {showButtons ? <View style={styles.masterButtonsContainer}>
            <TouchableOpacity
              onPress={this.showAddItem}
            >
              <Image
                source={require('./images/plus-icon-header.png')}
                style={styles.plusIconHeader}
              />
            </TouchableOpacity>

            <View style={styles.headerButtonsContainer}>
              <View style={styles.button}>
                <Button
                  title="Sort by Aisle"
                  color={commonElements.core.button.color}
                  disabled={this.state.items.length < 2}
                  onPress={() => { this.sortByAisle() }}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Sort Alpha"
                  color={commonElements.core.button.color}
                  disabled={this.state.items.length < 2}
                  onPress={() => { this.sortAlpha() }}
                />
              </View>
              <TouchableOpacity
                onPress={() => { this.deleteAllItems() }}
                disabled={this.state.items.length === 0}
              >
                <Image
                  source={require('./images/delete_forever.png')}
                  style={styles.deleteDBIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.pantryButton}>
              <Button
                title="Go to Pantry"
                color={commonElements.core.button.color}
                onPress={() => { this.goToPantry() }}
              />
            </View>
          </View>
          :
          <View style={styles.cartButtonsMasterContainer}>
            <View style={styles.cartCounterButtonContainer}>
              <Image
                source={require('./images/list.png')}
                style={styles.cartCounterButton}
              />
              <Text>{this.state.items.length}</Text>
            </View>
            <View style={styles.cartCounterButtonContainer}>
              <Image
                source={require('./images/cart-arrow-down.png')}
                style={styles.cartCounterButton}
              />
              <Text>{this.countItemsInCart()}</Text>
            </View>
            <View style={styles.cartCounterButtonContainer}>
              <TouchableOpacity
                onPress={() => { this.deleteAllInCart() }}
                disabled={this.checkItemsInCart()}
              >
                <Image
                  source={require('./images/delete-cart.png')}
                  style={styles.deleteCartButton}
                />
              </TouchableOpacity>
            </View>

          </View>
          }

        </View>

        {showButtons ? <TouchableOpacity
          onPress={() => { this.hideButtons() }}
        >
          <Image
            source={require('./images/circle-up.png')}
            style={styles.toggleButtonViewIcon}
          />
        </TouchableOpacity>
        :
        <TouchableOpacity
          onPress={() => { this.showButtons() }}
        >
          <Image
            source={require('./images/circle-down.png')}
            style={styles.toggleButtonViewIcon}
          />
        </TouchableOpacity>}

        <Main
          items={items}
          deleteItem={this.deleteItem}
          saveChanges={this.saveChanges.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
          toggleInCart={this.toggleInCart.bind(this)}
          showAddItem={this.showAddItem.bind(this)}
        />

      </View>
    );
  }
}
