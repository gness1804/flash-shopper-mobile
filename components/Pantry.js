import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';
import styles from '../styles/Pantry-styles';

class Pantry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      showItemView: false,
      name: '',
      aisle: null,
      note: '',
      quantity: null,
      id: null,
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem('pantry')
      .then((items) => {
        const parsedItems = JSON.parse(items)
        if (!Array.isArray(parsedItems)) {
          AsyncStorage.setItem('pantry', JSON.stringify([]))
          return
        }
        return parsedItems // eslint-disable-line
      })
      .then((parsedItems) => { this.setState({ items: parsedItems }) })
      .catch((err) => { throw new Error(err) })
  }

  addItem = () => {
    const { name, aisle, note, quantity } = this.state
    const newItem = {
      name,
      aisle,
      note,
      quantity,
      id: Date.now(),
    }
    this.setState({ items: [
      ...this.state.items,
      newItem,
    ] })
    AsyncStorage.setItem('pantry', JSON.stringify([
      ...this.state.items,
      newItem,
    ]))
    .then(() => { this.setState({ showItemView: false }); })
    .catch((err) => { throw new Error(err) })
  }

  cancelOutOfModal = () => {
    this.props.makePantryInvisible()
  }

  showItemView = () => {
    this.setState({ showItemView: true });
  }

  transferItemToMainList = (item) => {
    this.props.transferItemToMainList(item)
  }

  warnUser = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to navigate away from this view? You will lose any unsaved changes.',
      [
        {
          text: 'OK',
          onPress: this.cancelOutOfModal,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  render() {
    const { items, showItemView } = this.state
    let itemList
    if (items.length > 0) {
      itemList = items.map((item) => {
        return (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => { this.transferItemToMainList(item) }}
            >
              <Image
                source={require('../images/plus-icon-small.png')}
                style={styles.addIconSmall}
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
    return (
      <ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={showItemView}
          onRequestClose={() => { this.setState({ showItemView: false }); }}
        >
          <Text>
            Add Item to Pantry
          </Text>
          <TextInput
            value={this.state.name}
            style={styles.inputField}
            placeholder="Item Name"
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            value={this.state.aisle}
            style={styles.inputField}
            placeholder="Item Aisle"
            onChangeText={aisle => this.setState({ aisle })}
          />
          <TextInput
            value={this.state.note}
            style={styles.inputField}
            placeholder="Item Note"
            onChangeText={note => this.setState({ note })}
          />
          <TextInput
            value={this.state.quantity}
            style={styles.inputField}
            placeholder="Item Quantity"
            onChangeText={quantity => this.setState({ quantity })}
          />
          <TouchableOpacity
            onPress={this.addItem}
          >
            <Text>
              Add
            </Text>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.isPantryVisible}
          onRequestClose={this.warnUser}
        >
          <View style={styles.container}>
            <Text style={styles.headline}>Pantry</Text>
            <ScrollView style={styles.itemList}>
              {itemList}
            </ScrollView>
            <View style={styles.bottonIconContainer}>
              <TouchableOpacity
                onPress={this.cancelOutOfModal}
              >
                <Image
                  source={require('../images/arrow-left.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.showItemView}
              >
                <Image
                  source={require('../images/plus-icon-large.png')}
                  style={styles.addIconLarge}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

}

export default Pantry;
