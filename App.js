import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      data: {}
    }
  }

  // componentDidMount() {
  //     ImagesSearched.addEventListener(
  //       'click'
  //     )
  //     ImagesSearched.fetch(`http://localhost:8082/api/messages`)
  //     .done((isEnabled) => {
  //       this.setState({
  //         screenReaderEnabled: isEnabled,
  //       });
  //     });
  //   }


  search = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/?client_id=6b652ac778b4300d9fed36f3d0eb5ca6b4884eb0717742511f25a9cd6a70a40c`)
      const searchedImages = await response.json()
      this.setState({
        data: searchedImages[0]
      })
    }
    catch (err) {
      console.log(`AWWWW SHUCKS! ${err}`)
    }
    console.log(this.state.data)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.search}
          placeholder="Search images here!"
          autoFocus={true}
          onChangeText={(text) => this.setState({text})}/>
          <Button
            onPress={this.search}
            title="Search"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Image className={`${this.state.data ? '' : 'hide'}`}
            style={styles.images}
          source={{uri: `${this.state.data.id ? this.state.data.urls.regular : 'https://facebook.github.io/react-native/docs/assets/favicon.png'}`}}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 80,
    alignItems: 'center'
  },
  search: {
    textAlign: 'center',
    fontSize: 20,
  },
  images: {
    marginTop: 60,
    width: 250,
    height: 250,
    justifyContent: 'center',
  },
});
