import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { color } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { postDataSecond } from '../api/axios/axiosApi'
import { colors } from '../utils/color';

const Profile = () => {
    const navigation = useNavigation();
    const [userImage, setuserImage] = useState('')
    const addressReducerData = useSelector((state) => state.AddressR);
    const emailAuthReducer = useSelector((state) => state.AuthR)
    const name = addressReducerData.addressData.firstName + ' ' + addressReducerData.addressData.lastName
    const address = addressReducerData.addressData.addressOne;
    const imagePickerHandler = async () => {
        try {

            await ImagePicker.openPicker({
                width: 100,
                height: 100,
                cropping: true
            }).then(image => {
                console.log(image.path);
                sendImageAPI(image.path)
                setuserImage(image.path);
            });
        } catch (error) {
            console.log('No select');
        }
    }
    const imagePickerCameraHandler = async () => {
        try {

            await ImagePicker.openCamera({
                width: 100,
                height: 100,
                cropping: true
            }).then(image => {
                console.log(image.path);
                sendImageAPI(image.path)

                setuserImage(image.path);
            });
        } catch (error) {
            console.log('No select');
        }
    }
    const sendImageAPI = async (val) => {
        try {
            const dataObj = {
                "image_src": val,
                "user_email": emailAuthReducer.userEmail,
            }

            const res = await postDataSecond(`https://automart.codesfortomorrow.com//wp-json/ade/v1/profile-image`, dataObj);
            alert(res.status)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.my_profile_text}>My profile</Text>
            <View style={styles.img_box}>
                <Image
                    source={{ uri: userImage ? userImage : 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png' }}
                    style={{ height: 76, width: 76, borderRadius: 50, top: -20 }}
                />
                <TouchableOpacity style={styles.edite_box_style}
                    onPress={() => {
                        Alert.alert('Upload Photo', 'Choose Your Profile Picture',
                            [
                                { text: 'Cancel', onPress: () => console.log('OK Pressed') },
                                {
                                    text: 'Open Gallary',
                                    onPress: () => imagePickerHandler(),
                                    style: 'destructive',
                                },
                                { text: 'Open  Camera', onPress: () => imagePickerCameraHandler() },

                            ],
                            {
                                cancelable: true,
                                onDismiss: () =>
                                    Alert.alert(
                                        'This alert was dismissed by tapping outside of the alert dialog.',
                                    ),
                            },
                        );

                        // alert('')
                        // imagePickerHandler()
                    }

                    }
                >
                    <Icons name='edit' style={styles.edite_icon_style} />
                </TouchableOpacity>

                <Text style={styles.name_style}>{name}</Text>
                <View style={styles.img_box_inner_container}>
                    <Icon name='location-outline' size={20} style={styles.icon_image_container} />
                    <Text numberOfLines={2} style={styles.img_box_address_text}>{address}</Text>
                </View>
            </View>
            <View style={styles.bottom_container}>

                <TouchableOpacity style={styles.bottom_container1} onPress={() => navigation.navigate('EditAddress')}>
                    <Text style={styles.bottom_text_style}>Edit Profile</Text>
                    <View >
                        <Icon name='chevron-forward-outline' style={styles.bottom_icon_style} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Order History')} style={styles.bottom_container1}>
                    <Text style={styles.bottom_text_style}>Order history</Text>
                    <View >
                        <Icon name='chevron-forward-outline' style={styles.bottom_icon_style} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_container1} onPress={() => navigation.navigate('Cart')} >
                    <Text style={styles.bottom_text_style}>Cards</Text>
                    <View >
                        <Icon name='chevron-forward-outline' style={styles.bottom_icon_style} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_container1} onPress={() => navigation.navigate('Notification')}>
                    <Text style={styles.bottom_text_style}>Notification</Text>
                    <View >
                        <Icon name='chevron-forward-outline' style={styles.bottom_icon_style} />
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors._bg_color,
    },
    my_profile_text: {
        fontSize: 34,
        fontFamily: 'Raleway',
        color: '#000',
        lineHeight: 39,
        fontWeight: '700',
        left: 50,
        top: 50,
    },
    img_box: {
        width: 340,
        height: 190,
        top: 95,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    name_style: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Raleway',
        fontWeight: '800',
        marginBottom: 15,
        textTransform: "capitalize"

    },
    img_box_inner_container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        paddingHorizontal: 0,

    },
    icon_image_container: {
        marginRight: 10,
        color: colors._theme_primary_color,
        alignSelf: 'baseline'
        // alignItems: 'baseline'

    },
    img_box_address_text: {
        fontFamily: 'Raleway',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 17,
        color: '#000',
        textTransform: "capitalize",
        paddingRight: 20,

    },
    bottom_container: {
        width: '100%',
        top: 100,

    },
    bottom_container1: {
        height: 60,
        width: 340,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,

        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 2,

    },
    bottom_text_style: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Raleway',
        fontWeight: '600'
    },
    bottom_icon_style: {
        color: colors._theme_primary_color,
        fontSize: 18
    },
    edite_icon_style: {
        fontSize: 15,
        color: '#fff'
    },
    edite_box_style: {
        backgroundColor: colors._theme_primary_color,
        borderRadius: 50,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 110,
        top: 30,
    }

})