/**
 * @format
 * @flow
 */
console.disableYellowBox = true

import React, { Component } from 'react'
import { Platform } from 'react-native'
import RootNavigation from './src/navigation/RootNavigation'
import { UtilityThemeProvider } from 'react-native-design-utility'
import { theme } from './theme'

import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import Config from './src/config'

const cache = new InMemoryCache({})

// create apollo client
const client = new ApolloClient({
  link: new HttpLink({
    uri: Config.endpoint,
    credentials: 'include'
  }), 
  cache: new InMemoryCache(), 
  request: async (operation) => {
    operation.setContext({
      fetchOptions:{
        credentials: 'include'
      },
      headers
    })
  }
})

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <UtilityThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <RootNavigation />
        </ApolloProvider>
      </UtilityThemeProvider>
    )
  }
}
