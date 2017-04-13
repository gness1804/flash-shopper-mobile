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
      showEditView: false,
      isPantryVisible: false,
    }
  }

  cancelOutOfModal = () => {
    this.clearText()
    this.setState({ showEditView: false })
  }

  createItem = () => {
    const newItem = {
      name: this.state.name,
      aisle: this.state.aisle,
      note: this.state.note,
      quantity: this.state.quantity,
      id: Date.now(),
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
    this.setState({ showEditView: true })
  }

  goToPantry = () => {
    this.setState({ isPantryVisible: true })
  }

  makePantryInvisible = () => {
    this.setState({ isPantryVisible: false });
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
    ToastAndroid.show('Item saved!', ToastAndroid.SHORT)
  }

  sortByAisle = () => {
    this.props.sortByAisle();
  }

  sortAlpha = () => {
    this.props.sortAlpha();
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
    const { items } = this.props

    let itemsDisplay;

    if (items.length > 0) {
      itemsDisplay = items.map((item) => {
        const { name, aisle, note, quantity, id } = item
        return (<View style={styles.eachItemContainer} key={item.id}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>Aisle: {aisle}</Text>
          <Text style={styles.text}>Note: {note}</Text>
          <Text style={styles.text}>Quantity: {quantity}</Text>
          <View style={styles.eachItemButtonsContainer}>
            <TouchableOpacity
              onPress={() => { this.deleteItem(id) }}
            >
              <Image
                source={require('../images/cancel-circle.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <Button
              title="Edit Item"
              onPress={() => { this.editItem(name, aisle, note, quantity, id) }}
            />
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
        {itemsDisplay}
      </ScrollView>
    );
  }

}

export default Main;
