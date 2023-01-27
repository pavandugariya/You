import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInputField from '../components/CustomInputField'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../api/axios/axiosApi';

const ForgotPassword = () => {
    const [email, setemail] = useState('');
    const [isVisible, setisVisible] = useState(true)
    const navigation = useNavigation();
    const resetHandler = async () => {
        if (email.length > 10) {
            const res = await postData(`https://automart.codesfortomorrow.com/wp-json/user-operations/v1/forget_password`, { email });
            if (res === 'Password reset link has been sent to your registered email.') {
                navigation.replace('SignIn')
                alert(res)
            } else {
                alert(res)
            }
        } else {
            alert('Fill correct email id')
        }
    }
    return (
        <View style={styles.container} >
            <Text style={styles.welcome_text_style}>Reset password</Text>
            <View style={styles.bottom_container}>
                <ScrollView>
                    <Text style={styles.bottom_top_text_style}>Forgot Password</Text>
                    <CustomInputField
                        leftIcon={'mail-outline'}
                        secondRightIcon={'eye-off-outline'}
                        textname={'Email'}
                        placeholderText={'Enter your email '}
                        placeholderTextColor={'#868686'}
                        textValue={email}
                        onChangeTextHandler={(val) => setemail(val)}
                        rightIconOnpressHandler={() => setisVisible(!isVisible)}
                        keyboardType={'email-address'}

                    />
                    <View style={{ marginBottom: 30 }}></View>
                    <ButtonField
                        bgColor={'#582ED0'}
                        loginBtnText={'Reset'}
                        color={'#fff'}
                        height={60}
                        marginHorizontal={0}
                        onPress={() => resetHandler()}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.create_account_text}> Login</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.circle}></View>
            <View style={styles.circle2}></View>
            <View style={styles.circle3}></View>
        </View>
    )
}

export default ForgotPassword

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
        top: 300
    },
    welcome_text_style: {
        fontFamily: 'Raleway',
        fontSize: 60,
        fontWeight: '800',
        lineHeight: 62,
        position: 'absolute',
        width: 302,
        height: 126,
        left: 40,
        top: 100,
        color: '#FFFFFF'
    },
    bottom_top_text_style: {
        color: '#000000',
        fontFamily: 'Raleway',
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 30,
        lineHeight: 21
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
        top: 229,
        right: 26,
        borderWidth: 10,
        borderColor: '#706EFD',
    }


})