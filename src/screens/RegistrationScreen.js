import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInputField from '../components/CustomInputField'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import { getData, postData } from '../api/axios/axiosApi';

const RegistrationScreen = () => {
    const [email, setemail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [isVisible, setisVisible] = useState(true)
    const navigation = useNavigation();

    const sendData = {
        username: userName.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
    }
    const loginHandler = async () => {
        try {
            console.log(sendData);
            if (userName.length >= 5 && email.length >= 8 && password.length >= 8) {
                const res = await postData('https://automart.codesfortomorrow.com/wp-json/user-operations/v1/register', sendData)
                if (res.status == 'fail') {
                    alert(res.message)
                } else {
                    alert('Your accout create is ' + res.status)
                    navigation.navigate('SignIn')
                }
                // console.log(res);
                // alert(res.status + 'and' + res.message)
            } else {
                userName.length <= 5 ?
                    alert('Enter at least six characters user name')
                    : (password.length <= 8) ? alert('Password must contain at least ONE digit and AT LEAST ONE letter') : alert('Enter proper email id')
            }


        } catch (error) {
            console.log(error);
        }
        // if (email && password) {
        //     navigation.replace('DrawerNavigation')
        // } else {
        //     alert('please fill correct details')
        // }
    }
    return (
        <View style={styles.container} >
            <Text style={styles.welcome_text_style}>Register Now!</Text>
            <View style={styles.bottom_container}>
                <ScrollView>
                    <Text style={styles.bottom_top_text_style}>Register/SignUp</Text>
                    <CustomInputField
                        leftIcon={'person-outline'}
                        secondRightIcon={'eye-off-outline'}
                        textname={'User Name'}
                        placeholderText={'Enter your user name '}
                        placeholderTextColor={'#868686'}
                        textValue={userName}
                        onChangeTextHandler={(val) => setUserName(val)}
                        rightIconOnpressHandler={() => setisVisible(!isVisible)}
                    />
                    <CustomInputField
                        leftIcon={'mail-outline'}
                        secondRightIcon={'eye-off-outline'}
                        textname={'Email'}
                        placeholderText={'Enter your email '}
                        placeholderTextColor={'#868686'}
                        textValue={email}
                        keyboardType={'email-address'}

                        onChangeTextHandler={(val) => setemail(val)}
                        rightIconOnpressHandler={() => setisVisible(!isVisible)}
                    />
                    <CustomInputField
                        leftIcon={'lock-closed-outline'}
                        rightIcon={'eye-outline'}
                        secondRightIcon={'eye-off-outline'}
                        textname={'Password'}
                        placeholderText={'Enter your password '}
                        isVisible={isVisible}
                        placeholderTextColor={'#868686'}
                        textValue={password}

                        onChangeTextHandler={(val) => setPassword(val)}
                        rightIconOnpressHandler={() => setisVisible(!isVisible)}
                    />
                    <View style={{ marginVertical: 10 }}></View>
                    <ButtonField
                        bgColor={'#582ED0'}
                        loginBtnText={'Sign Up'}
                        color={'#fff'}
                        height={60}
                        marginHorizontal={0}
                        onPress={() => loginHandler()}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.create_account_text}> Sign In</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.circle}></View>
            <View style={styles.circle2}></View>
            <View style={styles.circle3}></View>
        </View>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5956EA',
    },
    // top_container: {
    //     flex: 1.3,
    //     backgroundColor: '#5956EA',
    // },
    bottom_container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 30,
        top: 206
    },
    welcome_text_style: {
        fontFamily: 'Raleway',
        fontSize: 45,
        fontWeight: '800',
        lineHeight: 62,
        position: 'absolute',
        width: 302,
        height: 126,
        left: 35,
        top: 69,
        color: '#FFFFFF'
    },
    bottom_top_text_style: {
        color: '#000000',
        fontFamily: 'Raleway',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 35,
        lineHeight: 21
    },
    fogote_pass_text_style: {
        color: '#5956E9',
        fontFamily: 'Raleway',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 20
    },
    create_account_text: {
        color: '#5956E9',
        fontFamily: 'Raleway',
        fontSize: 17,
        fontWeight: '600'

    },
    circle: {
        height: 100,
        width: 100,
        backgroundColor: '#FAB8C3',
        position: 'absolute',
        borderRadius: 50,
        right: 20,
        top: -40,

    },
    circle2: {
        height: 30,
        width: 30,
        backgroundColor: '#5956E9',
        position: 'absolute',
        borderRadius: 50,
        left: 89,
        top: 26,
        borderWidth: 8,
        borderColor: '#706EFD',
    },
    circle3: {
        height: 40,
        width: 40,
        backgroundColor: '#5956E9',
        position: 'absolute',
        borderRadius: 50,
        top: 149,
        right: 26,
        borderWidth: 10,
        borderColor: '#706EFD',
    }

})