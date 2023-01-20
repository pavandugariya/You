import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader'
import { useNavigation } from '@react-navigation/native';
import ButtonField from '../components/ButtonField';

const Favorites = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <CustomHeader
                headerName={'Favorites'}
                header_txt_size={20}
                icon_color={'#000'}
                icon_name='arrow-back-outline'
                icon_size={25}
                backgroundColor={'#fff'}
                onPressLeftIcon={() => navigation.navigate('Home')}

            />

            <Image
                source={require('../../assets/images/Sally-4.png')}
                style={{ height: 200, width: 200, top: 100 }}
            />
            <View style={styles.bottom_view}>
                <Text style={styles.no_history_txt}>No Favorites yet</Text>
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

        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({

    container: {
        flex: 1,
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