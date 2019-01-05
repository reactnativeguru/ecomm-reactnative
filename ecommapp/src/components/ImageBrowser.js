import React, { Component } from 'react'
import {
  CameraRoll,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native'
import ViewPhotos from './ViewPhotos'

class Camera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPhotoGallery: '',
      photoArray: []
    }
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20
    }).then(res => this.setState({ 
        showPhotoGallery: true, 
        photoArray: res.edges }))
  }

  render() {
    if (this.state.showPhotoGallery) {
      return <ViewPhotos photoArray={this.state.photoArray} />
    }
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.getPhotos()}>
          <Text>Add Image</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
export default Camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
