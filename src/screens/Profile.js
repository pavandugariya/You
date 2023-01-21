import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { color } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';

const Profile = () => {
    const navigation = useNavigation();
    const [userImage, setuserImage] = useState('')
    const addressReducerData = useSelector((state) => state.AddressR);
    const name = addressReducerData.addressData.firstName + ' ' + addressReducerData.addressData.lastName
    const address = addressReducerData.addressData.addressOne;
    const imagePickerHandler = async () => {
        try {

            await ImagePicker.openPicker({
                width: 100,
                height: 100,
                cropping: true
            }).then(image => {
                console.log(image);
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
                console.log(image);
                setuserImage(image.path);
            });
        } catch (error) {
            console.log('No select');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.my_profile_text}>My profile</Text>
            <View style={styles.img_box}>
                <Image
                    source={{ uri: userImage ? userImage : 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png' }}
                    style={{ height: 76, width: 76, borderRadius: 50 }}
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
                    <Text style={styles.img_box_address_text}>{address}</Text>
                </View>
            </View>
            <View style={styles.bottom_container}>
                <TouchableOpacity style={styles.bottom_container1} onPress={() => navigation.navigate('EditAddress')}>
                    <Text style={styles.bottom_text_style}>Edit Profile</Text>
                    <View >
                        <Icon name='chevron-forward-outline' style={styles.bottom_icon_style} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottom_container1}>
                    <Text style={styles.bottom_text_style}>Shopping address</Text>
                    <View>
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
        backgroundColor: '#F5F5F8',
    },
    my_profile_text: {
        fontSize: 34,
        fontFamily: 'Raleway',
        color: '#000',
        lineHeight: 39,
        fontWeight: '700',
        left: 50,
        top: 70,
    },
    img_box: {
        width: 315,
        height: 190,
        left: 42,
        top: 110,
        alignItems: 'center',
    },
    name_style: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Raleway',
        fontWeight: '600',
        marginVertical: 15,
        textTransform: "capitalize"

    },
    img_box_inner_container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        paddingHorizontal: 0

    },
    icon_image_container: {
        marginRight: 10,
        color: '#582ED0'
    },
    img_box_address_text: {
        fontFamily: 'Raleway',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 17,
        color: '#000',
        textTransform: "capitalize"
    },
    bottom_container: {
        width: '100%',

        top: 120,
        paddingLeft: 47
    },
    bottom_container1: {
        height: 60,
        width: 315,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 40
    },
    bottom_text_style: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Raleway',
        fontWeight: '600'
    },
    bottom_icon_style: {
        color: '#582ED0',
        fontSize: 18
    },
    edite_icon_style: {
        fontSize: 15,
        color: '#fff'
    },
    edite_box_style: {
        backgroundColor: '#5956E9',
        borderRadius: 50,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 90,
        top: 50,
    }

})