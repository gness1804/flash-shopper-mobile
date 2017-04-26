// @flow

import React from 'react';
import {
  Text,
  View,
  Alert,
  ToastAndroid,
  Platform,
  Button,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { _ , some } from 'lodash'; // eslint-disable-line
import * as firebase from 'firebase';
import firebaseApp from './firebaseConfig';
import styles from './styles/App-styles';
import commonElements from './styles/CommonElements';
import Main from './components/Main';
import AddItem from './components/AddItem';
import Pantry from './components/Pantry';
import AuthScreen from './components/AuthScreen';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
      showAddItem: false,
      isPantryVisible: false,
      showButtons: true,
      showAuthScreen: true,
      userEmail: '',
      userId: '',
    }
    this.itemsRef = firebaseApp.database().ref(`/user/${this.state.userId}`)
  }

  state: {
  items: Array<{ name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean, location: Array<string> }>,
  showAddItem: boolean,
  isPantryVisible: boolean,
  showButtons: boolean,
  showAuthScreen: boolean,
  userEmail: string,
  userId: string,
}

  componentDidMount = (): void => {
    this.initializeApp()
  }

  itemsRef: Object

  addInMain = (location: Array<string>): Array<string> => {
    let result
    if (location.includes('pantry')) {
      result = ['main', 'pantry']
    } else {
      result = ['main']
    }
    return result
  }

  addNewItem = (newItem: { name: string, aisle: string, note: string, quantity: string, inCart: boolean, location: Array<string> }): void => { // eslint-disable-line
    const amendedItem = Object.assign(newItem, { location: this.addInMain(newItem.location) })
    const promise = new Promise((resolve) => {
      resolve(this.itemsRef.push(
        amendedItem,
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

  countItemsInCart = (): number => {
    let count = 0
    this.state.items.forEach((i: { name: string, aisle: string, note: string, quantity: string, inCart: boolean }):void => {
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
            this.state.items.forEach((item) => {
              if (item.inCart) {
                const newItem = Object.assign(item, { location: this.filterOutMain(item.location) })
                this.itemsRef.child(item.id).update(newItem)
              }
            });
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
            this.state.items.forEach((item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean, location: Array<string> }) => {
              const newItem = Object.assign(item, { location: this.filterOutMain(item.location) })
              this.itemsRef.child(item.id).update(newItem)
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  deleteItem = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean, location: Array<string> }) => {
    Alert.alert(
     'Warning',
     'You are about to delete this item! This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: ():void => {
            const newItem = Object.assign(
              item,
              { location: this.filterOutMain(item.location) },
              { inCart: false },
            )
            this.itemsRef.child(item.id).update(newItem)
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
   )
  }

  filterOutMain = (location: Array<string>): Array<string> => {
    let result
    if (location.includes('pantry')) {
      result = ['pantry']
    } else {
      result = ['none']
    }
    return result
  }

  goToPantry = (): void => {
    this.setState({ isPantryVisible: true })
  }

  hideAddItem = ():void => {
    this.setState({ showAddItem: false })
  }

  hideAuthScreen = ():void => {
    this.setState({ showAuthScreen: false })
  }

  hideButtons = (): void => {
    this.setState({ showButtons: false })
  }

  informUser = ():void => {
    Alert.alert(
      'Warning',
      'You must sign up or log in to proceed.',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  initializeApp = ():void => {
    firebase.auth().onAuthStateChanged((user: Object) => {
      if (user) {
        this.setState({ userEmail: user.email })
        this.setState({ userId: user.uid })
        this.hideAuthScreen()
        this.listenForItems(this.itemsRef)
      }
    })
  }

  listenForItems = (itemsRef: Object):void => {
    itemsRef.on('value', (snapshot: Array<{ name: string, aisle: string, note: string, quantity: string, inCart: boolean, location: Array<string>, key: string, val: Function}>) => {
      const newArr = []
      snapshot.forEach((item: { name: string, aisle: string, note: string, quantity: string, inCart: boolean, location: Array<string>, key: string, val: Function}) => {
        if (item.val().location.includes('none')) {
          this.itemsRef.child(item.key).remove()
        }
        if (item.val().location.includes('main')) {
          newArr.push({
            name: item.val().name,
            aisle: item.val().aisle,
            quantity: item.val().quantity,
            note: item.val().note,
            inCart: item.val().inCart || false,
            location: item.val().location,
            id: item.key,
          })
        }
      });
      this.setState({ items: newArr })
    });
  }

  logOut = ():void => {
    Alert.alert(
      'Warning',
      'Are you sure you want to log out?',
      [
        {
          text: 'Yes',
          onPress: () => {
            firebase.auth().signOut()
            this.showAuthScreen()
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  makePantryInvisible = (): void => {
    this.setState({ isPantryVisible: false });
  }

  saveChanges = (name: string, aisle: string, quantity: string, note: string, id: string, inCart: boolean, location: Array<string>):void => {
    const newItem = {
      name,
      aisle,
      quantity,
      note,
      inCart,
      id,
      location,
    }
    this.itemsRef.child(id).update(newItem)
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

  showAuthScreen = ():void => {
    this.setState({ showAuthScreen: true })
  }

  sortAlpha = ():void => {
    const newArr = this.state.items.sort((a: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }, b: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
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
    const newArr = this.state.items.sort((a: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }, b: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => { return parseInt(a.aisle, 10) - parseInt(b.aisle, 10) });
    this.setState({ items: newArr });
  }

  toggleInCart = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean, location: Array<string> }): void => {
    const newItem = Object.assign(item, { inCart: !item.inCart })
    this.itemsRef.child(item.id).update(newItem)
  }

  transferItemToMainList = (item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean, location: Array<string> }): void => {
    this.addNewItem(item)
    this.showAddedItemMicrointeraction()
  }

  render() {
    const { items, isPantryVisible, showButtons, userEmail } = this.state
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showAuthScreen}
          onRequestClose={this.informUser}
        >
          <AuthScreen />
        </Modal>

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

        <View style={styles.header}>
          <Text style={styles.headline}>
          Flash Shopper
        </Text>

          {showButtons ? <View style={styles.masterButtonsContainer}>
            <View style={styles.authContainer}>
              <Text style={styles.loggedInAsText}>
              Logged in as <Text style={styles.loggedInAsTextSpan}>{userEmail}</Text>
              </Text>
              <Button
                title="Log Out"
                color="rgb(233, 73, 88)"
                onPress={this.logOut}
              />
            </View>

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
