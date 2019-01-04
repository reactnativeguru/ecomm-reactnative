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
  Icon
} from 'native-base'
import Camera from '../../components/ImageBrowser';
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
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Formik
            initialValues={{
              title: '',
              price: '',
              description: '',
              image:''
            }}
            onSubmit={this.submitHandler}
            // validationSchema={Yup.object().shape({
            //   username: Yup.string().required('Username is required'),
            //   password: Yup.string()
            //     .min(6)
            //     .required('Password is required')
            // })}
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
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.title && errors.title}
                  />
                  <FormInput
                    label="price"
                    accessibilityLabel="price"
                    name="price"
                    secureTextEntry
                    value={values.price}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.price && errors.price}
                  />
                  <FormInput
                    label="description"
                    accessibilityLabel="description"
                    name="description"
                    secureTextEntry
                    value={values.description}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.description && errors.description}
                  />
                  <Camera/>
                  <Button
                    block
                    accessibilityLabel="submit"
                    style={styles.loginButton}
                    onPress={handleSubmit}
                    // disabled={!isValid}
                  >
                    <Text>Submit</Text>
                  </Button>
                </View>
              </React.Fragment>
            )}
          />
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
