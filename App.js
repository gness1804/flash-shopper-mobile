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
import styles from './styles/App-styles';
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
    }
  }

  state: {
  items: Array<{ name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean}>,
  showAddItem: boolean,
  isPantryVisible: boolean,
}

  componentWillMount = (): void => {
    AsyncStorage.getItem('items')
      .then((items: string) => {
        const parsedItems = JSON.parse(items)
        if (!Array.isArray(parsedItems)) {
          AsyncStorage.setItem('items', JSON.stringify([]))
          return
        }
        return parsedItems // eslint-disable-line
      })
      .then((parsedItems: Array<{ name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean}>):void => { this.setState({ items: parsedItems }) }) // eslint-disable-line
      .catch((err: string):void => { throw new Error(err) }) // eslint-disable-line
  }

  addNewItem = (newItem: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }): void => { // eslint-disable-line
    this.setState({ items: [
      ...this.state.items,
      newItem,
    ] });
    AsyncStorage.setItem('items', JSON.stringify([
      ...this.state.items,
      newItem,
    ]))
    .then(():void => { this.showAddedItemMicrointeraction() })
  }

  checkIfItemIsAlreadyThere = (item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }):void => {
    this.state.items.forEach((i: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }):void => {
      if (i.id === item.id) {
        Alert.alert(
          'Oops! This item is already in your main list.',
        )
      }
    });
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
            const newArr = this.state.items.filter((item: { name: string, aisle: string, note: string, quantity: string, id: number, inCart: boolean }) => {
              return item.id !== id
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

  goToPantry = (): void => {
    this.setState({ isPantryVisible: true })
  }

  hideAddItem = ():void => {
    this.setState({ showAddItem: false })
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
    const { items, isPantryVisible } = this.state
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
          />
        </Modal>

        <Pantry
          isPantryVisible={isPantryVisible}
          makePantryInvisible={this.makePantryInvisible.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
        />

        <Text style={styles.headline}>
          Flash Shopper
        </Text>
        <View style={styles.upperMessageContainer}>
          {items.length ?
            <Text style={styles.itemNumberMessage}>
              You have {items.length} item(s) on your list. There are {this.countItemsInCart()} item(s) in your cart.
            </Text>
            :
            <Text style={styles.itemNumberMessage}>
              There are no items on your list! To add an item, click on the "plus" button.
            </Text>}
        </View>
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            onPress={this.showAddItem}
          >
            <Image
              source={require('./images/plus-icon-header.png')}
              style={styles.plusIconHeader}
            />
          </TouchableOpacity>
          <View style={styles.button}>
            <Button
              title="Sort by Aisle"
              disabled={this.state.items.length === 0}
              onPress={() => { this.sortByAisle() }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Sort Alpha"
              disabled={this.state.items.length === 0}
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
          <TouchableOpacity
            onPress={() => { this.deleteAllInCart() }}
            disabled={this.checkItemsInCart()}
          >
            <Image
              source={require('./images/delete-cart.png')}
              style={styles.deleteCartIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.pantryButton}>
          <Button
            title="Go to Pantry"
            onPress={() => { this.goToPantry() }}
          />
        </View>

        <Main
          items={items}
          deleteItem={this.deleteItem}
          saveChanges={this.saveChanges.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
          toggleInCart={this.toggleInCart.bind(this)}
        />
      </View>
    );
  }
}
