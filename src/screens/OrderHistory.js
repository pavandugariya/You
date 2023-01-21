import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import ButtonField from '../components/ButtonField'
import { useNavigation } from '@react-navigation/native';
import HomeModal from '../components/HomeModal';
import Icon from 'react-native-vector-icons/MaterialIcons'
const data = [
    {
        name: 'Polishing',
        Image: 'https://cdn-icons-png.flaticon.com/512/4632/4632999.png',
        status: 'Arriving tomorrow',
        status1: 'Arriving',
        price: 100,
        Id: '1Lkdlfkddse5895689688',
    },
    {
        name: 'Seat',
        Image: 'https://cdn-icons-png.flaticon.com/512/9184/9184014.png',
        price: 300,
        Id: 2,
        status: 'Order Not Placed',
        status1: 'Order Not Placed',

    },
    {
        name: 'Tire',
        Image: 'https://cdn-icons-png.flaticon.com/512/6155/6155738.png',
        price: 200,
        status: 'Delivered on Nov 28,2023',
        Id: 3,
        status1: 'Delivered',

    },
    {
        name: 'Gear',
        Image: 'https://cdn-icons-png.flaticon.com/512/9068/9068609.png',
        price: 400,
        Id: 4,
        status: 'Order is Canceled',
        status1: 'OrderCanceled',
    },


];
const OrderHistory = () => {
    const [isEmpty, setisEmpty] = useState(false)
    const [Review, setReview] = useState('')
    const navigation = useNavigation();
    const reviewHandler = (val) => {
        setReview(val);
    }
    const clickHandler = (item) => {
        navigation.navigate('Order Details', {
            item: item
        })
    }
    return (
        <>
            {!isEmpty ?
                <View style={styles.top_container}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.top_bottom_container} >
                                    <TouchableOpacity style={styles.img_container} onPress={() => clickHandler(item)}>
                                        <Image source={{ uri: item.Image }}
                                            style={{ height: '100%', width: '100%', resizeMode: 'stretch' }}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.name_container}>
                                        <TouchableOpacity onPress={() => clickHandler(item)}>
                                            <Text style={{ fontFamily: 'Raleway', fontSize: 17, color: item.status == 'Order is Canceled' ? 'red' : 'green' }}>{item.status}</Text>
                                            <Text style={styles.name_text_style}>{item.name}</Text>
                                        </TouchableOpacity>
                                        {item.status1 == 'Delivered' &&
                                            <>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={() => reviewHandler('1')}>
                                                        <Icon name='star-rate' size={20}
                                                            style={{ color: Review >= 1 ? 'green' : '#777', }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => reviewHandler('2')}>
                                                        <Icon name='star-rate' size={20} color={Review >= 2 ? 'green' : '#7777'} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => reviewHandler('3')}>
                                                        <Icon name='star-rate' size={20} color={Review >= 3 ? 'green' : '#7777'} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => reviewHandler('4')}>
                                                        <Icon name='star-rate' size={20} color={Review >= 4 ? 'green' : '#7777'} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => reviewHandler('5')}>
                                                        <Icon name='star-rate' size={20} color={Review >= 5 ? 'green' : '#7777'} />
                                                    </TouchableOpacity>
                                                </View>
                                                {Review == '' && <Text>Rate this product now</Text>}
                                            </>
                                        }
                                    </View>
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 18 }} onPress={() => clickHandler(item)} >
                                        <Icon name='chevron-right' size={20} color='#000' />
                                    </TouchableOpacity>

                                </View>
                            )
                        }}
                    />

                </View>

                : <EmptyOrderHistory />
            }

        </>
    )
}

export default OrderHistory
const EmptyOrderHistory = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true)

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Saly-11.png')}
                style={{ height: 300, width: 300, top: 100 }}
            />
            <View style={styles.bottom_view}>
                <Text style={styles.no_history_txt}>No history yet</Text>
                <Text style={styles.no_history_bottom_txt}>Hit the orange button down below to Create an order</Text>
                <ButtonField
                    loginBtnText={'Start ordering'}
                    bgColor={'#58C0EA'}
                    width={224}
                    height={50}
                    color={'#fff'}
                    top={20}
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
            <HomeModal
                clickHandler={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                uri={require('../../assets/images/homeModel.png')}
                textHeading={'Check your Order'}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    //empty order history style
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    no_history_txt: {
        fontFamily: 'Raleway',
        fontSize: 28,
        color: '#000000',
        fontWeight: '600',
        lineHeight: 32,
    },
    bottom_view: {
        top: 120,
        alignItems: 'center',
        justifyContent: 'center'
        // width: 250
    },
    no_history_bottom_txt: {
        width: 217,
        height: 48,
        fontFamily: 'Raleway',
        fontSize: 17,
        alignItems: 'center',
        lineHeight: 23,
        fontWeight: '400',
        color: '#000000',
        top: 10,
    },
    top_container: {
        backgroundColor: '#F5F5F8',
        flex: 1,
    },
    top_bottom_container: {
        width: '95%',
        paddingVertical: 15,
        backgroundColor: '#ffff',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    img_container: {
        height: 80,
        width: '25%',


    },
    name_container: {

        width: '70%',
        marginHorizontal: 10
    },
    name_text_style: {
        fontFamily: 'Raleway',
        fontSize: 17,
        color: '#000',
        marginVertical: 5,
    }
})