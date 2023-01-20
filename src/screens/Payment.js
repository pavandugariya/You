import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icone from 'react-native-vector-icons/Ionicons'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';

// icon Images 
const circle = <Icone name='ellipse-outline' size={40} />
const check_circle = <Icone name='checkmark-circle-outline' size={40} color={'#5956E9'} />
const Payment = () => {
    const navigation = useNavigation();
    const [select, setselect] = useState({
        UPI: true,
        CARD: false,
        CASH: false,
    })
    const [selected, setSelected] = useState('UPI');
    // console.log(selected);
    const setSelectHandler = (val) => {
        if ('UPI' === val && select.UPI === false) {
            setselect({
                UPI: !select.UPI,
                CARD: false,
                CASH: false,
            })
            setSelected('UPI');
        } else if ('CARD' === val && select.CARD === false) {
            setselect({
                UPI: false,
                CARD: !select.CARD,
                CASH: false,
            })
            setSelected('CARD');

        } else if ('CASH' === val && select.CASH === false) {
            setselect({
                UPI: false,
                CARD: false,
                CASH: !select.CASH,
            })
            setSelected('CASH');
        }
        //console.log(val);

    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, margin: 10, fontFamily: 'Raleway', color: '#000', fontWeight: '500' }}>Choose Payment Method</Text>
            <View style={[styles.box_container, { borderColor: selected === 'UPI' ? '#5956E9' : '#000' }]}>
                <Image
                    source={require('../../assets/images/UPI.png')}
                    style={{ height: 40, width: 40 }}
                />
                <Text style={{ fontSize: 20, color: '#000', flex: 1, marginLeft: 15 }}>UPI</Text>
                <TouchableOpacity onPress={() => setSelectHandler('UPI')}>
                    {select.UPI ? check_circle : circle}
                </TouchableOpacity>
            </View>
            <View style={[styles.box_container, { borderColor: selected === 'CARD' ? '#5956E9' : '#000' }]}>
                <Image
                    source={require('../../assets/images/credit-card.png')}
                    style={{ height: 40, width: 40 }}
                />
                <Text style={{ fontSize: 20, color: '#000', flex: 1, marginLeft: 15 }}>Card</Text>
                {/* <TouchableOpacity onPress={() => setSelectHandler('CARD')}> */}
                {/* <TouchableOpacity onPress={() => setselect({ CARD: !select.CARD })}> */}
                <TouchableOpacity onPress={() => setSelectHandler('CARD')}>

                    {select.CARD ? check_circle : circle}
                </TouchableOpacity>

            </View>
            <View style={[styles.box_container, { borderColor: selected === 'CASH' ? '#5956E9' : '#000' }]}>
                <Image
                    source={require('../../assets/images/cash.png')}
                    style={{ height: 40, width: 40 }}
                />
                <Text style={{ fontSize: 20, color: '#000', flex: 1, marginLeft: 15 }}>Cash On Delivery</Text>
                <TouchableOpacity onPress={() => setSelectHandler('CASH')}>
                    {select.CASH ? check_circle : circle}
                </TouchableOpacity>

            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150 }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginHorizontal: 30,
                    marginVertical: 10,

                }}>
                    <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Raleway' }}>Total Pay</Text>
                    <Text style={{ fontSize: 22, color: '#5956E9', fontFamily: 'Raleway-Black' }}>Rs 10000</Text>
                </View>
                <ButtonField
                    loginBtnText={'Pay Now'}
                    bgColor={'#5956E9'}
                    height={50}
                    color={'#fff'}
                    onPress={() => navigation.navigate('Thanks')}
                />
            </View >
        </View >
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    box_container: {
        height: 80,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 10,
    }
})