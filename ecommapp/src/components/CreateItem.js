import React, { Component } from 'react'
import { Alert, View, Text, StyleSheet, TouchableHighlight, CameraRoll } from 'react-native'
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
  Icon, 
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

constructor(props){
    super(props);
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
  submitHandler = async (values, bag) => {
    this.setState({
        title: values.title,
        description: values.description,
        image: values.image,
        largeImage: values.largeImage,

    })  
    Alert.alert(JSON.stringify(this.state))
  }

  render() {
    return (
      <Container>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.props}>
          {(createItem, { loading, error, called, data }) => {
            return (
                <View>
              <Formik
                initialValues={{
                  title: '',
                  price: '',
                  description: '',
                  image: ''
                }}
              //   onSubmit={this.submitHandler}
                onSubmit = {async () => {
                     this.setState({
        title: values.title,
        description: values.description,
        image: values.image,
        largeImage: values.largeImage,

    })  
                    res = await createItem();
                    console.log(res)
                }}

                render={({
                  values,
                  handleSubmit,
                  setFieldValue,
                  errors,
                  touched,
                  setFieldTouched,
                  isValid
                }) => (
                  <React.Fragment>
                    <View>
                      <FormInput
                        label="title"
                        accessibilityLabel="title"
                        name="title"
                        value={values.title}
                        onValueChange={setFieldValue}
                    //    onChangeText={value => setFieldValue("title", value)}
                       onChangeText={value => setFieldValue("title", value)}

                 
                      />
                      <FormInput
                        label="price"
                        accessibilityLabel="price"
                        name="price"
                        onValueChange={setFieldValue}
                        value={values.price}
                       onChangeText={value => setFieldValue("price", value)}

                      />
                      <FormInput
                        label="description"
                        accessibilityLabel="description"
                        name="description"
                        onValueChange={setFieldValue}
                        value={values.description}
                    onChangeText={value => setFieldValue("description", value)}

                      />
                      
                       <TouchableHighlight onPress={() => this.getPhotos()}>
                          <Text>Add Image</Text>
                        </TouchableHighlight> 
                        {/* <ImageBrowser />  no idea why this stopped rendering*/}
                      <Button
                        block
                        accessibilityLabel="submit"
                        style={styles.loginButton}
                        onPress={handleSubmit}
                        style={styles.button}
                        // disabled={!isValid}
                      >
                        <Text>Submit</Text>
                      </Button>
                    </View>
                  </React.Fragment>
                )}
              />
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
  }
})
