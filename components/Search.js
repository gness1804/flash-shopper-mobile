// @flow

import React, { Component } from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Main from './Main';
import styles from '../styles/Search-styles';

class Search extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      searchString: '',
      filteredItems: [],
      showBottomModal: true,
    }
  }

  state: {
    searchString: string,
    filteredItems: Array<Object>,
    showBottomModal: boolean,
  };

  props: {
    items: Array<Object>,
    name: string,
    deleteItem: Function,
    saveChanges: Function,
    toggleInCart: Function,
    showAddItem: Function,
    addItemToCart: Function,
    hideSearch: Function,
  };

  deleteItem = (item: Object): void => {
    this.props.deleteItem(item)
  }

  doSearch = (searchString: string): void => {
    const { items } = this.props;
    const filteredItems = [];
    this.setState({ searchString });

    if (searchString.length > 0) {
      this.hideBottomModal();
    } else {
      this.showBottomModal();
    }

    const keyTerm = searchString.toLowerCase();

    for (let i = 0; i < items.length; i++) {
      if (items[i].name.toLowerCase().includes(keyTerm)) {
        filteredItems.push(items[i]);
      }
    }

    this.setState({ filteredItems });
  }

  hideBottomModal = (): void => {
    this.setState({ showBottomModal: false });
  }

  hideSearch = (): void => {
    this.props.hideSearch();
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

  showBottomModal = (): void => {
    this.setState({ showBottomModal: true });
  }

  addItemToCart = (item: Object): void => {
    this.props.addItemToCart(item);
  }

  render() {
    const { items, name } = this.props;
    const { searchString, filteredItems, showBottomModal } = this.state;
    let itemsToSearch;

    if (searchString) {
      itemsToSearch = filteredItems;
    } else {
      itemsToSearch = items;
    }

    return (
      <View style={styles.editViewContainer}>
        <Text style={styles.editViewHeadline}>Search {name}</Text>
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
        {showBottomModal && <View style={styles.bottomIconContainer}>
          <TouchableOpacity
            onPress={this.hideSearch}
          >
            <Image
              source={require('../images/arrow-left.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}

export default Search
