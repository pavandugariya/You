import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ButtonField from '../components/ButtonField'
import { useNavigation } from '@react-navigation/native';
import HomeModal from '../components/HomeModal';

const OrderHistory = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true)

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Saly-11.png')}
                style={{ height: 300, width: 300, top: 100 }}
            />
            <View style={styles.bottom_view}>
                <Text style={styles.no_history_txt}>No history yet</Text>
                <Text style={styles.no_history_bottom_txt}>Hit the orange button down below to Create an order</Text>
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
            <HomeModal
                clickHandler={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                uri={require('../../assets/images/homeModel.png')}
                textHeading={'Check your Order'}
            />
        </View>
    )
}

export default OrderHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
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