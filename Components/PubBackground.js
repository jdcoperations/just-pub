import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ImageBackground } from 'react-native';


const drinkImage = require('../assets/images/pint.jpg');

export default PubBackground = props => {
return (
<ImageBackground
        source={drinkImage}
        style={{...styles.image, ...props.style}}>{props.children}</ImageBackground>
)
};

const styles= StyleSheet.create ({
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});