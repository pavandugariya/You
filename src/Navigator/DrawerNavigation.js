import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import Profile from '../screens/Profile';
import DrawerContent from '../components/DrawerContent';
import CustomDraweContent from '../components/CustomDraweContent';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={() => <CustomDraweContent
                iconColor={'#fff'}
                iconSize={24}
            />}
        // drawerContent={props => <DrawerContent {...props} /> }

        >
            <Drawer.Screen name="Home Page" component={BottomNavigator}
                options={{ headerShown: false }}
            />
            {/* <Drawer.Screen name="Article" component={Article} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigation