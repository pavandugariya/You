import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/color';

const NetDisconnect = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Image
                    source={require('../../../assets/images/net.png')}
                    style={{ height: 230, width: 300 }}
                />
            </View>
            <View style={styles.bottom_container}>
                <Text style={{ fontSize: 28, color: '#000', marginVertical: 10 }}> No internet Connection</Text>
                <Text style={{ fontSize: 17, color: '#777', marginHorizontal: 15 }}>Your internet connection is currently
                    not available please check or try again</Text>
                <TouchableOpacity style={styles.btn_try_again}>
                    <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold' }}>Try again</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NetDisconnect

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors._bg_color,
    },
    top_container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    bottom_container: {
        flex: 1,
        alignItems: 'center'

    },
    btn_try_again: {
        height: 50,
        width: 180,
        alignSelf: 'center',
        backgroundColor: '#58C0EA',
        borderRadius: 10,
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})