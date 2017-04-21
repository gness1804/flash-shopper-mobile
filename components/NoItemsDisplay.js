import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import styles from '../styles/NoItemsDisplay-styles';

const NoItemsDisplay = () => {
  return (
    <ScrollView>
      <Image
        source={require('../images/cart-plus.png')}
        style={styles.cart}
      />
      <Text
        style={styles.text}
      >
        There are no items on your list. To add an item, click the "plus" icon near the top of the screen.
      </Text>
    </ScrollView>
  );
}

export default NoItemsDisplay;
