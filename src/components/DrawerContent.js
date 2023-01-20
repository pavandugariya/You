import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'


// import { AuthContext } from '../../context';
import Icone from 'react-native-vector-icons/MaterialIcons';
import {
    Avatar, Title, Caption,
    Paragraph, Drawer, Text,
    TouchableRipple, Switch,
    useTheme,
} from 'react-native-paper'





const DrawerContent = (props) => {



    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    // const toggleThemes = () => {
    //     setDarkTheme(!isDarkTheme);
    // }
    const paperTheme = useTheme();


    return (
        <View style={{ flex: 1, backgroundColor: '#5956E9' }}>
            <DrawerContentScrollView {...props}>
                <View>
                    {/* <View style={{ margin: 10, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Avatar.Image source={{ uri: 'https://avatars.githubusercontent.com/u/117146659?s=400&u=3d665cf86c3e2d89866b616fa3c0caf9afd1d8dd&v=4' }} size={80} />
                        </View>
                        <View>
                            <Text>Pavan Dugariya</Text>
                            <TouchableOpacity style={styles.go_to_profile_style}
                                onPress={() => props.navigation.navigate('Profile')}
                            >
                                <Text> Go To Profile</Text>

                            </TouchableOpacity>

                        </View>
                    </View> */}

                    <Drawer.Section style={{ marginTop: 30 }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icone name='home'
                                    size={size}
                                    color={color} />
                            )}
                            label={'Home'}
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem

                            icon={({ color, size }) => (
                                <Icone name='category'
                                    size={size}
                                    color={color} />
                            )}
                            label={'category'}
                            onPress={() => { props.navigation.navigate('Category') }}
                        />
                        <DrawerItem

                            icon={({ color, size }) => (
                                <Icone name='notifications'
                                    size={size}
                                    color={color} />
                            )}
                            label={'Notification'}
                            onPress={() => { props.navigation.navigate('Notification') }}

                        />
                        <DrawerItem

                            icon={({ color, size }) => (
                                <Icone name='settings'
                                    size={size}
                                    color={color} />
                            )}
                            label={'Setting'}
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title='Preference'>
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents='none'>
                                    <Switch value={paperTheme.dark} />

                                </View>
                            </View>
                        </TouchableRipple>

                    </Drawer.Section> */}

                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDraweSection} >
                <DrawerItem

                    icon={({ color, size }) => (
                        <Icone name='logout'
                            size={size}
                            color={color} />
                    )}
                    label={'Sign Out'}
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>

        </View>
    )
}

const styles = StyleSheet.create({

    bottomDraweSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    go_to_profile_style: {

        backgroundColor: 'transparent',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        margin: 10,
        padding: 5
    }
})

export default DrawerContent