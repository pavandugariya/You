import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { addSingleArrayElemets, addArrayElemets } from '../Redux/Action/CartAction/CartAction';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Pinchable from 'react-native-pinchable';
import { getData, postData, postDataSecond } from '../api/axios/axiosApi';

const imageUri = [
    'https://m.media-amazon.com/images/I/61HWZntOkzL._SY450_.jpg',
    'https://5.imimg.com/data5/RH/QC/MY-4362497/product-upload-services-500x500.jpg',
    'https://carorbis.com/wp-content/uploads/2022/02/Auto-detailing-and-care-01-400x400.png',
    'https://d11unpj7eou730.cloudfront.net/thumbs/p-nc-p-s400-ver4/images/cars/generic/Wax-Polish.jpg',
    'https://5.imimg.com/data5/RH/QC/MY-4362497/product-upload-services-500x500.jpg',
    'https://cdn.thewirecutter.com/wp-content/uploads/2019/08/washing-detailing-car-washing-regular-washing-lowres-0924.jpg'

]
const ProductDetail = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { id } = route.params;
    const { width } = useWindowDimensions();
    const [showIndicator, setShowIndicator] = useState(true)
    var isadd = false;
    const ReducerCardData = useSelector((state) => state.CartR);
    const [items, setitems] = useState([])

    const addToCardHandler = async (item) => {
        ToastAndroid.show("Added to cart !",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
        const dataObj = {
            "product_id": item.id.toString(),
            "quantity": '1'
        }
        try {
            const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/cocart/v1/add-item/`, dataObj)
            if (res.product_id === item.id) {
                getCardData()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [active, setactive] = useState('1')
    useEffect(() => {
        GetProductData();
    }, [])

    const GetProductData = async () => {
        try {
            // console.log('data' + id);
            const res = await getData(`https://automart.codesfortomorrow.com/wp-json/wc/v3/products/${id}`)
            setShowIndicator(false);
            // setProductData(res)
            setitems(res)
            // console.log(res);
        } catch (error) {
            console.log(error + 'errors');
        }
    }
    //get card data
    const getCardData = async () => {
        try {
            const res = await getData('https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart');
            dispatch(addArrayElemets(res.items));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            {
                showIndicator == true ? <ActivityIndicator size={50} style={{ top: 50 }} /> :

                    <>
                        <ScrollView>
                            <View style={styles.img_container}>
                                <ScrollView
                                    pagingEnabled
                                    horizontal={true}
                                >
                                    {
                                        items.images && items.images.map((item, index) => {
                                            return (
                                                <View key={index} style={{ width: 320, height: '100%', margin: 10 }}>
                                                    <Pinchable >
                                                        <Image
                                                            source={{ uri: item.src }}
                                                            style={{ height: '100%', width: '100%' }}
                                                            resizeMode='stretch'
                                                        />
                                                    </Pinchable>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.details_top_container}>
                                <View style={styles.col_style}>
                                    {/* <Text style={styles.name_col1_style}>Name</Text> */}
                                    <Text style={styles.name_col2_style}>{items.name}</Text>
                                </View>
                                <View style={styles.col_style}>
                                    {/* <Text style={styles.name_col1_style}>Price</Text> */}
                                    <Text style={[styles.name_col2_style, { fontSize: 17 }]}>₹ {items.price}</Text>
                                </View>
                                {items.description &&
                                    <View style={styles.col_style}>

                                        <RenderHtml
                                            contentWidth={width}
                                            source={{ html: items.description }}
                                            baseStyle={{ color: '#000', fontFamily: 'Raleway', fontSize: 15 }}
                                        />
                                    </View>
                                }

                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginHorizontal: 0, paddingHorizontal: 10 }}>

                            {ReducerCardData.cartarray.map((item, index) => {
                                if (item.id === items.id) {
                                    // console.log('ids' + item.id + '===' + items.id + item.name + '===' + items.name);
                                    { isadd = true }
                                }
                            })}
                            {isadd == false ?
                                <ButtonField
                                    loginBtnText='Add To Cart'
                                    bgColor={'#5956E9'}
                                    color={'#fff'}
                                    height={50}
                                    width={'43%'}
                                    marginHorizontal={5}
                                    onPress={() => addToCardHandler(items)}
                                />
                                : isadd == true &&
                                <>
                                    <ButtonField
                                        loginBtnText='Go To Cart'
                                        bgColor={'#5956E9'}
                                        color={'#fff'}
                                        height={50}
                                        width={'43%'}
                                        marginHorizontal={5}
                                        onPress={() => navigation.navigate('Cart')}
                                    />
                                    {isadd = false}
                                </>

                            }
                            <ButtonField
                                loginBtnText='Buy Now'
                                bgColor={'#222154'}
                                color={'#fff'}
                                height={50}
                                width={'43%'}
                                marginHorizontal={5}
                                onPress={() => navigation.navigate('AddressPaymentDetails')}
                            />
                        </View>
                    </>
            }
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img_container: {
        height: 350,
        width: '98%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    details_top_container: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    name_col1_style: {
        flex: 1, fontSize: 16
    },

    name_col2_style: {
        fontSize: 18,
        fontFamily: 'Raleway',
        color: '#000',


    },
    col_style: {
        flexDirection: 'row',
        marginHorizontal: 20
    }
})