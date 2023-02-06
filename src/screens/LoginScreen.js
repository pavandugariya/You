import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Appearance } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInputField from '../components/CustomInputField'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../api/axios/axiosApi';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RestoreToken, isLoadingSet, setEmailId, setUserId } from '../Redux/Action/AuthAction/AuthAction';

const LoginScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setisVisible] = useState(true)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const dataObj = {
        // email: email,
        username: userName.toLowerCase(),
        password: password,
    }

    const loginHandler = async () => {
        try {
            const res = await postData('https://automart.codesfortomorrow.com/wp-json/jwt-auth/v1/token', dataObj)
            console.log(res);
            if (res == undefined || res == 'AxiosError: Request failed with status code 403') {
                alert('please fill correct details')
            }
            else {
                await storeTokenData(res);
            }
        } catch (error) {
            console.log('Error' + error);
        }

    }
    const storeTokenData = async (value) => {
        try {
            const res = await AsyncStorage.setItem('userToken', value.token)
            const email = await AsyncStorage.setItem('userEmail', value.user_email)
            const userId = await AsyncStorage.setItem('userID', value.user_id)
            console.log(userId, 'userID...>', value.user_id);
            dispatch(RestoreToken(value.token))
            dispatch(setEmailId(value.user_email))
            dispatch(setUserId(value.user_id));

        } catch (e) {
            console.log(e);
        }

    }
    return (
        <View style={[styles.container,]} >
            {/* { backgroundColor: themes == 'LIGHT' ? '#5956EA' : '#000' } */}
            <Text style={[styles.welcome_text_style,]}>Welcome back</Text>
            <ScrollView style={[styles.bottom_container]}>
                <Text style={[styles.bottom_top_text_style]}>Login</Text>
                <CustomInputField
                    leftIcon={'person-outline'}
                    secondRightIcon={'eye-off-outline'}
                    textname={'User Name'}
                    placeholderText={'Enter your user name '}
                    textValue={userName}
                    onChangeTextHandler={(val) => setUserName(val)}
                    placeholderTextColor={'#868686'}

                // colors={themes == 'LIGHT' ? '#868686' : '#fff'}
                // color={themes == 'LIGHT' ? '#000' : '#fff'}
                />
                <CustomInputField
                    leftIcon={'lock-closed-outline'}
                    rightIcon={'eye-outline'}
                    secondRightIcon={'eye-off-outline'}
                    textname={'Password'}
                    placeholderText={'Enter your password '}
                    isVisible={isVisible}
                    textValue={password}
                    onChangeTextHandler={(val) => setPassword(val)}
                    rightIconOnpressHandler={() => setisVisible(!isVisible)}
                    placeholderTextColor={'#868686'}
                // colors={themes == 'LIGHT' ? '#868686' : '#fff'}

                />


                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.fogote_pass_text_style}>Forgot password?</Text>
                </TouchableOpacity>
                <ButtonField
                    bgColor={'#582ED0'}
                    loginBtnText={'Login'}
                    color={'#fff'}
                    height={60}
                    marginHorizontal={0}
                    onPress={() => loginHandler()}
                />
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.create_account_text}> Create Account</Text>
                </TouchableOpacity>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </ScrollView>
            {/* <View style={[styles.bottom_container]}>
               
            </View> */}

            <View style={styles.circle}></View>
            <View style={[styles.circle2,]}></View>
            <View style={[styles.circle3,]}></View>
        </View>
    )
}
// {
//     <Text style={[styles.bottom_top_text_style]}>Login</Text>
//                 <CustomInputField
//                     leftIcon={'person-outline'}
//                     secondRightIcon={'eye-off-outline'}
//                     textname={'User Name'}
//                     placeholderText={'Enter your user name '}
//                     textValue={userName}
//                     onChangeTextHandler={(val) => setUserName(val)}
//                     placeholderTextColor={'#868686'}

//                 // colors={themes == 'LIGHT' ? '#868686' : '#fff'}
//                 // color={themes == 'LIGHT' ? '#000' : '#fff'}
//                 />
//                 <CustomInputField
//                     leftIcon={'lock-closed-outline'}
//                     rightIcon={'eye-outline'}
//                     secondRightIcon={'eye-off-outline'}
//                     textname={'Password'}
//                     placeholderText={'Enter your password '}
//                     isVisible={isVisible}
//                     textValue={password}
//                     onChangeTextHandler={(val) => setPassword(val)}
//                     rightIconOnpressHandler={() => setisVisible(!isVisible)}
//                     placeholderTextColor={'#868686'}
//                 // colors={themes == 'LIGHT' ? '#868686' : '#fff'}

//                 />


//                 <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
//                     <Text style={styles.fogote_pass_text_style}>Forgot password?</Text>
//                 </TouchableOpacity>
//                 <ButtonField
//                     bgColor={'#582ED0'}
//                     loginBtnText={'Login'}
//                     color={'#fff'}
//                     height={60}
//                     marginHorizontal={0}
//                     onPress={() => loginHandler()}
//                 />
//                 <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                     <Text style={styles.create_account_text}> Create Account</Text>
//                 </TouchableOpacity>

// }
export default LoginScreen

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
        top: 256
    },
    welcome_text_style: {
        fontFamily: 'Raleway',
        fontSize: 65,
        fontWeight: '800',
        lineHeight: 62,
        position: 'absolute',
        width: 302,
        height: 126,
        left: 40,
        top: 99,
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
        fontWeight: '600',
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
        top: 189,
        right: 26,
        borderWidth: 10,
        borderColor: '#706EFD',
    }

})