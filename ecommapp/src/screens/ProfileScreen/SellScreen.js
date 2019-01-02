
import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const SellScreen = (props) => (
    <View style={styles.container}>
        <Text>SellScreen</Text>
    </View>
    )
export default SellScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});