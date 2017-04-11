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
} from 'react-native';
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
    }
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

  clearText = (itemInput, aisleInput, noteInput, quantityInput) => {
    this.refs[itemInput].setNativeProps({ text: '' });
    this.refs[aisleInput].setNativeProps({ text: '' });
    this.refs[noteInput].setNativeProps({ text: '' });
    this.refs[quantityInput].setNativeProps({ text: '' });
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

  sortByAisle = () => {
    this.props.sortByAisle();
  }

  sortAlpha = () => {
    this.props.sortAlpha();
  }

  warnUser = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to navigate away from this view? You will lose any unsaved changes.',
      [
        {
          text: 'OK',
          onPress: () => { this.setState({ showEditView: false }) },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    )
  }

  render() {
    // const { name, aisle, note, quantity, id } = this.state
    const { items } = this.props

    let itemsDisplay;

    if (items.length > 0) {
      itemsDisplay = items.map((item) => {
        const { name, aisle, note, quantity, id } = item
        return (<View style={styles.eachItemContainer} key={item.id}>
          <Text style={styles.text}>Item: {name}</Text>
          <Text style={styles.text}>Aisle: {aisle}</Text>
          <Text style={styles.text}>Note: {note}</Text>
          <Text style={styles.text}>Quantity: {quantity}</Text>
          <View style={styles.button}>
            <Button
              title="Delete Item"
              onPress={() => { this.deleteItem(id) }}
            />
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
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showEditView}
          onRequestClose={this.warnUser}
        >
          <Text>{this.state.name}</Text>
          <TouchableOpacity
            onPress={() => { this.setState({ showEditView: false }); }}
          >
            <Text>
              Cancel
            </Text>
          </TouchableOpacity>
        </Modal>
        <TextInput
          id="item-input"
          value={this.state.name}
          style={styles.inputField}
          ref={'itemInput'}
          placeholder="Item Name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          id="aisle-input"
          value={this.state.aisle}
          style={styles.inputField}
          ref={'aisleInput'}
          placeholder="Aisle Name"
          onChangeText={aisle => this.setState({ aisle })}
        />
        <TextInput
          id="note-input"
          value={this.state.note}
          style={styles.inputField}
          ref={'noteInput'}
          placeholder="Note"
          onChangeText={note => this.setState({ note })}
        />
        <TextInput
          id="quantity-input"
          value={this.state.quantity}
          style={styles.inputField}
          ref={'quantityInput'}
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
        {itemsDisplay}
      </ScrollView>
    );
  }

}

export default Main;
