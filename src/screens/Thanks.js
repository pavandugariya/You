import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import Share from 'react-native-share';
import ViewShot from "react-native-view-shot";
import { getData } from '../api/axios/axiosApi';
import { colors } from '../utils/color';

const Thanks = (props) => {
    console.log(props.route.params.id);
    const id = props.route.params.id;
    const navigation = useNavigation();
    const ref = useRef();
    const [image, setimage] = useState();
    const [orderData, setorderData] = useState({})
    const [showIndicator, setShowIndicator] = useState(true)
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const orderAmount = parseFloat(orderData.total) + parseFloat(orderData.discount_total);
    const deliveryFee = 10;
    const discount = (orderAmount * discountPercentage) / 100;
    const totalPay = (orderAmount) + (deliveryFee - discount);

    useEffect(() => {
        getOrderData()
        setTimeout(() => {
            try {
                ref.current.capture().then(uri => {
                    // console.log("do something with ", uri);
                    setimage(uri)
                });
            } catch (error) {
                console.log(error);
            }
        }, 3000);

    }, [])
    // fetch order data from api 
    const getOrderData = async () => {
        try {
            const res = await getData(`https://automart.codesfortomorrow.com/wp-json/wc/v3/orders/${id}`)
            setorderData(res)
            if (res.discount_total > 0) {
                setDiscountPercentage(5);
            }
            setShowIndicator(false)
        } catch (error) {
            console.log(error);
        }
    }

    // customer order information  share reciept handler 
    const myCustomShare = async () => {
        const shareOption = {
            url: image,
            message: 'Your reciept',

        }
        try {
            const ShareResponse = await Share.open(shareOption);
            // alert(ShareResponse);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ScrollView style={styles.container}>
            <ViewShot
                ref={ref}
                options={{ fileName: "Your Order receipt", format: "jpg", quality: 0.9 }}
                style={{ backgroundColor: '#F5F5F8', width: '100%', height: '84%' }}
            >
                <Animatable.View
                    animation={'slideInUp'}
                    style={styles.top_container}>
                    <Icons name='verified' size={100} color={'green'} />
                    <Text style={{ fontSize: 25, color: '#000' }}>Your Order is Complete!</Text>
                </Animatable.View>
                <Text style={styles.txt_style}>Shipping address</Text>
                <View style={styles.shipping_box}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name='location-outline' size={24} color={'#5956E9'} />
                        <Text style={styles.txt_style2}> {orderData.billing && orderData.shipping.address_1} </Text>
                    </View>
                    <View style={{ marginVertical: 8 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='call-outline' size={24} color={'#5956E9'} />
                        <Text style={styles.txt_style2}>+91 {orderData.billing && orderData.shipping.phone}</Text>
                    </View>
                </View>
                <Text style={styles.txt_style}>Billing address</Text>
                <View style={styles.shipping_box}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='location-outline' size={24} color={'#5956E9'} />
                        <Text style={styles.txt_style2}>  {orderData.billing && orderData.billing.address_1} </Text>
                    </View>
                    <View style={{ marginVertical: 8 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='call-outline' size={24} color={'#5956E9'} />
                        <Text style={styles.txt_style2}>+91 {orderData.billing && orderData.billing.phone}</Text>
                    </View>
                </View>
                {/* Order Summary */}
                <Text style={[styles.txt_style, { marginTop: 10, marginBottom: 0 }]}>Order Summary</Text>
                <View style={styles.order_top_container} >
                    <View style={styles.order_inner_first_container}>
                        <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Order Amount</Text>
                        <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Delivery Fees</Text>
                        <Text style={[styles.order_txt_style, { marginTop: 10, color: 'green' }]} >Discount</Text>
                    </View>
                    <View style={styles.ordert_inner_second_container}>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >{orderAmount}.00</Text>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >{deliveryFee}.00</Text>
                        <Text style={[styles.order_txt_style, { color: 'green', marginTop: 10 }]} >- {discount}</Text>
                    </View>
                </View>
                {/* // horizontal line */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginTop: 5,
                    }}
                />
                <View style={styles.order_top_container} >
                    <View style={styles.order_inner_first_container}>
                        <Text style={[styles.order_txt_style, { marginTop: 4 }]} >You have Paid</Text>
                    </View>
                    <View style={styles.ordert_inner_second_container}>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 4 }]} >{totalPay}</Text>
                    </View>
                </View>

                <View style={styles.bottom_top_container_style}>
                    <TouchableOpacity
                        style={styles.continue_shopping_btn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', fontFamily: 'Raleway' }}>Continue shoppings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.share_btn}
                        onPress={() => myCustomShare()}
                    >
                        <Icon name='share-social-outline' size={30} color={'green'} />
                    </TouchableOpacity>
                </View>
            </ViewShot>
        </ScrollView>
    )
}

export default Thanks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors._bg_color,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    top_container: {
        backgroundColor: '#F5F5F8',
        height: 160,
        marginHorizontal: 10,
        marginVertical: 0,
        alignItems: 'center',
        // top: 10,
    },
    shipping_box: {
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical: 10,

    },
    txt_style: {
        fontSize: 17,
        fontFamily: 'Raleway',
        color: '#000',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    txt_style2: {
        fontSize: 16,
        fontFamily: 'Raleway',
        color: '#000',
        marginHorizontal: 15,
        // marginBottom: 10,
    },
    order_top_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
    },
    order_inner_first_container: {
        margin: 5
    },
    ordert_inner_second_container: {
        margin: 5,
        alignItems: 'flex-end'

    },
    order_txt_style: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Raleway'
    },
    share_btn: {
        flex: 1,
        alignItems: 'flex-end'
    },
    continue_shopping_btn: {
        height: 50,
        width: 200,
        backgroundColor: '#5956E9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_top_container_style: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        paddingBottom: 30,
        paddingHorizontal: 20


    }


})