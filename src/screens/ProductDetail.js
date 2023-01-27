import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, ImageBackground } from 'react-native'
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
import Icon from 'react-native-vector-icons/Ionicons'
import Iconss from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../utils/color';
const imageUri = [
    'https://m.media-amazon.com/images/I/61HWZntOkzL._SY450_.jpg',
    'https://5.imimg.com/data5/RH/QC/MY-4362497/product-upload-services-500x500.jpg',
    'https://carorbis.com/wp-content/uploads/2022/02/Auto-detailing-and-care-01-400x400.png',
    'https://d11unpj7eou730.cloudfront.net/thumbs/p-nc-p-s400-ver4/images/cars/generic/Wax-Polish.jpg',
    'https://5.imimg.com/data5/RH/QC/MY-4362497/product-upload-services-500x500.jpg',
    'https://cdn.thewirecutter.com/wp-content/uploads/2019/08/washing-detailing-car-washing-regular-washing-lowres-0924.jpg'

]
const ProductDetail = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { id, quantity } = props.route.params;
    const { width } = useWindowDimensions();
    const [showIndicator, setShowIndicator] = useState(true)
    var isadd = false;
    const ReducerCardData = useSelector((state) => state.CartR);
    const [items, setitems] = useState([])
    //    read more code
    const des = items.description && items.description.length;
    const [readMore, setreadMore] = useState(true)
    const [showtext, setShowtext] = useState(400)
    const [like, setlike] = useState(false)



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
        // console.log('product details                     ', navigation.getState(),);
        console.log('....................*....................');
        GetProductData();

    }, [navigation.isFocused()])

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

    const buyHandler = async () => {
        // navigation.navigate('AddressPaymentDetails')
        setShowIndicator(false)
        const dataObj = {
            "line_items": [
                {
                    "product_id": items.id,
                    "quantity": quantity != 0 ? quantity : 1,
                },


            ]
        }
        try {
            const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/wc/v3/orders`, dataObj);
            const id = res.id;
            const price = res.total;
            console.log(res);
            id && navigation.navigate('AddressPaymentDetails', { id: id, price: price })

        } catch (error) {
            console.log(error);
        }

        setShowIndicator(true)
    }
    return (
        <View style={styles.container}>
            {
                showIndicator == true ? <ActivityIndicator size={50} style={{ top: 50 }} /> :

                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.img_container}>
                                <ScrollView
                                    pagingEnabled
                                    horizontal={true}
                                // showsHorizontalScrollIndicator={false}
                                >
                                    {
                                        items.images && items.images.map((item, index) => {
                                            return (
                                                <View key={index} style={{ width: 320, height: '100%', margin: 20 }}>
                                                    <ImageBackground
                                                        resizeMode='stretch'
                                                        style={{ height: '100%', width: '100%', borderRadius: 10, overflow: 'hidden' }}
                                                        source={require('../../assets/images/bg14.png')}>

                                                        <Pinchable >
                                                            <Image
                                                                source={{ uri: item.src }}
                                                                style={{ height: '100%', width: '100%', borderRadius: 5, }}
                                                                resizeMode='stretch'
                                                            />
                                                        </Pinchable>
                                                    </ImageBackground>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                                <TouchableOpacity
                                    onPress={() => { setlike(!like) }}
                                    style={{ position: 'absolute', top: 13, right: 15 }}>
                                    <Icon name={like ? 'heart' : 'heart-outline'} size={25} color={like ? 'red' : '#000'}
                                    // style={{ backgroundColor: like ? 'red' : '', overflow: 'hidden', }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.details_top_container}>
                                <View style={styles.col_style}>
                                    <Text style={styles.name_col2_style}>{items.name}</Text>
                                </View>
                                <View style={styles.col_style}>
                                    <Text style={[styles.name_col2_style, { fontSize: 22, marginVertical: 5 }]}>₹ {items.price}</Text>
                                    <View >
                                        <Text>Special Offers</Text>
                                        <View style={styles.special_offer_container}>
                                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                                <View style={styles.special_offer_inner_container}>
                                                    <View style={{}}>
                                                        <Iconss name='local-offer' size={20} color={'#6AC1FB'} />
                                                    </View>
                                                    <View style={{}}>
                                                        <Text style={styles.special_offer_text_style}>Get Flate 10% Off</Text>
                                                        <Text style={styles.special_offer_text2_style}>Discount on Our Products</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.special_offer_inner_container}>
                                                    <View style={{}}>
                                                        <Iconss name='local-offer' size={20} color={'#6AC1FB'} />
                                                    </View>
                                                    <View style={{}}>
                                                        <Text style={styles.special_offer_text_style}>Save 50% on this Order</Text>
                                                        <Text style={styles.special_offer_text2_style}>Discount on Our Products</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.special_offer2_inner_container}>
                                                    <View style={{}}>
                                                        <Icon name='gift' size={22} color={'#44A037'} />
                                                    </View>
                                                    <View style={{}}>
                                                        <Text style={styles.special_offer_text_style}>Free Service this Product</Text>
                                                        <Text style={styles.special_offer_text2_style}>Flat 350 Cashback</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.special_offer2_inner_container}>
                                                    <View style={{}}>
                                                        <Icon name='gift' size={22} color={'#44A037'} />
                                                    </View>
                                                    <View style={{}}>
                                                        <Text style={styles.special_offer_text_style}>Get Flate 10% Off</Text>
                                                        <Text style={styles.special_offer_text2_style}>Discount on Our Products</Text>
                                                    </View>
                                                </View>
                                            </ScrollView>

                                        </View>
                                    </View>
                                </View>
                                {items.description &&
                                    <View style={styles.col_style}>
                                        <RenderHtml
                                            contentWidth={width}
                                            source={{ html: items.description.slice(0, showtext) }}
                                            baseStyle={{
                                                color: '#000', fontFamily: 'Raleway', fontSize: 15,
                                            }}
                                        />
                                        {
                                            readMore ?
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'baseline',
                                                        justifyContent: 'flex-start'
                                                    }}
                                                    onPress={() => {
                                                        setreadMore(false)
                                                        setShowtext(des)
                                                    }}>
                                                    <Text style={styles.readmore_style}>Full description</Text>
                                                    <Icon name='arrow-forward-outline' size={14} color={colors._theme_primary_color} style={{ top: 1 }} />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'baseline',
                                                        justifyContent: 'flex-start'
                                                    }}
                                                    onPress={() => {
                                                        setreadMore(true)
                                                        setShowtext(400)
                                                    }}>
                                                    <Text style={styles.readmore_style}>See less</Text>
                                                </TouchableOpacity>
                                        }

                                    </View>
                                }

                            </View>
                        </ScrollView>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                            marginHorizontal: 0,
                            paddingHorizontal: 10,
                            backgroundColor: '#ffffff'
                        }}>

                            {ReducerCardData.cartarray.map((item, index) => {
                                if (item.id === items.id) {
                                    // console.log('ids' + item.id + '===' + items.id + item.name + '===' + items.name);
                                    { isadd = true }
                                }
                            })}
                            {isadd == false ?
                                <ButtonField
                                    loginBtnText='Add To Cart'
                                    bgColor={colors._theme_primary_color}
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
                                onPress={() => buyHandler()}
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
        flex: 1,
        backgroundColor: colors._bg_color
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
        // marginHorizontal: 10,
        // marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
    },
    name_col1_style: {
        flex: 1, fontSize: 16
    },

    name_col2_style: {
        fontSize: 20,
        fontFamily: 'Raleway',
        color: '#000',
        lineHeight: 32
    },
    col_style: {
        marginHorizontal: 20,
        // backgroundColor: '#000'
    },
    readmore_style: {
        fontFamily: 'Raleway',
        fontSize: 14,
        color: colors._theme_primary_color
    },
    special_offer_inner_container: {
        flexDirection: 'row',
        borderWidth: 1,
        width: 250,
        justifyContent: 'space-around',
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#6AC1FB',
        alignItems: 'center',
        backgroundColor: '#f4f9ff',
        marginRight: 10,
        // overflow: 'hidden'
    },
    special_offer_text_style: {
        color: '#000',
        fontFamily: 'Ralwey',
        fontSize: 15,

    },
    special_offer2_inner_container: {
        flexDirection: 'row',
        borderWidth: 1,
        width: 250,
        justifyContent: 'space-around',
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#44A037',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#f5fff6',
    },
    special_offer_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    special_offer_text2_style: {
        color: '#777',
        fontFamily: 'Ralwey',
        fontSize: 14,
    },
})