import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';


import MainTabNavigator from './MainTabs';

const AppNavigator = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
  },
},
{
  headerMode: 'none',
});

class RootNavigation extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <AppNavigation
        
       />
    );
  }
}
export default createAppContainer(AppNavigator);
