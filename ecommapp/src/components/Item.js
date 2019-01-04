import React, { Component } from 'react'
import PropTypes from 'prop-types'
import formatMoney from '../lib/formatMoney'
import {
  Button,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body, Text
} from 'native-base'

import { View, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { withNavigation } from 'react-navigation'

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  onEditClick = () => {}

  onDeleteClick = () => {}

  onAddToCart = item => {
    //   console.log('added');
    this.props.navigation.navigate('AddToCart', {
      id: item.id
    })
  }

  render() {
    const { item } = this.props
    const imageUri = item.image
    console.log(imageUri)
    return (
      <Card>
        <CardItem>
          {item.image && <Image source={{ uri: imageUri }} />}
        </CardItem>
        <CardItem>
        <TouchableHighlight
        >
          <Text>{item.title}</Text>
        </TouchableHighlight>
        </CardItem>
        <CardItem>
        <Text>{formatMoney(item.price)}</Text>
         </CardItem>
         <CardItem>
        <Text>{item.description}</Text>
        </CardItem>
        <CardItem style={styles.rowButtons}>
          <Button

          >
            <Text>Edit</Text>
          </Button>
          <Button onPress={this.onAddToCart(item)}>
            <Text>Add to cart</Text>
          </Button>
          <Button>
            <Text>Delete</Text>
          </Button>
        </CardItem>
      </Card>
    )
  }
}


 const styles = StyleSheet.create({
    rowButtons: {
  backgroundColor:'#4286f4', 
  flex: 1,
  flexDirection:'row',
  justifyContent: 'space-between',
alignItems:'center'
    }
});

export default withNavigation(Item)
