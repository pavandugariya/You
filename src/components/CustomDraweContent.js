import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import Icone from 'react-native-vector-icons/Ionicons';
import Icones from 'react-native-vector-icons/MaterialIcons';

import { Drawer } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RestoreToken } from '../Redux/Action/AuthAction/AuthAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../utils/color';


const CustomDraweContent = ({ iconColor, iconSize }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('userToken')
        } catch (e) {
            // remove error
            console.log(e);
        }
        console.log('Done.')
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <View>
                    <Drawer.Section style={{ marginTop: 20, }} showDivider={true} >

                        <DrawerItem
                            icon={() => <Icone name={'home-outline'} size={iconSize} color={iconColor} />}
                            label={'Home'}
                            labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                            onPress={() => { navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={() => <Icone name={'person-outline'} size={iconSize} color={iconColor} />}
                            label={'Profile'}
                            labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                            onPress={() => { navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={() => <Icones name={'shopping-bag'} size={iconSize} color={iconColor} />}
                            label={'My Orders'}
                            labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                            onPress={() => { navigation.navigate('Order History') }}
                        />
                        <DrawerItem
                            icon={() => <Icone name={'heart-outline'} size={iconSize} color={iconColor} />}
                            label={'Favorites'}
                            labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                            onPress={() => { navigation.navigate('Favorites') }}
                        />
                        {/* <DrawerItem
                            icon={() => <Icones name={'shopping-bag'} size={iconSize} color={iconColor} />}
                            label={'Delivery'}
                            labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                            onPress={() => { navigation.navigate('Home') }}
                        /> */}
                        <DrawerItem
                            icon={() => <Icones name={'contact-support'} size={iconSize} color={iconColor} />}
                            label={'Help'}
                            labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                            onPress={() => { navigation.navigate('Home') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <View style={styles.circle} />
            <View style={styles.circle2}></View>
            <View style={styles.circle3}></View>

            <Drawer.Section style={{ marginBottom: 20 }} showDivider={true}>
                <DrawerItem
                    icon={() => <Icone name={'log-out-outline'} size={iconSize} color={iconColor} />}
                    label={'Sign out'}
                    labelStyle={{ color: iconColor, fontSize: 17, fontFamily: 'Raleway', fontWeight: '600', }}
                    onPress={async () => {
                        removeValue();
                        dispatch(RestoreToken(null))

                    }}
                />
            </Drawer.Section>
        </View>
    )
}

export default CustomDraweContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors._theme_primary_color
    },
    circle: {
        height: 75,
        width: 75,
        backgroundColor: colors._theme_secondary_color,
        position: 'absolute',
        right: 150,
        bottom: 230,
        borderRadius: 50,
        zIndex: -50
    },
    circle2: {
        height: 25,
        width: 25,
        backgroundColor: colors._theme_primary_color,
        position: 'absolute',
        right: 50,
        bottom: 300,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors._theme_secondary_color,
        zIndex: -50

    },
    circle3: {
        height: 80,
        width: 80,
        backgroundColor: colors._theme_secondary_color,
        position: 'absolute',
        right: 10,
        top: -30,
        borderRadius: 50,
    },

})