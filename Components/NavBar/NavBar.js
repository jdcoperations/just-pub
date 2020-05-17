import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../Constants/colors';
import NavButton from '../Button/Button';

export default class Button extends React.Component {
 
    render() {
        return (
            <View style={styles.ButtonBar}>
                <NavButton style={styles.ButtonStyle}>
                    <Text style={styles.ButtonsText}>Home</Text>
                </NavButton>
                <NavButton style={styles.ButtonStyle}>
                    <Text style={styles.ButtonsText}>My Bookings</Text>
                </NavButton>
                <NavButton style={styles.ButtonStyle}>
                    <Text style={styles.ButtonsText}>Workouts</Text>
                </NavButton>
            </View>
        )
    };
}

const styles = StyleSheet.create ({
    ButtonBar: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.darkest,
        borderRadius: 30,
    },
    ButtonStyle: {
        margin: 10,
        backgroundColor: Colors.white,
        width: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    ButtonsText: {
        color: Colors.darkest,
        fontSize: 10,
        
    }
});