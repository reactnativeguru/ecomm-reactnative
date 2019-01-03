import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Item, Text, Input,
} from 'native-base';

class FormInput extends PureComponent {
  state = {}

  handleChange = (value) => {
    const { name, onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(name, value);
    }
  }

  handleTouch = () => {
    const { name, onTouch } = this.props;

    if (typeof onTouch === 'function') {
      onTouch(name);
    }
  }

  renderError(error) {
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
    return <View />;
  }

  render() {
    const {
      props: {
        label,
        error,
        placeholderColor,
        stylesToApply,
        ...rest
      },
      handleChange,
      handleTouch,
    } = this;
    return (
      <View>
        <Item style={stylesToApply}>
          <Input
            placeholder={label}
            onChangeText={handleChange}
            autoCapitalize="none"
            onBlur={handleTouch}
            style={styles.textInput}
            placeholderTextColor={placeholderColor}
            {...rest}
          />
        </Item>
        {this.renderError(error)}
      </View>
    );
  }
}
export default FormInput;

const styles = StyleSheet.create({
  error: {
    color: '#D71920',
    fontSize: 14,
    padding: 2,
  },
  textInput: {
    // marginBottom: 5,
    height: Platform.OS === 'ios' ? 35 : 50,
  },
});
