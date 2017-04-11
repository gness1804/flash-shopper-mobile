import React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Alert,
} from 'react-native';
import styles from './styles/App-styles';
import Main from './components/Main';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
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

  render() {
    const { items } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Flash Shopper
        </Text>
        <Text>
          {items.length ?
            <Text>You have {items.length} items on your list.</Text>
            :
            <Text>There are no items on your list!</Text>}
        </Text>
        <Main
          addNewItem={this.addNewItem.bind(this)}
          items={items}
          deleteItem={this.deleteItem}
          sortByAisle={this.sortByAisle.bind(this)}
          sortAlpha={this.sortAlpha.bind(this)}
          deleteAllItems={this.deleteAllItems.bind(this)}
          saveChanges={this.saveChanges.bind(this)}
        />
      </View>
    );
  }
}
