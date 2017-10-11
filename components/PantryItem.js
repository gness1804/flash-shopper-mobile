// @flow
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import styles from '../styles/PantryItem-styles';

class PantryItem extends Component {

  props: {
    item: Object,
    name: string,
    aisle: string,
    note: string,
    quantity: string,
    id: string,
    inCart: boolean,
    transferItemToMainList: Function,
    removeItem: Function,
    editItem: Function,
  }

  editItem = (name: string, aisle: string, note: string, quantity: string, id: string, inCart: boolean): void => {
    this.props.editItem(name, aisle, note, quantity, id, inCart);
  }

  removeItem = (item: Object): void => {
    this.props.removeItem(item);
  }

  transferItemToMainList = (item: Object): void => {
    this.props.transferItemToMainList(item);
  }

  render() {
    const { item, name, aisle, note, quantity, id, inCart } = this.props;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          onPress={() => { this.transferItemToMainList(item) }}
        >
          <Image
            source={require('../images/plus-icon-small.png')}
            style={styles.addIconSmall}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { this.removeItem(item) }}
        >
          <Image
            source={require('../images/cancel-circle.png')}
            style={styles.deleteIconSmall}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.editItem(
              name,
              aisle,
              note,
              quantity,
              id,
              inCart,
            )
          }}
        >
          <Image
            source={require('../images/pencil.png')}
            style={styles.editIconSmall}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default PantryItem;
