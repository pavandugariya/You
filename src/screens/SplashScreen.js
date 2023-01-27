import { StyleSheet, Text, View, Image, Appearance } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RestoreToken, isLoadingSet, setEmailId } from '../Redux/Action/AuthAction/AuthAction';
import { decrement, increment, addArrayElemets, deleteArrayElemets } from '../Redux/Action/CartAction/CartAction';
import fetchDataProduct, { getData } from '../api/axios/axiosApi';

const SplashScreen = () => {
    const navigation = useNavigation();
    const ReducerData = useSelector((state) => state.AuthR);
    const ReducerThemeData = useSelector((state) => state.ThemeR);
    const CardReducerData = useSelector((state) => state.CartR);
    const dispatch = useDispatch();
    const [isLogin, setisLogin] = useState(false)
    useEffect(() => {
        getUserTokenData()
        setTimeout(async () => {
            dispatch(isLoadingSet(false))
        }, 1000);
    }, [])

    const [themes, setThemes] = useState('DARK')
    // theme property
    useEffect(() => {
        const listener = Appearance.addChangeListener(colortheme => {
            if (colortheme.colorScheme == 'light') {
                setThemes('LIGHT')
                dispatch({
                    type: 'RESTORE_TOKEN',
                    payload: 'LIGHT'
                })
                console.log(colortheme.colorScheme + "COLORTHEMEDARK");
            } else {
                console.log(colortheme.colorScheme + "COLORTHEME");
                setThemes('DARK')
            }
        });
        //return () => listener;
    }, [])
    const getUserTokenData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken')
            console.log(value + ' <= token');
            const email = await AsyncStorage.getItem('userEmail')
            // console.log(email);
            dispatch(RestoreToken(value))
            dispatch(setEmailId(email))
            if (value !== null) {
                getCardData();
            }
            // return value;
        } catch (e) {
            console.log(e);
        }
    }

    // get all card  data from api 
    const getCardData = async () => {
        try {
            const res = await getData('https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart');
            dispatch(addArrayElemets(res.items));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.top_text_style}>find your Gadget</Text>
            </View>
            <View style={styles.img_container}>
                <Image
                    source={require('../../assets/images/Saly-19.png')}
                    style={{ height: '80%', width: '80%' }}
                />
            </View>
            <Animatable.View animation={'lightSpeedIn'} style={styles.circle} />
            <Animatable.View animation={'fadeInLeft'} style={styles.circle2} />
            <Animatable.View animation={'fadeInLeft'} style={styles.circle3} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#5956E9'
    },
    topContainer: {
        position: 'absolute',
        top: 70,
        width: 307,
        height: 138,
        left: 51
    },
    top_text_style: {
        fontFamily: 'Raleway-Black',
        fontSize: 50,
        color: '#f2f2f5',
        textTransform: "capitalize",


    },
    img_container: {
        alignItems: 'center',
        width: 300,
        height: 300,
        top: 220,
    },
    bottom_style: {
        backgroundColor: '#6350FF',
        width: 454,
        height: 64,
        left: 27,
        top: 160,
    },
    circle: {
        height: 60,
        width: 60,
        backgroundColor: '#817Ef5',
        position: 'absolute',
        right: 50,
        bottom: 70,
        borderRadius: 50,
    },
    circle2: {
        height: 60,
        width: 60,
        backgroundColor: '#8178FF',
        position: 'absolute',
        right: 50,
        bottom: 70,
        borderRadius: 50,
    },
    circle3: {
        height: 25,
        width: 25,
        backgroundColor: '#5956E9',
        position: 'absolute',
        right: 150,
        bottom: 150,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#817EFF',
    },

})