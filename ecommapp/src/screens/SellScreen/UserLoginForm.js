import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Biometrics from 'react-native-biometrics';
import log from '../../utils/consoleLogger';

import ConfigButton from '../../config/ConfigButton';

import FormInput from '../../components/Form/Input';
import BioLogin from './BioLogin';
import { loginRequest, fingerprintLogin } from '../../redux/actions';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';

class UserLoginForm extends PureComponent {
  componentDidMount() {
    // this.save();
    this.canSupportBio();
  //  this.get();
  //  this.deleteSecureItem();
  }

  constructor(props) {
    super(props);

    this.state = {
      locked: true,
      biometricsEnabled: false,
      shouldEnableBioID: false,
      isMeetingStarted: false,
      lastLogin: '',
      biometricsType: 'Biometrics',
      isBioEnabled: 'false',
    };
    this._getLastLogin();
    this._getBioEnabled();
    this.checkUserLoggedInAndHasBio();
  }


 checkUserLoggedInAndHasBio = () => {
   if (this.state.lastLogin !== null && this.state.isBioEnabled) {
     // user logged in before
   }
 }

  submitHandler = async (values, bag) => {
    console.log('VALUES:::', values);
    this.props.loginRequest(values);
    setTimeout(() => bag.resetForm(), 1000);
  }

  toggleBioLogin() {
    this.setState({
      shouldEnableBioID: !this.state.shouldEnableBioID,

    },
    () => {
      AsyncStorage.setItem('shouldEnableBioID', this.state.shouldEnableBioID);
    });
  }

_getBioEnabled=async () => {
  try {
    await AsyncStorage.getItem('shouldEnableBioID').then((value) => {
      if (value != null) {
        this.setState({
          isBioEnabled: value,
        });
      }
    });
  } catch (error) {


  }
}


_getLastLogin=async () => {
  try {
    await AsyncStorage.getItem('lastLogin1').then((lastLogin1) => {
      if (lastLogin1 != null) {
        this.setState({
          lastLogin: lastLogin1,
        });
      }
    });
  } catch (error) {
    log('error getting last login');
  }
}

  canSupportBio = async () => {
    const biometryType = await Biometrics.isSensorAvailable();
    switch (biometryType) {
      case Biometrics.TouchID:
        this.setState({
          biometricsEnabled: true,
          biometricsType: Biometrics.TouchID,
        });
        break;
      case Biometrics.FaceID:
        this.setState({
          biometricsEnabled: true,
          biometricsType: Biometrics.FaceID,
        });
        break;
      default:
        this.setState({
          biometricsEnabled: false,
          biometricsType: null,
        });
        break;
    }
  }

  render() {
    const {
      submitHandler,
      state: {
        biometricsEnabled,
      },
    } = this;
    let { auth, login } = this.props;
    if (auth === undefined) {
      auth = {};
    }
    if (auth.fingerPrintAPIError === undefined) {
      auth.fingerPrintAPIError = {
        message: '',
        type: '',
      };
    }
    return (
      <Container>
        <Header>
          <StatusBar networkActivityIndicatorVisible={auth.requesting} />
          <Left />

          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
              useBiometrics: false,
            }}
            onSubmit={submitHandler}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required'),
              password: Yup.string()
                .min(6)
                .required('Password is required'),
            })}
            render={({
              values,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
              isValid,
            }) => (
              <React.Fragment>
                <View>
                  <FormInput
                    label="username"
                    accessibilityLabel="username"
                    name="username"
                    value={values.username}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.username && errors.username}
                  />
                  <FormInput
                    label="password"
                    accessibilityLabel="password"
                    name="password"
                    secureTextEntry
                    value={values.password}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.password && errors.password}
                  />
                  <Button
                    block
                    accessibilityLabel="submit"
                    style={styles.loginButton}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text>Submit</Text>
                  </Button>


                  { biometricsEnabled
                    && <BioLogin />
                  }

                  <Text style={styles.errorStyle}>{auth.fingerPrintAPIError.message || ''}</Text>
                  <Text style={styles.errorStyle}>{login.error || ''}</Text>
                  <Text style={styles.errorStyle}>
                    {' '}
                    {login.error && login.error.map(error => error.body) || ''}
                  </Text>

                  {}
                  <Text>
                    {' '}
                    { this.state.lastLogin != '' ? `Last Login: ${this.state.lastLogin}` : ''}
                  </Text>
                  <LoadingIndicator />
                  {auth.fingerPrintAPIError.type || ''}
                </View>
              </React.Fragment>
            )}
          />
          <Text style={styles.errorStyle}>
            {auth.fingerPrintAPIError.message || ''}
          </Text>
        </Content>
        <Text style={styles.errorStyle}>{auth.fingerPrintAPIError.message || ''}</Text>


        <ConfigButton />

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  btnIcon: {
    marginRight: 20,
    color: '#fff',
  },
  errorStyle: {
    color: '#e43349',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  login: state.login,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginRequest,
    fingerprintLogin,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginForm);
