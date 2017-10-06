// @flow

import React, { Component } from 'react';
import {
  TextInput,
  View,
} from 'react-native';
import Main from './Main';
//import styles...

class Search extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      search: '',
    }
  }

  state: {
    search: string,
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
    return (
      <View>
        <TextInput
          id="search-input"
          value={this.state.search || ''}
          placeholder="Search"
          onChangeText={search => this.setState({ search })}
        />
        <Main
          items={items}
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
