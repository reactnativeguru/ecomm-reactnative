import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  
} from 'native-base'
import { Box, Text } from 'react-native-design-utility'

import ScreenHeader from '../../components/ScreenHeader'
class HomeScreen extends PureComponent {
  render () {
    return (
      <Container>
        <ScreenHeader
          //  backgroundColor={theme.colors.white}
          title="Home"
          //  textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Content>
          <Text>This is Content Section</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text size="xl" bold thousand>

              Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
