import React, { useState, useEffect, Component } from 'react';
import MapView from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { render } from 'react-dom';
import { set } from 'react-native-reanimated';

export default function App() {

    const [location, setLocation] = useState({
        "coords": {
            "longitude": 0,
            "latitude": 0
        }
    });
    const [errorMsg, setErrorMsg] = useState(null);
/*     const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null); */

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    });

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
/*         setLatitude(location.latitude);
        setLongitude(location.longitude); */
    }

    return (
        <View style={styles.container}>
            
            <MapView style={styles.map}
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        flex: 1,
    }
});