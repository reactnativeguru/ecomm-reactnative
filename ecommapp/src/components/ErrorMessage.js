import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ErrorMessage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ErrorMessage</Text>
            </View>
        );
    }
}
export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});