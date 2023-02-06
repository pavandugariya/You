import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const CustomDropdown = ({ selectedValue, isSelected, setisSelected, onPressTop,
    dropDownData, setSelectedValue, funchange }) => {
    return (
        <>
            <TouchableOpacity style={styles.top_container} onPress={onPressTop}  >
                <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: '#000' }}>{selectedValue} </Text>
                {
                    isSelected == false ?
                        <Icon name='chevron-down-outline' size={25} />
                        : <Icon name='chevron-up-outline' size={25} />
                }
            </TouchableOpacity>
            {isSelected == true &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    style={styles.bottom_container}>
                    {dropDownData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.bottom_inner_container}
                                onPress={() => {
                                    setSelectedValue(item)
                                    setisSelected(!isSelected)
                                }}
                            >
                                <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: '#000' }}>{item}</Text>
                                {/* <Text style={{ fontSize: 15, fontFamily: 'Raleway', color: '#000' }}>{item.country}</Text> */}
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            }
        </>
    )
}

export default CustomDropdown

const styles = StyleSheet.create({
    top_container: {
        width: '100%',
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
        width: '100%',
        height: 250,
        alignSelf: 'center',
        borderRadius: 10,
        // backgroundColor: '#f2f5f5f5',
        shadowColor: '#5856d9',
        shadowOpacity: 1,
        shadowRadius: 10,
        marginTop: 5,
        // paddingHorizontal: 10,
    },
    bottom_inner_container: {
        width: '90%',
        height: 40,
        // borderBottomWidth: 0.2,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        marginVertical: 5,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})