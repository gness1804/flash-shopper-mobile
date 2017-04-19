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

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      showAddItem: false,
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem('items')
      .then((items) => {
        const parsedItems = JSON.parse(items)
        if (!Array.isArray(parsedItems)) {
          AsyncStorage.setItem('items', JSON.stringify([]))
          return
        }
        return parsedItems // eslint-disable-line
      })
      .then((parsedItems) => { this.setState({ items: parsedItems }) })
      .catch((err) => { throw new Error(err) })
  }

  addNewItem = (newItem) => {
    this.setState({ items: [
      ...this.state.items,
      newItem,
    ] });
    AsyncStorage.setItem('items', JSON.stringify([
      ...this.state.items,
      newItem,
    ]))
  }

  countItemsInCart = () => {
    let count = 0
    this.state.items.forEach((i) => {
      if (i.inCart) {
        count++
      }
    });
    return count
  }

  deleteAllInCart = () => {
    Alert.alert(
      'Warning',
      'Do you really want to delete all items in your cart? This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: () => {
            const newArr = this.state.items.filter((i) => {
              return !i.inCart
            })
            AsyncStorage.setItem('items', JSON.stringify(
              newArr,
            ))
            .then(() => { this.setState({ items: newArr }) })
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  deleteAllItems = () => {
    Alert.alert(
      'Warning',
      'You are about to delete all items! This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.setItem('items', JSON.stringify(
               [],
             ))
             .then(() => { this.setState({ items: [] }) })
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  deleteItem = (id) => {
    Alert.alert(
     'Warning',
     'You are about to delete this item! This cannot be undone!',
      [
        {
          text: 'OK',
          onPress: () => {
            const newArr = this.state.items.filter((item) => {
              return item.id !== id
            })
            AsyncStorage.setItem('items', JSON.stringify(
               newArr,
             ))
             .then(() => { this.setState({ items: newArr }) })
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
   )
  }

  checkIfItemIsAlreadyThere = (item) => {
    this.state.items.forEach((i) => {
      if (i.id === item.id) {
        Alert.alert(
          'Oops! This item is already in your main list.',
        )
      }
    });
  }

  hideAddItem = () => {
    this.setState({ showAddItem: false })
  }

  saveChanges = (name, aisle, quantity, note, id) => {
    const newArr = this.state.items.filter((item) => {
      return item.id !== id
    })
    newArr.push({
      name,
      aisle,
      quantity,
      note,
      id,
    })
    AsyncStorage.setItem('items', JSON.stringify(
       newArr,
     ))
     .then(() => { this.setState({ items: newArr }) })
  }

  showAddItem = () => {
    this.setState({ showAddItem: true })
  }

  showAddedItemMicrointeraction = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item added to main list.', ToastAndroid.SHORT)
    }
  }

  sortAlpha = () => {
    const newArr = this.state.items.sort((a, b) => {
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

  sortByAisle = () => {
    const newArr = this.state.items.sort((a, b) => { return a.aisle - b.aisle });
    this.setState({ items: newArr });
  }

  toggleInCart = (id) => {
    const newArr = this.state.items
    newArr.forEach((i) => {
      if (i.id === id) {
        Object.assign(i, { inCart: !i.inCart })
      }
    });
    AsyncStorage.setItem('items', JSON.stringify(
       newArr,
     ))
     .then(() => { this.setState({ items: newArr }) })
  }

  transferItemToMainList = (item) => {
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
    const { items } = this.state
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showAddItem}
          onRequestClose={this.hideAddItem}
        >
          <AddItem />
        </Modal>
        <Text style={styles.headline}>
          Flash Shopper
        </Text>
        <View style={styles.upperMessageContainer}>
          {items.length ?
            <Text style={styles.itemNumberMessage}>
              You have {items.length} item(s) on your list. &nbsp;
            </Text>
            :
            <Text style={styles.itemNumberMessage}>
              There are no items on your list!
              Add an item by typing into the input fields and then tapping Submit.
            </Text>}
          <Text style={styles.cartNumberMessage}>
            There are {this.countItemsInCart()} item(s) in your cart.
          </Text>
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
          <View>
            <Button
              title="Delete All Items In Cart"
              onPress={this.deleteAllInCart}
            />
          </View>
        </View>
        <Main
          addNewItem={this.addNewItem.bind(this)}
          items={items}
          deleteItem={this.deleteItem}
          sortByAisle={this.sortByAisle.bind(this)}
          sortAlpha={this.sortAlpha.bind(this)}
          deleteAllItems={this.deleteAllItems.bind(this)}
          saveChanges={this.saveChanges.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
          toggleInCart={this.toggleInCart.bind(this)}
        />
      </View>
    );
  }
}
