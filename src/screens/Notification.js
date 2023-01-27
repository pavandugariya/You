import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, FlatList, Button, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { colors } from '../utils/color';

const notificationIcon = <Ionicons name='notifications-outline' size={18} color={colors._theme_primary_color} />
const notificationData = [
    {
        name: 'Detailmax Prime X5',
        date: '15 / 04 / 2022'
    },
    {
        name: '9H Detailmax Prime X5 9H Detailmax Prime X5',
        date: '14 / 04 / 2023'
    },
];

const Notification = () => {
    const navigation = useNavigation();
    const [notificationD, setnotificationD] = useState(notificationData)
    const [masterData, setMasterData] = useState(notificationData)
    const [searchText, setsearchText] = useState('')
    const [isEmpty, setisEmpty] = useState(false)


    const deleteItem = (index) => {
        console.log(index);
        let a = notificationD;
        if (notificationD.length === 1) {
            setisEmpty(true)
        }
        a.splice(index, 1);
        setnotificationD([...a]);
    };
    const searchHandler = (val) => {
        const newData = masterData.filter(item => {
            return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
        setnotificationD(newData);
        setsearchText(val);
    }
    return (
        <>
            {isEmpty == false ?
                <View style={styles.container2}>
                    <CustomHeader
                        icon_name='reorder-three-outline'
                        icon_size={40}
                        icon_color={'#000'}
                        backgroundColor={'#fff'}
                        textInput
                        onPressLeftIcon={() => {
                            navigation.openDrawer();
                        }}
                        value={searchText}
                        onChangeText={(val) => searchHandler(val)}
                    />
                    <Text style={{ marginHorizontal: 35, marginTop: 15, fontFamily: 'Raleway', fontSize: 17, color: colors._theme_primary_color }}>{`Notifications(${notificationD.length})`}</Text>
                    <View style={styles.top_container}>
                        <FlatList
                            data={notificationD}
                            renderItem={({ item, index }) => {
                                return (
                                    <ItemBox
                                        data={item}
                                        ind={index}
                                        handlerDelet={() => deleteItem(index)}
                                    />
                                )
                            }}
                        />
                    </View>
                </View>
                : <EmptyNotification />}
        </>
    );
}

const ItemBox = (props) => {
    const swipeableRef = React.useRef(null);
    let row = [];
    let prevOpenedRow;
    const renderRightActions = () => {
        return (
            <View
                style={{
                    margin: 0,
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 70,
                }}>
                <Button color="red" onPress={props.handlerDelet} title="DELETE"></Button>
            </View>
        );
    };
    const closeSwipeable = () => {
        swipeableRef.current.close();
    }
    return (
        <Swipeable
            renderRightActions={() =>
                renderRightActions()
            }
            ref={swipeableRef}
            // onSwipeableOpen={closeSwipeable()}
            // onSwipeableOpen={closeRow(props.ind)}
            rightOpenValue={-100}
        >
            <View style={styles.notification_top_box}>
                {notificationIcon}
                <View style={styles.notification_inner_box}>
                    <Text numberOfLines={1} style={styles.text_name_style}>{props.data.name}</Text>
                    <View style={styles.data_box}>
                        <Text style={styles.text_date_style}>{props.data.date}</Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    )
}
const EmptyNotification = ({ }) => {
    const back = <Ionicons name='arrow-back-outline' size={24} color={'#000'} />
    const navigation = useNavigation();
    return (
        <View style={styles.contaner}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 20, left: 20 }}>
                {back}
            </TouchableOpacity>
            <Ionicons name='notifications-outline' size={70} color={colors._theme_primary_color}
                style={{ transform: [{ rotate: '-15deg' }], }}
            />
            <Text style={{ fontFamily: 'Raleway', fontSize: 20, marginVertical: 50 }}>You currently have no notifications</Text>
        </View >
    )
}
const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors._bg_color,
    },
    container2: {
        flex: 1,
        backgroundColor: colors._bg_color,
    },
    top_container: {
        top: 30,
        marginHorizontal: 10,
        marginVertical: 10,
        flex: 1,
    },
    notification_top_box: {
        height: 60,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f2f5f5',
        margin: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
    },
    notification_inner_box: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // alignItems: 'flex-start'

    },
    text_name_style: {
        flex: 2,
        fontFamily: 'Raleway',
        fontSize: 15,
        color: '#000'
    },
    text_date_style: {

        fontFamily: 'Raleway',
        fontSize: 12,
        color: '#000',
    },
    data_box: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default Notification;