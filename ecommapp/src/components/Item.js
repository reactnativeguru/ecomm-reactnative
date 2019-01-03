import React, { Component } from "react";
import PropTypes from 'prop-types';
import formatMoney from "../lib/formatMoney"
import {Button, Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";
import { 
    View,Image,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class Item extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired
    };


    

    onEditClick = () => {

    }

    onDeleteClick = () => {

    }

    onAddToCart = (item) => {
     //   console.log('added');
      this.props.navigation.navigate('AddToCart', {
        id:item.id
      })
    } 


    render() {
        const {item} = this.props;
        const imageUri = item.image;
        console.log(imageUri);
        return (
            <View>
              {item.image && <Image source={{ uri: imageUri }}/> }
                    <Button 
                    // href={{
                    //     pathname:'/item',
                    //     query: {id: item.id}
                    // }}
                    >
                        <Text>{item.title}</Text>
                    </Button>
                <Text>{formatMoney(item.price)}</Text>
                <Text>{item.description}</Text>
                <View>
                    <Button 
                    // href={{
                    //     pathname: 'update',
                    //     query:{ id: item.id}
                    //     }}
                        >
                        <Text>Edit</Text> 
                    </Button>
                    <Button 
                    onPress={this.onAddToCart(item)}
                    ><Text>Add to cart</Text></Button>
                    <Button><Text>Delete</Text></Button>
                </View>
            </View>
        );
    }
}
export default withNavigation(Item);
