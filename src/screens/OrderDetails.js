import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

const OrderDetails = () => {
    const route = useRoute();
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Text>Order ID - {item.Id}</Text>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <View style={styles.name_container}>
                        <Text style={styles.name_text_style}>{item.name}</Text>
                        <Text style={[styles.name_text_style, { fontSize: 15, color: '#777', marginVertical: 5 }]}>{'Seller: Margret'}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'baseline' }}>
                            <Text style={styles.price_text_style}>₹ {item.price}</Text>
                            <Text style={{ color: 'green', fontSize: 11, left: 10 }}>2 offers</Text>
                        </View>
                    </View>
                    <View style={styles.img_container}>
                        <Image source={{ uri: item.Image }} style={{ height: 80, width: 80 }} />
                    </View>
                </View>
                <View style={[styles.hr_line_style, { marginBottom: 20 }]}></View>
                {/* //order Confirmed view */}
                <View style={{ flexDirection: 'row', }}>
                    <View style={styles.order_confirmed_first_container}>
                        <View style={[styles.circle_style, { backgroundColor: 'green', borderColor: 'green' }]}></View>
                        <Icon name='checkmark-outline' size={15} color={'#fff'} style={{ top: 0, fontWeight: 'bold', position: 'absolute' }} />

                        <View style={[styles.line_style, { borderColor: 'green', }]}></View>
                        <View style={[styles.circle_style, { backgroundColor: item.status1 == 'Arriving' ? '#fff' : 'green', borderColor: 'green' }]}></View>
                        <Icon name='checkmark-outline' size={15} color={'#fff'} style={{ top: item.status1 == 'Arriving' ? 10 : -15, fontWeight: 'bold' }} />
                        {item.status1 == 'Arriving' && <>
                            <View style={[styles.line_style, { borderColor: 'green' }]}></View>
                            <View style={[styles.circle_style, { backgroundColor: '#fff', borderColor: 'green' }]}></View>
                        </>
                        }
                    </View>
                    <View style={styles.order_confirmed_second_container}>
                        <Text style={[styles.name_text_style, { fontSize: 14, color: '#000', }]}>Order Confirmed</Text>
                        <Text style={[styles.name_text_style, { fontSize: 13, color: '#777', }]}>Wed, 9th Jan '2023'</Text>
                        {item.status1 == 'Arriving' && <>
                            <View style={{ marginTop: 40 }}></View>
                            <Text style={[styles.name_text_style, { fontSize: 14, color: '#000', }]}>{'Shipped'}</Text>
                            <Text style={[styles.name_text_style, { fontSize: 13, color: '#777', }]}>Expected by Jan '2023'</Text>
                        </>}
                        <View style={{ marginTop: 40 }}></View>
                        <Text style={[styles.name_text_style, { fontSize: 14, color: item.status1 == 'OrderCanceled' ? 'red' : '#000', }]}>{item.status1}</Text>
                        <Text style={[styles.name_text_style, { fontSize: 13, color: '#777', }]}>Wed, 11th Jan '2023'</Text>
                    </View>

                </View>
                {/* //botton view  */}
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TouchableOpacity style={styles.cancel_btn_style}>
                        <Text style={{ color: '#000' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel_btn_style}>
                        <Text>Need help?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F8',
    },
    top_container: {
        width: '98%',
        paddingVertical: 15,
        backgroundColor: '#ffff',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        paddingHorizontal: 10,
        // flexDirection: 'row',
        paddingLeft: 10,

    },
    name_container: {
        width: '65%',
        marginVertical: 10,
    },

    img_container: {
        width: '30%',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    name_text_style: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Raleway',
        color: '#000',
    },
    price_text_style: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        color: '#000',
        marginVertical: 5
    },
    hr_line_style: {
        borderBottomWidth: 0.2,
        borderColor: '#777',
        marginVertical: 5,
        width: '100%'
    },
    order_confirmed_first_container: {
        width: '10%',
        //        justifyContent: 'center',
        alignItems: 'center',
        top: 5
    },
    order_confirmed_second_container: {
        width: '80%',
        marginHorizontal: 20
    },
    circle_style: {
        height: 15,
        width: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000'
    },
    line_style: {
        height: 60,
        borderLeftWidth: 2,
        borderColor: 'green',
        // transform: [{ translateY: -100 }, { translateY: 0 }, { rotate: '0deg' }],
    },
    cancel_btn_style: {
        width: '40%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
})