// @flow

import React, { Component } from 'react';
import {
  TextInput,
  View,
} from 'react-native';
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

  render() {
    return (
      <View>
        <TextInput
          id="search-input"
          value={this.state.search || ''}
          placeholder="Search"
          onChangeText={search => this.setState({ search })}
        />
      </View>
    );
  }
}

export default Search
