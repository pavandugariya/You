import React, { useState, useEffect } from 'react'

import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonField from '../components/ButtonField';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, addArrayElemets, deleteArrayElemets } from '../Redux/Action/CartAction/CartAction';
import { deleteData, getData, postData, postDataSecond, } from '../api/axios/axiosApi';


// icones 
const plusIcon = <Ionicons name='add-outline' size={18} color={'#f2f2f2'} />
const minusIcon = <Ionicons name='remove-outline' size={18} color={'#f2f2f2'} />
const deleteIcon = <Ionicons name='trash-outline' size={20} color={'#FA4A0C'} />


const Cart = () => {
    const reducerData = useSelector((state) => state.CartR);
    const [showIndicator, setShowIndicator] = useState(true)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isEmpty, setisEmpty] = useState(true)
    useEffect(() => {
        if (reducerData.cartarray.length > 0) {
            setisEmpty(true)
        }
    }, [reducerData.cartarray, deleteHandler])



    const incrementHandler = async (item, val) => {
        dispatch(increment(val))
        //setData(data + 1)
        console.log(item.quantity.value);
        const dataObj = {
            "quantity": item.quantity.value
        }
        try {
            const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart/item/${item.item_key}`, dataObj);
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const decrementHandler = async (item, val) => {
        if (reducerData.cartarray[val].quantity.value > 1) {
            // console.log(val);
            dispatch(decrement(val))
            console.log(item.quantity.value);
            const dataObj = {
                "quantity": item.quantity.value
            }
            try {
                const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart/item/${item.item_key}`, dataObj);
                // console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

    }
    const deleteHandler = async (value, item) => {
        setShowIndicator(true);
        console.log(typeof (value) + ' ' + value);
        try {
            const res = await deleteData(`https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart/item/${value}`)
            // dispatch(deleteArrayElemets(index))

            console.log('Response the api ' + res.data);
            // setShowIndicator(false)
            if (reducerData.cartarray.length === 1) {
                setisEmpty(false);
            }
            getCardData()
            setShowIndicator(false);
        } catch (error) {
            console.log(error);
        }

    }
    const getCardData = async () => {
        try {
            const res = await getData('https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart');
            dispatch(addArrayElemets(res.items));
            setShowIndicator(true)

        } catch (error) {
            console.log(error);
        }
    }
    const checkOutHandler = async () => {
        // navigation.navigate('AddressPaymentDetails')
        try {
            const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/wc/v3/orders`);
            const id = res.id;
            id && navigation.navigate('AddressPaymentDetails', { id: id })

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {isEmpty !== false ?

                <View style={styles.contaner2}>

                    <CustomHeader
                        icon_name='reorder-three-outline'
                        headerName={'Cart'}
                        icon_size={35}
                        // right_site_icon_name='trash-outline'
                        icon_color={'#000'}
                        header_txt_size={25}
                        backgroundColor={'#F5F5F8'}
                        onPressLeftIcon={() => {
                            // alert('Your are LogOut')
                            navigation.openDrawer();
                        }}
                        onPressRightIcon={() => {
                            alert('Your are LogOut')
                        }}
                    />
                    {
                        showIndicator == false ? <ActivityIndicator size={50}
                            style={{ position: 'absolute', alignItems: 'center', top: '50%', left: '45%', justifyContent: 'center', zIndex: 1 }} /> : ''
                    }
                    <ScrollView
                    // showsHorizontalScrollIndicator={true}
                    >
                        {/* box design */}
                        <View style={{ alignItems: 'center' }}>

                            {reducerData.cartarray.map((item, index) => {
                                // { totalPrice = parseInt(item.price) + parseInt(totalPrice) }
                                // console.log(item.item_key);
                                return (
                                    <View key={index} style={styles.boxTopContainer}>
                                        <TouchableOpacity style={styles.boxInnerContainer1}
                                            onPress={() => navigation.navigate('ProductDetail', {
                                                id: item.id
                                            })}>
                                            <Image
                                                source={{ uri: item.featured_image }}
                                                style={{ height: '90%', width: '90%' }}
                                                resizeMode='stretch'
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.boxInnerContainer2}>
                                            <View>
                                                <Text numberOfLines={1} style={styles.nameTxtStyle}>{item.name}</Text>
                                                <Text style={styles.priceTxtStyle}>{item.price
                                                }</Text>
                                                <View style={styles.quantity_Box_Style}>
                                                    <Text style={styles.quantity_text_style}>Quantity</Text>
                                                    <TouchableOpacity style={styles.pluse_box_style}
                                                        onPress={() => decrementHandler(item, index)} >
                                                        {minusIcon}
                                                    </TouchableOpacity>
                                                    <Text style={{ color: '#000' }}>{item.quantity.value}</Text>
                                                    <TouchableOpacity style={styles.minus_box_style}
                                                        onPress={() => incrementHandler(item, index)}>
                                                        {plusIcon}
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.delete_btn_style}
                                                    onPress={() => deleteHandler(item.item_key, item)}  >
                                                    {deleteIcon}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            }

                        </View>

                        {/* bottom design like button and total payments  */}
                        <View style={[styles.bottom_container, {}]}>
                            <View style={styles.total_price_box}>
                                <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Raleway' }}>Total</Text>
                                <Text style={{ fontSize: 22, color: '#5956E9', fontFamily: 'Raleway-Black' }}>Rs {reducerData.totalPrice}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <ButtonField
                                    loginBtnText={'Checkout'}
                                    bgColor={'#5956E9'}
                                    height={50}
                                    width={'90%'}
                                    color={'#fff'}
                                    onPress={() => checkOutHandler()}
                                />
                            </View>
                        </View >

                    </ScrollView>
                </View>
                : <EmptyCard />}
        </>

    );
}

const EmptyCard = () => {
    const navigation = useNavigation();
    return (
        <View View style={styles.contaner} >
            <Image
                source={require('../../assets/images/Saly-11.png')}
                style={{ height: 300, width: 300, top: 100 }}
            />
            <View style={styles.bottom_view}>
                <Text style={styles.no_history_txt}>Card is Empty</Text>
                <Text style={styles.no_history_bottom_txt}>Hit the orange button down below to continiu shopping</Text>
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
        </View >
    );
}



const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        alignItems: 'center'
    },
    contaner2: {
        flex: 1,
        backgroundColor: '#F5F5F8',
        //alignItems: 'center'
    },
    boxTopContainer: {
        height: 140,
        width: '95%',
        backgroundColor: '#fff',
        marginVertical: 15,
        flexDirection: 'row',
        borderRadius: 10,
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    boxInnerContainer1: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxInnerContainer2: {
        // backgroundColor: '#f85',
        flex: 3,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',


    },
    nameTxtStyle: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Raleway',
        paddingVertical: 5,
        fontWeight: '650',
        width: '80%'

    },
    priceTxtStyle: {
        fontSize: 15,
        color: '#5956E9',
        fontFamily: 'Raleway',
        paddingVertical: 2,
        fontWeight: '600'
    },
    quantity_Box_Style: {
        flexDirection: 'row',
        marginTop: 5,
    },
    quantity_text_style: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Raleway',
        fontWeight: '600',
        marginRight: 10,
    },
    pluse_box_style: {
        backgroundColor: '#7DCCEC',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 2
    },
    minus_box_style: {
        backgroundColor: '#7DCCEC',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 2,
    },
    btn_txt: {
        color: '#F4F4F7',
        fontSize: 15,
        fontWeight: 'bold'
    },
    bottom_container: {
        width: '100%',
        position: 'relative',
        bottom: 1,
        //alignItems: 'center'

    },
    total_price_box: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 20,
    },
    delete_btn_style: {
        position: 'absolute',
        right: 15,
        // backgroundColor: 'black'

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
    }

})

export default Cart

