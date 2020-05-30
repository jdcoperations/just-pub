import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TouchableHighlightBase } from 'react-native';
import * as Font from 'expo-font';

import Colors from '../../Constants/colors';

import { PUBS } from '../../data/pubs';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Button from '../Button/Button';

const PubsScreen = props => {
    const renderGridItem = itemData => {
        return (
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'Pub',
                        params: {
                            pubId: itemData.item.id
                        }
                    });
                }}>
                <View>
                    <Image style={styles.imgStyle} source={{
                        uri: `${itemData.item.ImageUrl}`
                    }} />
                    <Text style={styles.headline}>{itemData.item.Name}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={PUBS}
            renderItem={renderGridItem}
            numColumns={1}
        />
    );
};

PubsScreen.navigationOptions = {
    headerTitle: 'Pubs',
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        margin: 30,
        padding: 20,
        borderColor: Colors.darkest,
        borderRadius: 10,
        borderWidth: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark,
    },
    imgStyle: {
        height: 150,
        width: 150,
    },
    headline: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        fontFamily: 'Baloo',
        justifyContent: "center",
    }
});

export default PubsScreen;

/* export default class WorkoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
            selectedTitle: null,
            selectedDesc: null,
            selectedImg: null,
            selectedStatus: null,
            selectedLocations: null,
            selectedTimeTable: null
        };
    }

    componentDidMount() {
        Font.loadAsync({
            'Baloo': require('../../assets/fonts/Baloo_Da_2/BalooDa2-Regular.ttf'),
        });
    }

    updateWorkout = (workoutTitle) => {
        //Alert.alert("Workout selected", workoutTitle.Title);
        this.setState({
            selectedTitle: workoutTitle.Title,
            selectedDesc: workoutTitle.Desc,
            selectedImg: workoutTitle.ImgUrl,
            selectedStatus: workoutTitle.Status,
            selectedLocations: null
        });
    }

    timeTable = (tt) => {

    }

    clearWorkout = () => {
        this.setState({
            selectedTitle: null,
            selectedDesc: null,
            selectedImg: null,
            selectedStatus: null,
            selectedLocations: null,
            selectedTimeTable: null
        });
    }

    headerCard = (props) => {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.ScrollViewStyle}>
                    <View style={{ ...styles.headerCard, ...props.style }}>
                        <View style={styles.imgView}>
                            <Image
                                style={styles.img}
                                source={{
                                    uri: `${props.img}`
                                }} />
                        </View>
                        <View style={styles.detailTxt}>
                            <Text style={styles.h1}>{props.title}</Text>
                            <Text style={styles.h2}>{props.desc}</Text>
                            <Text style={styles.h3}>Status:</Text>
                            <Text style={styles.h4}>{props.status}</Text>
                        </View>
                        <View style={styles.buttonRow}>
                            <Button onPress={this.clearWorkout}>
                                <Text style={styles.buttonTxt}>Back</Text>
                            </Button>
                            <Button>
                                <Text style={styles.buttonTxt}>Book</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        if (this.state.selectedTitle === null) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.scrollStyle}>

                        {exampleData.map(workout => {
                            // console.log(workout.Title);
                            return (
                                <TouchableOpacity
                                    key={workout.Title}
                                    style={styles.card}
                                    onPress={() => this.updateWorkout(workout)}>
                                    <Image style={styles.imgStyle} source={{
                                        uri: `${workout.ImgUrl}`
                                    }} />
                                    <Text style={styles.headline}>{workout.Title}</Text>
                                </TouchableOpacity>
                            )
                        })}

                    </ScrollView>
                </View>
            )
        } else {
            return (
                this.headerCard({
                    title: this.state.selectedTitle,
                    desc: this.state.selectedDesc,
                    img: this.state.selectedImg,
                    status: this.state.selectedStatus,
                    timetable: this.state.selectedTimeTable
                })
            )
        }
    }
}

const styles = StyleSheet.create({
    ScrollViewStyle: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        fontFamily: 'Baloo',
        paddingTop: 35,
    },
    scrollStyle: {
        width: '95%',
    },
    headline: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        fontFamily: 'Baloo',
    },
    card: {
        margin: 30,
        padding: 20,
        borderColor: Colors.darkest,
        borderRadius: 10,
        borderWidth: 1,
        width: '80%',
        alignItems: 'center',
        backgroundColor: Colors.dark,
    },
    imgStyle: {
        height: 150,
        width: 150,
    },
    headerCard: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: Colors.white,
        paddingBottom: 35,
        paddingHorizontal: 35,
        paddingTop: 60,
        alignItems: 'center',
    },
    h1: {
        fontFamily: 'Baloo',
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.darkest,
    },
    h2: {
        fontFamily: 'Baloo',
        fontSize: 20,
        color: Colors.dark,
    },
    h3: {
        color: Colors.dark,
        fontSize: 20,
    },
    h4: {
        color: Colors.dark,
        fontSize: 15,
        paddingLeft: 15,
    },
    imgView: {
        alignItems: 'center',
    },
    img: {
        height: 200,
        width: 200,
        borderColor: Colors.darkest,
        borderWidth: 1
    },
    buttonRow: {
        flexDirection: 'row',
    },
    buttonTxt: {
        fontSize: 20,
    },
    detailTxt: {
        paddingTop: 20,
    }
}); */