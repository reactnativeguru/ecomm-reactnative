/**
 * @format
 * @flow
 */
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <RootNavigation />
    );
  }
}
