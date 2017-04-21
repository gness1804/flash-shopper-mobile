import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/NoItemsDisplay-styles';

class NoItemsDisplay extends Component {

  props: {
    showAddItem: Function,
  }

  showAddItem = ():void => {
    this.props.showAddItem()
  }

  render() {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={this.showAddItem}
        >
          <Image
            source={require('../images/cart-plus.png')}
            style={styles.cart}
          />
        </TouchableOpacity>
        <Text
          style={styles.text}
        >
          There are no items on your list. To add an item, tap the "plus" icon near the top of the screen or tap the shopping cart icon just above this message.
        </Text>
      </ScrollView>
    );
  }

}

export default NoItemsDisplay;
