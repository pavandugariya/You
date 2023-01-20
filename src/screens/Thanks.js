import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import Share from 'react-native-share';
import ViewShot from "react-native-view-shot";

const Thanks = () => {
    const navigation = useNavigation();
    const ref = useRef();
    const [image, setimage] = useState()
    useEffect(() => {
        setTimeout(() => {
            try {

                ref.current.capture().then(uri => {
                    // console.log("do something with ", uri);
                    setimage(uri)
                });
            } catch (error) {
                console.log(error);
            }
        }, 2000);

    }, [])


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
        <View style={styles.container}>
            <ViewShot
                ref={ref}
                options={{ fileName: "Your Order receipt", format: "jpg", quality: 0.9 }}
                style={{ backgroundColor: '#F5F5F8' }}
            >
                <Animatable.View
                    animation={'slideInUp'}
                    style={styles.top_container}>
                    <Icon name='verified' size={100} color={'green'} />
                    <Text style={{ fontSize: 25, color: '#000' }}>Your Order is Complete!</Text>
                </Animatable.View>
                <View style={styles.shipping_box}>
                    <Text style={styles.txt_style}>Shipping address</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='location-on' size={25} color={'#5956E9'} />
                        <Text style={styles.txt_style2}> Village Devas nagar indore bypass khujner </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='call' size={25} color={'#5956E9'} />
                        <Text style={styles.txt_style2}>+91 8224855467 </Text>
                    </View>
                </View>
                <View style={styles.shipping_box}>
                    <Text style={styles.txt_style}>Billing address</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='location-on' size={25} color={'#5956E9'} />
                        <Text style={styles.txt_style2}> Village Devas nagar indore bypass khujner </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='call' size={25} color={'#5956E9'} />
                        <Text style={styles.txt_style2}>+91 8224855467 </Text>
                    </View>
                </View>
                {/* Order Summary */}
                <Text style={[styles.txt_style, { marginHorizontal: 40, marginTop: 10, marginBottom: 0 }]}>Order Summary</Text>
                <View style={styles.order_top_container} >
                    <View style={styles.order_inner_first_container}>
                        <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Order Amount</Text>
                        <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Delivery Fees</Text>
                        <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Discount</Text>
                    </View>
                    <View style={styles.ordert_inner_second_container}>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >5000</Text>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >100</Text>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >-2000</Text>
                    </View>
                </View>
                {/* // horizontal line */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 40,
                        marginTop: 5,
                    }}
                />
                <View style={styles.order_top_container} >
                    <View style={styles.order_inner_first_container}>
                        <Text style={[styles.order_txt_style, { marginTop: 4 }]} >You have Paid</Text>
                    </View>
                    <View style={styles.ordert_inner_second_container}>
                        <Text style={[styles.order_txt_style, { color: '#000', marginTop: 4 }]} >2900</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.share_btn}
                    onPress={() => myCustomShare()}
                >
                    <Icon name='share' size={30} color={'green'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.continue_shopping_btn}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', fontFamily: 'Raleway' }}>Continue shoppings</Text>
                </TouchableOpacity>
            </ViewShot>
        </View>
    )
}

export default Thanks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F8',
    },
    top_container: {
        backgroundColor: '#F5F5F8',
        height: 160,
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
        top: 30
    },
    shipping_box: {
        marginHorizontal: 50,
        // backgroundColor: '#F5F5F8'
    },
    txt_style: {
        fontSize: 20,
        fontFamily: 'Raleway',
        color: '#000',
        marginVertical: 20
    },
    txt_style2: {
        fontSize: 16,
        fontFamily: 'Raleway',
        color: '#000',
        marginHorizontal: 20,
        marginVertical: 5
    },
    order_top_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,
    },
    order_inner_first_container: {
        margin: 5
    },
    ordert_inner_second_container: {
        margin: 5,
        alignItems: 'flex-end'

    },
    order_txt_style: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Raleway'
    },
    share_btn: {
        position: 'absolute',
        right: 50,
        bottom: -90
    },
    continue_shopping_btn: {
        height: 50,
        width: 200,
        backgroundColor: '#5956E9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -100,
        right: 100
    }


})