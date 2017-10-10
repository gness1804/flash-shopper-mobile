// @flow

import React, { Component } from 'react';
import {
  TextInput,
  Text,
  View,
} from 'react-native';
import Main from './Main';
import styles from '../styles/Search-styles';

class Search extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      searchString: '',
      filteredItems: [],
    }
  }

  state: {
    searchString: string,
    filteredItems: Array<Object>,
  };

  props: {
    items: Array<Object>,
    deleteItem: Function,
    saveChanges: Function,
    toggleInCart: Function,
    showAddItem: Function,
    addItemToCart: Function,
  };

  deleteItem = (item: Object): void => {
    this.props.deleteItem(item)
  }

  doSearch = (searchString: string): void => {
    const { items } = this.props;
    const filteredItems = [];
    this.setState({ searchString });
    const keyTerm = searchString.toLowerCase();

    for (let i = 0; i < items.length; i++) {
      if (items[i].name.toLowerCase().includes(keyTerm)) {
        filteredItems.push(items[i]);
      }
    }

    this.setState({ filteredItems });
  }

  saveChanges = (name: string, aisle: string, quantity: string, note: string, id: number, inCart: boolean): void => {
    this.props.saveChanges(name, aisle, quantity, note, id, inCart);
  }

  toggleInCart = (item: Object): void => {
    this.props.toggleInCart(item);
  }

  showAddItem = (): void => {
    this.props.showAddItem();
  }

  addItemToCart = (item: Object): void => {
    this.props.addItemToCart(item);
  }

  render() {
    const { items } = this.props;
    const { searchString, filteredItems } = this.state;
    let itemsToSearch;

    if (searchString) {
      itemsToSearch = filteredItems;
    } else {
      itemsToSearch = items;
    }

    return (
      <View style={styles.editViewContainer}>
        <Text style={styles.editViewHeadline}>Search</Text>
        <TextInput
          id="search-input"
          value={searchString || ''}
          style={styles.inputField}
          placeholder="Search"
          onChangeText={search => this.doSearch(search)}
        />
        <Main
          items={itemsToSearch}
          deleteItem={this.deleteItem}
          saveChanges={this.saveChanges.bind(this)}
          toggleInCart={this.toggleInCart.bind(this)}
          showAddItem={this.showAddItem.bind(this)}
          addItemToCart={this.addItemToCart.bind(this)}
        />
      </View>
    );
  }
}

export default Search
