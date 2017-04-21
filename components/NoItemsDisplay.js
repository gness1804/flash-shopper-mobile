import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

const NoItemsDisplay = () => {
  return (
    <ScrollView>
      <Image
        source={require('../images/cart-plus.png')}

      />
      <Text>There are no items on your list. To add an item, click the "plus" icon near the top of the screen.</Text>
    </ScrollView>
  );
}

export default NoItemsDisplay;
