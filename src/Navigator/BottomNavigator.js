import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSelector } from 'react-redux';


const Tab = createMaterialBottomTabNavigator();


const BottomNavigator = () => {
    const ReducerCardData = useSelector((state) => state.CartR);
    const badgesCount = ReducerCardData.cartarray.length;
    // const badgesCount = 0;
    return (
        <Tab.Navigator
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ marginHorizontal: 10 }}
            shifting={true}
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    // tabBarColor: '#5956E9',
                    // title: 'Home',*asAnimatable
                    tabBarIcon: () => {
                        return (
                            <Ionicons name='home-outline' size={20} color='blue' />
                        );
                    },
                }}
            />
            <Tab.Screen name="Notification" component={Notification}
                options={{
                    tabBarIcon: () => <Ionicons name='notifications-outline' size={25} color='blue' />
                }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: () => <Ionicons name='person-outline' size={25} color='blue' />
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarBadge: badgesCount,
                tabBarIcon: () => <Ionicons name='cart-outline' size={25} color='blue' />
            }} />
        </Tab.Navigator>
    )
}

export default BottomNavigator