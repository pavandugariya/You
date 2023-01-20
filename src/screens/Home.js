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
    const [filterData, setFilterData] = useState();
    const [metaData, setMetadata] = useState();

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
            const res = await getData('https://automart.codesfortomorrow.com/wp-json/wc/v3/products/categories')
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
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
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
            <ScrollView>
                <View style={{ marginHorizontal: 50, marginTop: 20 }}>
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
                                        slug: item.slug
                                    })
                                }}>
                                <Image
                                    source={{ uri: item.image ? item.image.src : 'https://png.pngtree.com/png-clipart/20210704/original/pngtree-car-lovers-real-white-cars-side-view-head-lamp-light-headlight-png-image_6479524.jpg' }}
                                    style={{ height: '70%', width: '70%', marginVertical: 5, }}
                                    resizeMode="stretch"
                                />
                                <Text numberOfLines={1}
                                    style={{ fontSize: 20, color: '#000', fontFamily: 'Raleway', marginTop: 10, fontWeight: '600', }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
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
        height: 200,
        width: '46%',
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
    }
})