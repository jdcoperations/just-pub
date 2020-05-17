import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import Colors from '../../Constants/colors';

const CustomButton = props => {
    return (
        <View>
            <TouchableOpacity 
                style={{...styles.button, ...props.style}}
                {...props}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    button: {
        margin: 15,
        padding: 10,
        backgroundColor: Colors.dark,
        borderRadius: 10,
        borderColor: Colors.darkest,
        borderWidth: 3
    },
    buttonText: {
        color: Colors.white,
        fontSize: 20,
    },
})
export default CustomButton;