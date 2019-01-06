import React, { Component } from 'react'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  CameraRoll,
  TextInput
} from 'react-native'
import * as Yup from 'yup'
import FormInput from './Input'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'
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
  Icon
} from 'native-base'
import ImageBrowser from './ImageBrowser'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { withNavigation } from 'react-navigation'
import ViewPhotos from './ViewPhotos'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION( #mutation arguments
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem( #running mutation with values passed in
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: '',
      image: '',
      largeImage: '',
      description: ''
    }
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20
    }).then(res =>
      this.setState({
        showPhotoGallery: true,
        photoArray: res.edges
      })
    )
  }

  //  handleChange = (value: string) => {
  //     if (this.state.value !== value) {
  //       // remember that onChangeText will be Formik's setFieldValue
  //       this.setState({ value })
  //     }
  //   }
  handleSubmit = async () => {
    // this.setState({
    //   title: values.title,
    //   description: values.description,
    //   image: values.image,
    //   largeImage: values.largeImage
    // })
    // Alert.alert(this.state)
  }

  render() {
    return (
      <Container>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, { loading, error, called, data }) => {
            return (
               <View>
              <TextInput
                style={styles.input}
                placeholder="title"
                accessibilityLabel="title"
                name="title"
                value={this.state.title}
                onChangeText={value => this.setState({ title: value })}
              />
              <TextInput
                style={styles.input}
                placeholder="price"
                accessibilityLabel="price"
                name="price"
                value={this.state.price}
                onChangeText={value => this.setState({ price: value })}
              />
              <TextInput
                style={styles.input}
                placeholder="description"
                accessibilityLabel="description"
                name="description"
                value={this.state.description}
                onChangeText={value => this.setState({ description: value })}
              />

              <TouchableHighlight onPress={() => this.getPhotos()}>
                <Text>Add Image</Text>
              </TouchableHighlight>
              {/* <ImageBrowser />  no idea why this stopped rendering*/}
              <Button
                block
                accessibilityLabel="submit"
                style={styles.loginButton}
                onPress={
                    async () => {
                     //   alert(this.state)
                         const res = await createItem();
                        console.log(res)
                    }
                }
                style={styles.button}
                // disabled={!isValid}
              >
                <Text>Submit</Text>
              </Button>
            </View>
            )
          }}
        </Mutation>
      </Container>
    )
  }
}
export default CreateItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    padding: 16
  },
  button: {
    marginTop: 16
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
