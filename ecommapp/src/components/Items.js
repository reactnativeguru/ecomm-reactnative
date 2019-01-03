import React, { Component } from "react";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import { 
    View,
    StyleSheet, FlatList, 
} from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";


const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items{
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;


class Items extends Component {


    renderItem = ({data}) => {
        return (
            <ListItem itemDivider>
             {/* <Body>
            <Text>{data.title}</Text>
            </Body> */}
            </ListItem>
        )
    }



    render() {
        return (
            <View >
            <Query query={ALL_ITEMS_QUERY}>
          {({ loading, data, error }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error{error.message}</Text>
            else {
                console.log(data.items)
                return (
                 <FlatList
                data={data.items}
                renderItem={({item}) => <ListItem><Text>{item.title}</Text></ListItem>}
                keyExtractor={item => item.id}

            />
            )
           
          }}}
        </Query>
            </View>
        );
    }
}
export default Items;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});