import React from 'react';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  HomeScreen,
  SellScreen,
  ShopScreen

} from './routes';

const MainTabNavigator = createBottomTabNavigator({
    Sell: SellScreen,

  Shop: ShopScreen,

   Home: HomeScreen

},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({
      focused, horizontal, tintColor,
    }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        return <FontAwesome name="home" size={horizontal ? 20 : 25} color={tintColor} />;
      } 
       if (routeName === 'Shop') {
        return <FontAwesome name="shopping-bag" size={horizontal ? 20 : 25} color={tintColor} />;
      } 
       if (routeName === 'Sell') {
        return <FontAwesome name="money" size={horizontal ? 20 : 25} color={tintColor} />;
      } 
    },
  }),
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'black',
  },
});


export default createAppContainer(MainTabNavigator);
