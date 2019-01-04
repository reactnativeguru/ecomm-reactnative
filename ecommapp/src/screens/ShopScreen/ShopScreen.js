import React, { PureComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'
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
  Item
} from 'native-base'
import { Box, Text } from 'react-native-design-utility'
const iconUrl = '../../../assets/images/icon.png'
import ScreenHeader from '../../components/ScreenHeader'
import Images from 'assets/images';
import Items from '../../components/Items'

class ShopScreen extends PureComponent {
  render () {
    return (
      <Container padder>
        <ScreenHeader
          //  backgroundColor={theme.colors.white}
          title="Shop"
          //  textColor={theme.colors.black}
          borderBottomWidth={1}
        />
        <Content>
            <Items/>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text size="xl" bold thousand>
                Footer
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
export default ShopScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
