import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
const countries = [
    { country: 'Afghanistan', code: '93', iso: 'AF' },
    { country: 'China', code: '86', iso: 'CN' },
    { country: 'India', code: '91', iso: 'IN' },
    { country: 'Iran', code: '98', iso: 'IR' },
    { country: 'United States', code: '1', iso: 'US' },
];
const CustomDropdown = () => {

    const [isSelected, setisSelected] = useState(false)
    const [selectedValue, setSelectedValue] = useState('Select Country')
    const [data, setdata] = useState(countries)
    return (
        <>
            <TouchableOpacity style={styles.top_container} onPress={() => {
                setisSelected(!isSelected)
            }}>
                <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: '#000' }}>{selectedValue} </Text>
                {
                    isSelected == false ?
                        <Icon name='caret-up-outline' size={30} />
                        : <Icon name='caret-down-outline' size={30} />
                }
            </TouchableOpacity>
            {isSelected == true &&
                <View style={styles.bottom_container}>
                    {data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.bottom_inner_container}
                                onPress={() => {
                                    setSelectedValue(item.country)
                                    setisSelected(!isSelected)
                                }}
                            >
                                <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: '#000' }}>{item.country}</Text>
                                {/* <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: '#000' }}>{item.country}</Text> */}
                            </TouchableOpacity>
                        )
                    })}

                </View>
            }
        </>
    )
}

export default CustomDropdown

const styles = StyleSheet.create({
    top_container: {
        width: '84%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f2f5f5f5',
        borderColor: '#582ED0',
        borderWidth: 1,
    },
    bottom_container: {
        width: '84%',
        height: 250,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#f2f5f5f5',
        shadowColor: '#5856d9',
        shadowOpacity: 1,
        shadowRadius: 10,
        marginTop: 5
    },
    bottom_inner_container: {
        width: '90%',
        height: 40,
        borderBottomWidth: 0.2,
        borderBottomColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    }
})