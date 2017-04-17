import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Platform,
} from 'react-native';
import Pantry from './Pantry';
import styles from '../styles/Main-styles';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      aisle: null,
      note: '',
      quantity: null,
      id: null,
      tempName: '',
      tempAisle: null,
      tempNote: '',
      tempQuantity: null,
      tempId: null,
      showEditView: false,
      isPantryVisible: false,
    }
  }

  cancelOutOfModal = () => {
    this.clearText()
    this.setState({ showEditView: false })
    this.resetTempStates()
  }

  createItem = () => {
    const newItem = {
      name: this.state.name,
      aisle: this.state.aisle,
      note: this.state.note,
      quantity: this.state.quantity,
      id: Date.now(),
      inCart: false,
    };
    this.props.addNewItem(newItem);
    this.setState(this.state)
    this.setState({ name: '' })
    this.clearText('itemInput', 'aisleInput', 'noteInput', 'quantityInput');
  }

  clearText = () => {
    this.state.name = ''
    this.state.aisle = ''
    this.state.note = ''
    this.state.quantity = ''
    this.state.id = null
  }

  deleteAllItems = () => {
    this.props.deleteAllItems();
  }

  deleteItem = (id) => {
    this.props.deleteItem(id);
  }

  editItem = (name, aisle, note, quantity, id) => {
    this.setState({ name });
    this.setState({ aisle });
    this.setState({ note });
    this.setState({ quantity });
    this.setState({ id });
    this.setState({ tempName: name });
    this.setState({ tempAisle: aisle });
    this.setState({ tempNote: note });
    this.setState({ tempQuantity: quantity });
    this.setState({ tempId: id });
    this.setState({ showEditView: true })
  }

  goToPantry = () => {
    this.setState({ isPantryVisible: true })
  }

  makePantryInvisible = () => {
    this.setState({ isPantryVisible: false });
  }

  resetTempStates = () => {
    this.setState({ tempName: '' });
    this.setState({ tempAisle: null });
    this.setState({ tempNote: '' });
    this.setState({ tempQuantity: null });
    this.setState({ tempId: null });
  }

  saveChanges = () => {
    const { name, aisle, quantity, note, id } = this.state
    if (!name) {
      Alert.alert(
        'Oops! You must enter in an item name!',
      )
      return
    }
    this.props.saveChanges(name, aisle, quantity, note, id)
    this.clearText()
    this.setState({ showEditView: false })
    this.showSaveMicrointeraction()
  }

  showSaveMicrointeraction = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Item saved!', ToastAndroid.SHORT)
    }
  }

  sortByAisle = () => {
    this.props.sortByAisle();
  }

  sortAlpha = () => {
    this.props.sortAlpha();
  }

  toggleInCart = (id) => {
    this.props.toggleInCart(id)
  }

  transferItemToMainList = (item) => {
    this.props.transferItemToMainList(item)
  }

  warnUser = () => {
    if (this.state.name !== this.state.tempName
    || this.state.aisle !== this.state.tempAisle
    || this.state.note !== this.state.tempNote
    || this.state.quantity !== this.state.tempQuantity) {
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
    } else {
      this.cancelOutOfModal()
    }
  }

  render() {
    const { items } = this.props

    let itemsDisplay;

    if (items.length > 0) {
      itemsDisplay = items.map((item) => {
        const { name, aisle, note, quantity, id, inCart } = item
        let nameStyle
        let textStyle
        if (inCart) {
          nameStyle = styles.nameInCart
        } else {
          nameStyle = styles.name
        }
        if (inCart) {
          textStyle = styles.textInCart
        } else {
          textStyle = styles.text
        }
        return (<View style={styles.eachItemContainer} key={item.id}>
          <Text style={nameStyle}>{name}</Text>
          <Text style={textStyle}>Aisle: {aisle}</Text>
          <Text style={textStyle}>Note: {note}</Text>
          <Text style={textStyle}>Quantity: {quantity}</Text>
          <View style={styles.eachItemButtonsContainer}>
            <TouchableOpacity
              onPress={() => { this.deleteItem(id) }}
            >
              <Image
                source={require('../images/cancel-circle.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.editItem(name, aisle, note, quantity, id) }}
            >
              <Image
                source={require('../images/pencil.png')}
                style={styles.pencilIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.toggleInCart(id) }}
            >
              <Image
                source={require('../images/cart.png')}
                style={styles.cartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>)
      })
    }

    return (
      <ScrollView>
        <Pantry
          isPantryVisible={this.state.isPantryVisible}
          makePantryInvisible={this.makePantryInvisible.bind(this)}
          transferItemToMainList={this.transferItemToMainList.bind(this)}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showEditView}
          onRequestClose={this.warnUser}
        >
          <ScrollView contentContainerStyle={styles.editViewContainer}>
            <Text style={styles.editViewHeadline}>
              Edit Item: {this.state.name}
            </Text>
            <TextInput
              id="item-input"
              value={this.state.name}
              style={styles.inputField}
              placeholder="Item Name"
              onChangeText={name => this.setState({ name })}
            />
            <TextInput
              id="aisle-input"
              value={this.state.aisle}
              style={styles.inputField}
              placeholder="Aisle Name"
              onChangeText={aisle => this.setState({ aisle })}
            />
            <TextInput
              id="note-input"
              value={this.state.note}
              style={styles.inputField}
              placeholder="Note"
              onChangeText={note => this.setState({ note })}
            />
            <TextInput
              id="quantity-input"
              value={this.state.quantity}
              style={styles.inputField}
              placeholder="Quantity"
              onChangeText={quantity => this.setState({ quantity })}
            />
            <View style={styles.editViewButtonContainer}>
              <TouchableOpacity
                onPress={this.saveChanges}
              >
                <Text style={styles.editViewButtonSave}>
                  Save Changes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.warnUser}
              >
                <Text style={styles.editViewButtonCancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>

        <TextInput
          id="item-input"
          value={this.state.name}
          style={styles.inputField}
          placeholder="Item Name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          id="aisle-input"
          value={this.state.aisle}
          style={styles.inputField}
          placeholder="Aisle Name"
          onChangeText={aisle => this.setState({ aisle })}
        />
        <TextInput
          id="note-input"
          value={this.state.note}
          style={styles.inputField}
          placeholder="Note"
          onChangeText={note => this.setState({ note })}
        />
        <TextInput
          id="quantity-input"
          value={this.state.quantity}
          style={styles.inputField}
          placeholder="Quantity"
          onChangeText={quantity => this.setState({ quantity })}
        />
        <View style={styles.button}>
          <Button
            title="Submit"
            disabled={!this.state.name}
            onPress={
            (name, aisle, note, quantity) => {
              this.createItem(name, aisle, note, quantity)
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Sort by Aisle"
            disabled={this.props.items.length === 0}
            onPress={() => { this.sortByAisle() }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Sort Alpha"
            disabled={this.props.items.length === 0}
            onPress={() => { this.sortAlpha() }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete ALL Items"
            onPress={() => { this.deleteAllItems() }}
            disabled={this.props.items.length === 0}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Pantry"
            onPress={() => { this.goToPantry() }}
          />
        </View>
        <View style={styles.itemsDisplayContainer}>
          {itemsDisplay}
        </View>
      </ScrollView>
    );
  }

}

export default Main;
