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
import PantryItem from './PantryItem';
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
    isPantry: boolean,
    transferItemToMainList: Function,
    editItem: Function,
    removeItem: Function,
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

  editItem = (name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean): void => {
    this.props.editItem(name, aisle, note, quantity, id, inCart);
  }

  hideBottomModal = (): void => {
    this.setState({ showBottomModal: false });
  }

  hideSearch = (): void => {
    this.props.hideSearch();
  }

  removeItem = (item: Object): void => {
    this.props.removeItem(item);
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

  transferItemToMainList = (item: Object): void => {
    this.props.transferItemToMainList(item);
  }

  addItemToCart = (item: Object): void => {
    this.props.addItemToCart(item);
  }

  render() {
    const { items, name, isPantry } = this.props;
    const { searchString, filteredItems, showBottomModal } = this.state;
    let itemsToSearch;
    let listElement;

    if (searchString) {
      itemsToSearch = filteredItems;
    } else {
      itemsToSearch = items;
    }

    if (isPantry) {
      listElement = itemsToSearch.map((item: { name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean }) => {
        return (
          <PantryItem
            key={item.id}
            item={item}
            transferItemToMainList={this.transferItemToMainList.bind(this)}
            removeItem={this.removeItem.bind(this)}
            editItem={this.editItem.bind(this)}
            {...item}
          />
        )
      })
    } else {
      listElement = (<Main
        items={itemsToSearch}
        deleteItem={this.deleteItem}
        saveChanges={this.saveChanges.bind(this)}
        toggleInCart={this.toggleInCart.bind(this)}
        showAddItem={this.showAddItem.bind(this)}
        addItemToCart={this.addItemToCart.bind(this)}
      />)
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
        {listElement}
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
