/**
 * @format
 * @flow
 */
console.disableYellowBox = true
import React, { Component } from 'react'
import { Platform } from 'react-native'
import RootNavigation from './src/navigation/RootNavigation'
import { UtilityThemeProvider } from 'react-native-design-utility'
import { theme } from './theme';

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <UtilityThemeProvider theme={theme}>
        <RootNavigation />
      </UtilityThemeProvider>
    )
  }
}
