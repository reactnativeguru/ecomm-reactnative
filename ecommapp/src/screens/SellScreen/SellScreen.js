import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Yup from 'yup';
import FormInput from '../../components/Input'
import { Formik } from 'formik'
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
import CreateItem from '../../components/CreateItem';
class SellScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      price: '',
      image: '',
      largeImage: '',
      description: ''
    }
  }

    submitHandler = async (values, bag) => {
    console.log('VALUES:::', values);
    this.props.loginRequest(values);
    setTimeout(() => bag.resetForm(), 1000);
  }


  render () {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Sell</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <CreateItem/> 
          <Text>create</Text>
        </Content>
      </Container>
    )
  }
}
export default SellScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
