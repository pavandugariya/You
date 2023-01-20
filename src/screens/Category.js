import {
    StyleSheet, Text,
    View, TouchableOpacity,
    Image, ScrollView,
    Modal, ToastAndroid,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icone from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
import { deleteData, getData, postData, postDataSecond } from '../api/axios/axiosApi';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, addArrayElemets, deleteArrayElemets, addSingleArrayElemets } from '../Redux/Action/CartAction/CartAction';
const more = <Icone name='swap-vertical-outline' size={30} />
const plusIcon = <Icone name='add-outline' size={18} color={'#f33'} />
const minusIcon = <Icone name='remove-outline' size={18} color={'#f33'} />

const Category = () => {
    const route = useRoute();
    const { slug } = route.params;
    const ReducerCardData = useSelector((state) => state.CartR);
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectSort, setselectSort] = useState();
    const [active, setActive] = useState('1');
    const [showIndicator, setShowIndicator] = useState(true)
    const [productData, setProductData] = useState([]);
    const [isAdded, setisAdded] = useState(false)
    var isadd = false;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        GetCategoryProductData();
    }, [IncrementHandler])
    useEffect(() => {
        getLength()
    }, [setProductData])

    var total = 0;
    const GetCategoryProductData = async () => {
        try {
            const res = await getData('https://automart.codesfortomorrow.com/wp-json/wc/v3/products')
            setShowIndicator(false);

            setProductData(res.map(product => {
                let cartQuantity = 0;
                let item_key = null
                // To DO
                ReducerCardData.cartarray.map(item => {
                    if (item.id == product.id) {
                        cartQuantity = item.quantity.value
                        // cartQuantity++
                        item_key = item.item_key
                    }
                })
                return {
                    ...product,
                    cartQuantity,
                    item_key,
                }
            }))

        } catch (error) {
            console.log(error + 'errors');
        }
    }

    const PremiumHandler = () => {
        setActive('1');
    }
    const EconomyHandler = () => {
        setActive('2');
    }

    const addToCardHandler = async (item, index) => {
        ToastAndroid.show("Added to cart !",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
        );
        setShowIndicator(true)
        // const dataObj = {
        //     "id": item.id.toString(),
        //     "quantity": "1"
        // }
        const dataObj = {
            "product_id": item.id.toString(),
            "quantity": '1'
        }
        try {
            const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/cocart/v1/add-item/`, dataObj)
            if (res.product_id === item.id) {
                console.log(res.key);
                const _newProductData = [...productData];
                _newProductData[index].cartQuantity = 1;
                _newProductData[index].item_key = res.key;
                setProductData(_newProductData)
                getCardData()
                setShowIndicator(false)
            }
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
        // dispatch(addSingleArrayElemets(obj));
    }
    // console.log(total);
    const getLength = () => {
        productData.map((item, key) => {
            if (slug == item.categories[0].slug) {
                total++;
                //console.log(total);
            }
        })
    }

    const getCardData = async () => {
        try {
            const res = await getData('https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart');
            dispatch(addArrayElemets(res.items));
            // GetCategoryProductData();

        } catch (error) {
            console.log(error);
        }
    }
    const IncrementHandler = async (item, index) => {
        dispatch(increment(index))
        let _newProductData = [...productData];
        _newProductData[index].cartQuantity += 1;
        setProductData(_newProductData)
    }
    const DecrementHandler = async (item, index) => {
        setShowIndicator(true)
        if (item.cartQuantity === 1) {
            try {
                const res = await deleteData(`https://automart.codesfortomorrow.com/wp-json/cocart/v2/cart/item/${item.item_key}`)
                getCardData()
                setShowIndicator(false);
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(decrement(index))
        let _newProductData = [...productData];
        _newProductData[index].cartQuantity -= 1;
        setProductData(_newProductData)
        setShowIndicator(false);
    }

    return (
        <Animatable.View style={styles.container}
            animation={'slideInRight'}     >
            {
                showIndicator == true ? <ActivityIndicator size={50}
                    style={{ position: 'absolute', alignItems: 'center', top: '50%', left: '45%', justifyContent: 'center', zIndex: 1 }} /> : ''
            }
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.top_container}>
                    <View style={[styles.top_inner_containers, { borderBottomWidth: active === '1' ? 0.7 : 0, paddingHorizontal: 10, borderColor: '#000' }]}>
                        <TouchableOpacity onPress={() => PremiumHandler()} >
                            <Text style={styles.txt_style}>Premium</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.top_inner_containers, { borderBottomWidth: active === '2' ? 0.7 : 0, paddingHorizontal: 10, borderColor: '#000' }]} >
                        <TouchableOpacity onPress={() => EconomyHandler()}>
                            <Text style={styles.txt_style}>Economy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.top_inner_containers, { flex: 0.3, }]}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            {more}
                        </TouchableOpacity>
                        <Modal
                            animationType="nones"
                            transparent={true}
                            visible={modalVisible}

                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                backgroundColor: 'rgba(0,0,0,0.0)'
                            }}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                            </TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    width: 200,
                                    height: 130,
                                    position: 'absolute',
                                    right: 12,
                                    top: 105,
                                    paddingHorizontal: 15,
                                    paddingVertical: 20,
                                    borderRadius: 20,
                                    justifyContent: 'center',

                                    // shadow 
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,

                                    elevation: 8,
                                }}>
                                <TouchableOpacity
                                    style={{ marginVertical: 10 }}
                                    onPress={() => {
                                        setProductData(productData.sort((a, b) => b.price - a.price))
                                        setModalVisible(!modalVisible)
                                    }}
                                >

                                    <Text style={{ fontSize: 20, color: '#000' }}>Price - high to low</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginVertical: 10 }}
                                    onPress={() => {
                                        setProductData(productData.sort((a, b) => a.price - b.price))
                                        setModalVisible(!modalVisible)
                                    }}
                                >
                                    <Text style={{ fontSize: 20, color: '#000' }}>Price - low to high</Text>
                                </TouchableOpacity>
                            </View>

                        </Modal>
                    </View>
                </View>

                <View style={styles.box_container}>
                    {
                        productData && productData.map((item, index) => {
                            return (
                                slug == item.categories[0].slug ?

                                    <Animatable.View key={index}
                                        // animation={'fadeInRightBig'}
                                        style={styles.box_inner_container}
                                        onPress={() => { navigation.navigate('Category') }}>
                                        <TouchableOpacity style={{ width: '100%', }}
                                            onPress={() => navigation.navigate('ProductDetail', {

                                                id: item.id
                                            })}>

                                            <Image
                                                source={{ uri: item.images ? item.images[0].src : 'https://cdn-icons-png.flaticon.com/512/9184/9184014.png' }}
                                                style={{ height: 200, width: '90%', marginVertical: 5 }}
                                                resizeMode="center"
                                            />
                                            <Text numberOfLines={2} style={styles.text_style_product_name}>{item.name}</Text>
                                        </TouchableOpacity>

                                        <View style={styles.btn_top_box}>
                                            <Text style={[styles.txt_style, { color: '#5956E9', fontSize: 14, }]}>₹ {item.price}</Text>
                                            {item.cartQuantity === 0 ?
                                                <TouchableOpacity
                                                    onPress={() => addToCardHandler(item, index)}
                                                    style={styles.cart_btn}>
                                                    <Text style={{ color: '#000' }}>+ Add</Text>
                                                    {/* <Icone name='cart-outline' size={20} /> */}
                                                </TouchableOpacity>
                                                :
                                                <View
                                                    onPress={() => navigation.navigate('Cart')}
                                                    style={styles.more_detail_btn}>
                                                    <TouchableOpacity style={{ marginHorizontal: 7 }} onPress={() => DecrementHandler(item, index)}>
                                                        {minusIcon}
                                                    </TouchableOpacity >
                                                    <Text style={[styles.txt_style, { color: '#000', fontSize: 14, marginHorizontal: 0 }]}>{item.cartQuantity}</Text>
                                                    <TouchableOpacity style={{ marginHorizontal: 7 }} onPress={() => IncrementHandler(item, index)} >
                                                        {plusIcon}
                                                    </TouchableOpacity>
                                                </View>

                                            }
                                            {/* <TouchableOpacity style={styles.more_detail_btn}
                                                onPress={() => navigation.navigate('ProductDetail', {
                                                    itemss: item,
                                                    id: item.id
                                                })}>
                                                <Icone name='eye-outline' size={24} />
                                            </TouchableOpacity> */}

                                        </View>
                                    </Animatable.View>
                                    : ""
                            );
                        })
                    }


                </View >
                {total == 0 && showIndicator == false ?

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, }}>
                        <Text style={{ fontSize: 20 }}>No Item Found</Text>
                    </View>
                    : ''}
                {/* <Products /> */}
                {/* <Products /> */}

            </ScrollView >


        </Animatable.View >
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 20
    },
    top_container: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    txt_style: {
        fontSize: 22,
        color: '#000',
        fontFamily: 'Raleway',
        // marginVertical: 5,
    },
    top_inner_containers: {
        //borderWidth: 1,
        //  flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

        // backgroundColor: '#ffff1111'

    },
    bottom_top_container: {
        marginVertical: 10,
        marginHorizontal: 10,

    },
    main_view: {
        backgroundColor: '#fff',
        width: '100%',
        height: 300,
        flexDirection: 'row',
        borderRadius: 20,
        // borderWidth: 1,
        shadowColor: '#f33',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 10,

    },
    img_view: {
        height: '100%',
        width: '50%',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    details_view: {
        paddingVertical: 20,
        height: '100%',
        width: '50%',
        // backgroundColor: '#ff4',
        // justifyContent: 'center',
    },
    btn_style: {
        height: '25%',
        backgroundColor: '#5956E9',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    btn_txt_style: {
        color: '#fff',
        fontSize: 20
    },
    box_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 50,
        flexWrap: 'wrap',
        top: 20,
    },
    box_inner_container: {
        //  height: 350,
        width: '47%',
        backgroundColor: '#fff',
        borderRadius: 20,
        // justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        // 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    text_style_product_name: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Raleway',
        marginTop: 10,
        flex: 1,
        marginVertical: 5,



    },
    btn_top_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',

    },
    cart_btn: {
        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
        borderWidth: 0.5,
        paddingHorizontal: 15,
        borderColor: '#f33',
        marginHorizontal: -5

    },
    more_detail_btn: {

        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
        borderWidth: 0.5,
        // paddingHorizontal: 5,
        borderColor: '#777',
        marginHorizontal: -5


    }

})