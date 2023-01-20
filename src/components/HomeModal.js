import { StyleSheet, Text, View, Modal, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('window')
const HomeModal = ({ clickHandler, visible, uri, textHeading }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
        >
            <TouchableOpacity style={styles.top_container} onPress={() => clickHandler()}>
                <View style={styles.bottom_container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 40 }}>
                            <Text style={styles.text_style}>{textHeading}</Text>
                            <Text style={styles.text_style}>Now</Text>
                        </View>
                        <TouchableOpacity style={{ top: -30 }} onPress={() => clickHandler()}>
                            <Icon name='close-outline' size={40} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        pagingEnabled
                        horizontal={true} style={{ width: 250, height: 300, }} >
                        <Image source={uri}
                            style={{ width: 250, height: 300, }}
                        />
                        <Image source={uri}
                            style={{ width: 250, height: 300, }}
                        />
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal >
    )
}

export default HomeModal

const styles = StyleSheet.create({
    top_container: {
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    bottom_container: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    text_style: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',

    }
})