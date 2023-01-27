import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import BottomNavigator from './BottomNavigator';
import Category from '../screens/Category';
import ProductDetail from '../screens/ProductDetail';
import AddressPaymentDetails from '../screens/AddressPaymentDetails';
import Payment from '../screens/Payment';
import Thanks from '../screens/Thanks';
import DrawerNavigation from './DrawerNavigation';
import EditAddress from '../screens/EditAddress';
import OrderHistory from '../screens/OrderHistory';
import Favorites from '../screens/Favorites';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ForgotPassword from '../screens/ForgotPassword';
//usereducer 
import { useSelector, useDispatch, batch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import OrderDetails from '../screens/OrderDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const ReducerData = useSelector((state) => state.AuthR);
    const ReducerCardData = useSelector((state) => state.CartR);
    const badgesCount = ReducerCardData.cartarray.length;
    const dispatch = useDispatch();
    const navigation = useNavigation();


    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            {
                ReducerData.isLoading == true ?
                    (
                        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                    )
                    : ReducerData?.userToken == null ? (
                        <>
                            <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={RegistrationScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="ResetPassword" component={ForgotPassword} options={{ headerShown: false }} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
                            <Stack.Screen name="AddressPaymentDetails" component={AddressPaymentDetails}
                                options={{
                                    title: 'Order Summary',
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Icon name='arrow-back-outline' size={24} color={'#000'} />
                                        </TouchableOpacity>
                                    ),
                                }}
                            />
                            <Stack.Screen name="EditAddress" component={EditAddress} />

                            <Stack.Screen name="Order History" component={OrderHistory} />
                            <Stack.Screen name="Order Details" component={OrderDetails} />
                            <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
                            <Stack.Screen name="Category" component={Category}
                                options={({ route }) => ({
                                    headerRight: () => (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                // navigation.push('Cart')
                                                navigation.navigate('Cart')
                                                try {
                                                    const res = await AsyncStorage.setItem('Stack', JSON.stringify({ key: 'Category', id: route.params.id }))
                                                    console.log('log....', route.params);
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                        >
                                            <Icon name='cart-outline' size={24} color={'#000'} />
                                            <View style={styles.badges_container}><Text style={styles.badges_container_text}>{badgesCount}</Text></View>
                                        </TouchableOpacity>
                                    ),
                                    title: 'Category', headerTitleStyle: { fontFamily: 'Raleway-Medium', fontSize: 20, fontWeight: 'bold' }
                                })}
                            />
                            <Stack.Screen name="ProductDetail" component={ProductDetail}
                                options={({ route }) => ({
                                    title: route.params.categories,
                                    headerRight: () => (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                // navigation.push('Cart')
                                                navigation.navigate('Cart')
                                                try {
                                                    const res = await AsyncStorage.setItem('Stack', JSON.stringify({ key: 'ProductDetail', id: route.params.id }))
                                                    console.log('log....', res);
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}>
                                            <Icon name='cart-outline' size={24} color={'#000'} />
                                            <View style={styles.badges_container}><Text style={styles.badges_container_text}>{badgesCount}</Text></View>
                                        </TouchableOpacity>
                                    ),
                                    headerTitleStyle: { color: '#000', },
                                    headerTitleAlign: 'center',
                                    headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Icon name='arrow-back-outline' size={24} color={'#000'} />
                                        </TouchableOpacity>
                                    ),

                                    // headerStyle: { backgroundColor: '#5956E9' }
                                })}
                            />
                            <Stack.Screen name="Payment" component={Payment} />
                            <Stack.Screen name="Thanks" component={Thanks} options={{ headerShown: false }} />
                        </>

                    )

            }
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    badges_container: {
        position: 'absolute',
        right: -8,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 50,
        height: 17,
        width: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badges_container_text: {
        color: '#fff',
        fontSize: 10
    }
})
export default StackNavigator