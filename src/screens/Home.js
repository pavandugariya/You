import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import { getData } from '../api/axios/axiosApi';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import HomeModal from '../components/HomeModal';
import { colors } from '../utils/color';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Home = () => {

    const data = [
        {
            name: 'Polishing',
            Image: 'https://cdn-icons-png.flaticon.com/512/4632/4632999.png'
        },
        {
            name: 'Seat',
            Image: 'https://cdn-icons-png.flaticon.com/512/9184/9184014.png'
        },
        {
            name: 'Tire',
            Image: 'https://cdn-icons-png.flaticon.com/512/6155/6155738.png'
        },
        {
            name: 'Gear',
            Image: 'https://cdn-icons-png.flaticon.com/512/9068/9068609.png'
        },


    ];
    const ReducerCardData = useSelector((state) => state.CartR);
    const reducerData = useSelector((state) => state.ThemeR);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchInputText, setsearchInputText] = useState('')
    const [showIndicator, setShowIndicator] = useState(true)
    const [modalVisible, setModalVisible] = useState(true)
    const [filterData, setFilterData] = useState([]);
    const [metaData, setMetadata] = useState([]);

    useEffect(() => {
        getCategorydata();
        getTotalPrice();
        // getUserTokenData();
    }, [ReducerCardData.cartarray])

    const getTotalPrice = async () => {
        totalPrice = 0;
        try {
            if (ReducerCardData.cartarray.length > 0) {
                ReducerCardData.cartarray.map((item, ind) => {
                    totalPrice = parseInt(item.price) * parseInt(item.quantity.value) + parseInt(totalPrice)
                })
                dispatch({ type: 'SET_TOTAL_PRICE', payload: totalPrice });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = metaData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterData(newData);
            setsearchInputText(text);
        } else {
            setFilterData(metaData);
            setsearchInputText(text)
        }
    }
    const getCategorydata = async () => {
        try {
            const res = await getData(`https://automart.codesfortomorrow.com/wp-json/wc/v3/products/categories?url_type=dynamic_url`, { url_type: "dynamic_product" })
            // console.log(res);
            if (res !== undefined) {
                setShowIndicator(false);
            }
            setFilterData(res)
            setMetadata(res)
        } catch (error) {
            console.log(error + 'errors');
        }
    }

    const getUserTokenData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken')
            console.log(value);
            // return value;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors._bg_color }}>
            <CustomHeader
                // headerName={'Welcome'}
                icon_name='reorder-three-outline'
                icon_size={40}
                // right_site_icon_name='log-out-outline'
                icon_color={'#000'}
                header_txt_size={30}
                backgroundColor={'#fff'}
                textInput
                onPressLeftIcon={() => {
                    // alert('Your are LogOut')
                    navigation.openDrawer();
                }}
                onPressRightIcon={() => {
                    alert('Your are LogOut')
                }}
                value={searchInputText}
                onChangeText={(val) => searchFilter(val)}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{
                        fontFamily: 'Raleway-Black',
                        color: '#000',
                        fontSize: 30,

                    }}>Order online {"\n"}collect in store</Text>
                </View>
                {
                    showIndicator == true ? <>
                        <View style={styles.box_container}>
                            {Array(4).fill('5').map((item, inde) => {
                                return (
                                    <ShimmerPlaceHolder key={inde} style={styles.box_inner_container}>
                                    </ShimmerPlaceHolder>
                                )
                            })}
                        </View>
                    </> : ''
                }
                <View style={styles.box_container}>
                    {filterData && filterData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.box_inner_container}
                                onPress={() => {
                                    navigation.navigate('Category', {
                                        id: item.id
                                    })
                                }}>
                                <Image
                                    source={{ uri: item.image ? item.image.src : 'https://icon2.cleanpng.com/20180809/egp/kisspng-car-wash-clip-art-vector-graphics-logo-sara-lawson-car-wash-and-valeting-services-galway-5b6c0c33b3ddd8.1149339815338076677367.jpg' }}
                                    style={{ height: undefined, width: '60%', marginTop: 15, borderRadius: 10, aspectRatio: 1 }}
                                // resizeMode="stretch"
                                />
                                <Text numberOfLines={1}
                                    style={{ fontSize: 18, color: '#000', fontFamily: 'Raleway', marginTop: 20, fontWeight: '600', }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={styles.go_service_guarantee}>
                    <Text style={[styles.txt_style, { fontSize: 17, fontWeight: "700" }]}>OurService Guarantee</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.go_service_guarantee_inner_container}>
                            <View style={[styles.go_service_guarantee_inner_container2, { backgroundColor: '#f4f9ff' }]}>
                                <Icon name='local-shipping' size={18} color={'#6AC1FB'} />
                                <Text style={styles.text_guarantee_container}>Free Pickup Drop</Text>
                            </View>
                            <View style={[styles.go_service_guarantee_inner_container2, { backgroundColor: '#fcf5fd' }]}>
                                <Icon name='settings' size={18} color={'#B2B1FF'} />
                                <Text style={styles.text_guarantee_container}>Genuine Product</Text>
                            </View>
                            <View style={[styles.go_service_guarantee_inner_container2, { backgroundColor: '#f5fff6' }]}>
                                <Icon name='verified-user' size={18} color={'#44A037'} />
                                <Text style={styles.text_guarantee_container}>30 Days Warranty</Text>
                            </View>
                            <View style={[styles.go_service_guarantee_inner_container2, { backgroundColor: '#fffee8' }]}>
                                <Icon name='account-balance-wallet' size={18} color={'#CA8446'} />
                                <Text style={styles.text_guarantee_container}>Affordable Prices</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <HomeModal
                clickHandler={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                uri={require('../../assets/images/homeModel.png')}
                textHeading={'Check your Order'}
            // uri={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_462930.png' }}
            // textHeading={'We care our car'}
            />
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        backgroundColor: colors._bg_color,

    },
    item_box: {
        height: 200,
        width: '43%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,

    },
    txt_style: {
        fontSize: 20,
        color: '#000',

    },
    box_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 50,
        flexWrap: 'wrap',
        top: 30,
    },
    box_inner_container: {
        height: 180,
        width: '47%',
        backgroundColor: '#fff',
        borderRadius: 20,
        // justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
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
    go_service_guarantee: {
        width: '93%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    go_service_guarantee_inner_container: {
        flexDirection: 'row',
        marginVertical: 10,
        // marginHorizontal: 10,
    },
    go_service_guarantee_inner_container2: {
        width: 150,
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginHorizontal: 10,
        // alignItems: 'center'
        borderRadius: 10,
    },
    text_guarantee_container: {
        color: '#000',
        fontSize: 13,
        fontFamily: 'Raleway',
        fontWeight: "700",
        paddingVertical: 5,
    }
})