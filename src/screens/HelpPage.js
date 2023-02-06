import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../utils/color';
import Icon from 'react-native-vector-icons/Ionicons'
import CustomInputField from '../components/CustomInputField';
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
// import { Notifications } from 'react-native-notifications';


const HelpPage = () => {

    const navigation = useNavigation();
    const phoneNum = 9981111501;
    const email = 'nitinmotors1989@gmail.com';
    const mapAddress = '4 Mangal Nagar, opposite Maa Kankeshwari Garba Ground, near Bapat Square, Indore, Madhya Pradesh 452010';
    // useEffect(() => {
    //     getNotification()
    // }, [])
    const getNotification = async () => {
        Notifications.registerRemoteNotifications();
        // const Notification = await Notifications.getInitialNotification();
        Notifications.postLocalNotification({
            body: 'You Buy Anything Get 50% off',
            title: 'Local Notification Title',
            sound: 'chime.aiff',
            category: 'SOME_CATEGORY',
            link: 'localNotificationLink',
            // fireDate: new Date() // only iOS
        }, 1);

        // Notifications.setNotificationChannel({
        //     channelId: 'my-channel',
        //     name: 'My Channel',
        //     importance: 5,
        //     description: 'My Description',
        //     enableLights: true,
        //     enableVibration: true,
        //     groupId: 'my-group', // optional
        //     groupName: 'My Group', // optional, will be presented in Android OS notification permission
        //     showBadge: true,
        //     soundFile: 'custom_sound.mp3',  // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
        //     vibrationPattern: [200, 1000, 500, 1000, 500],
        // })
    }

    const callHandler = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };
    const mapHandler = (fullAddress) => {
        const url = Platform.select({
            ios: `maps:0,0?q=${fullAddress}`,
            android: `geo:0,0?q=${fullAddress}`,
        })

        Linking.openURL(url);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.top_text_style}>Contact Us</Text>
            <View style={styles.top_container}>
                <ScrollView>
                    <TouchableOpacity style={styles.top_inner_container}
                        onPress={() => {
                            callHandler(phoneNum)
                        }}
                    >
                        <Icon name='call' size={22} color={colors._theme_primary_color} />
                        <Text style={styles.inner_container_text}>{phoneNum}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.top_inner_container}
                        onPress={() => {
                            Linking.openURL(`mailto:${email}`)
                        }}
                    >
                        <Icon name='mail' size={22} color={colors._theme_primary_color} />
                        <Text style={styles.inner_container_text}>{email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            mapHandler(mapAddress)
                        }}
                        style={styles.top_inner_container}>
                        <Icon name='navigate' size={22} color={colors._theme_primary_color} />
                        <Text style={styles.inner_container_text}>{mapAddress}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TextInput
                            style={{ flex: 1, borderBottomWidth: 0.5, }}
                            placeholder='Name'
                            placeholderTextColor={'#777'}


                        />
                        <TextInput
                            placeholder='Email'
                            style={{ flex: 1, borderBottomWidth: 0.5, marginLeft: 10 }}
                            placeholderTextColor={'#777'}
                        />
                    </View>
                    <TextInput
                        placeholder='Message'
                        style={{ borderBottomWidth: 0.5, }}
                        placeholderTextColor={'#777'}
                        multiline={true}

                    />
                    <ButtonField loginBtnText={'Send Message'}
                        bgColor={colors._theme_primary_color}
                        color={'#fff'}
                        width={200}
                        height={50}
                        alignSelf={'center'}
                        marginTop={40}
                        onPress={() => {
                            alert('message is sent but not delivered')
                            let URL = 'whatsapp://send?text=' + 'hello' + '&phone=91' + phoneNum;
                            Linking.openURL(URL)
                                .then((data) => {
                                    console.log('WhatsApp Opened');
                                })
                                .catch(() => {
                                    Alert.alert('Make sure Whatsapp installed on your device');
                                });
                        }}
                    />
                </ScrollView>

            </View>
            <TouchableOpacity style={styles.menu_box_style}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Icon name='arrow-back' size={30} color={'#000'} />
            </TouchableOpacity>
            <View style={styles.circle_one}></View>
            <View style={styles.circle_two}></View>
            <View style={styles.circle_tree}></View>
        </View>
    )
}

export default HelpPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors._bg_color,
        justifyContent: 'center',
        alignItems: 'center'
    },
    top_container: {

        width: '90%',
        backgroundColor: '#fff',
        // bottom: 50,
        // position: "absolute",
        borderRadius: 25,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors._theme_secondary_color,
        paddingHorizontal: 30,
        paddingVertical: 50,
        //shadow 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    circle_one: {
        height: 200,
        width: 200,
        position: 'absolute',
        backgroundColor: '#c3c2f0',
        borderRadius: 100,
        left: -70,
        bottom: 80,
        overflow: 'visible',
        zIndex: -50,
    },
    circle_two: {
        height: 300,
        width: 300,
        position: 'absolute',
        backgroundColor: "#8987ed",
        borderRadius: 150,
        overflow: 'visible',
        zIndex: -50,
        right: -80,
        top: 120,
        borderColor: '#8f8deb',
        borderWidth: 30
    },
    circle_tree: {
        height: 150,
        width: 150,
        position: 'absolute',
        backgroundColor: "#8987ed",
        borderRadius: 150,
        overflow: 'visible',
        zIndex: -50,
        left: -80,
        top: -50,
        borderColor: '#8f8deb',
        borderWidth: 30
    },
    top_text_style: {
        color: colors._theme_primary_color,
        fontWeight: "bold",
        fontSize: 30,
        position: 'absolute',
        top: 50,
        lineHeight: 40,
        textDecorationLine: 'underline',
        fontFamily: colors._font_family,
    },
    top_inner_container: {
        flexDirection: 'row',
        paddingVertical: 13,
        alignItems: 'center'

    },
    inner_container_text: {
        color: '#000',
        fontSize: 17,
        paddingLeft: 15,
        fontFamily: colors._font_family,
        width: '95%'
    },
    menu_box_style: {
        position: 'absolute',
        top: 20,
        left: 20,
    }
})