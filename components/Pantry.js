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
          <View key={item.id}>
            <Text>{item.name}</Text>
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
          onRequestClose={this.warnUser}
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
            <ScrollView>
              {itemList}
            </ScrollView>
            <View style={styles.bottonIconContainer}>
              <TouchableOpacity
                onPress={this.warnUser}
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
                  source={require('../images/circle-with-plus.png')}
                  style={styles.addIcon}
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
