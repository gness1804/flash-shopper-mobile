import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import styles from './styles/App-styles';
import Main from './components/Main';

export default class App extends React.Component {
  constructor(){
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
        return parsedItems
      })
      .then((parsedItems) => {this.setState({ items: parsedItems })})
      .catch((err) => { throw new Error(err) })
  }

  addNewItem(newItem){
   this.setState({ items: [
     ...this.state.items,
     newItem
   ] });
   AsyncStorage.setItem('items', JSON.stringify([
     ...this.state.items,
     newItem
   ]))
 }

 deleteAllItems(){
   this.setState({ items: [] });
 }

 deleteItem = (id) => {
   let newArr = this.state.items.filter((item) => {
       return item.id !== id
     })
     AsyncStorage.setItem('items', JSON.stringify(
       newArr
     ))
     .then(() => {this.setState({ items: newArr })})

 }

 sortAlpha = () => {
    let newArr = this.state.items.sort((a, b) => {
      const first = a.name.toLowerCase()
      const second = b.name.toLowerCase()
      if (first < second) {
        return -1
      }
      if (first > second) {
        return 1
      }
      return 0
      }
    );
    this.setState({ items: newArr });
  }

  sortByAisle(){
    let newArr = this.state.items.sort((a, b) => {return a.aisle - b.aisle });
    this.setState({ items: newArr });
  }

  render() {
     const { items } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Flash Shopper
        </Text>
        <Text>{items.length ? <Text>You have {items.length} items on your list.</Text> : <Text>There are no items on your list!</Text>}</Text>
        <Main
          addNewItem={this.addNewItem.bind(this)}
          items={items}
          deleteItem={this.deleteItem}
          sortByAisle={this.sortByAisle.bind(this)}
          sortAlpha={this.sortAlpha.bind(this)}
          deleteAllItems={this.deleteAllItems.bind(this)}
          >
        </Main>
      </View>
    );
  }
}
