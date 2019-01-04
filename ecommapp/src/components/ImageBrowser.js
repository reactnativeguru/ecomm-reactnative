import React, { Component } from "react";
import {
  CameraRoll,
  Image,
  StyleSheet,
  TouchableHighlight,
  View, Text
} from 'react-native';

class Camera extends Component {

    getPhotos = () => {
  CameraRoll.getPhotos({
    first: 20,
    assetType: 'All'
  })
  .then(r => this.setState({ photos: r.edges }))
}
  

    render() {
        return (
            <View style={styles.container}>
        <TouchableHighlight
        onPress={this.getPhotos}
        >
         <Text>Add Image</Text>
        </TouchableHighlight>
      </View>
        );
    }
}
export default Camera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});