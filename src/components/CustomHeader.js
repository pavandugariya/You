import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
const CustomHeader = ({ headerName, icon_name, icon_size, icon_color, header_txt_size, onPressRightIcon, onPressLeftIcon, textInput, right_site_icon_name, textInput2, textInputValue, ...rest }) => {

    return (
        <View style={[styles.container, { ...rest }]}>
            {icon_name &&
                <TouchableOpacity style={styles.icon_container_style} onPress={onPressLeftIcon}  >
                    <Ionicons name={icon_name} size={icon_size} color={icon_color} />
                </TouchableOpacity>}
            {headerName &&
                <View style={{ flex: 1, alignItems: 'center', marginRight: right_site_icon_name ? 0 : 35 }}>
                    <Text style={{ fontSize: header_txt_size, color: icon_color, paddingLeft: icon_name ? 0 : 20, }}>{headerName}</Text>
                </View>
            }
            {textInput2 &&
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    height: 40,
                    marginRight: 30,
                    left: 10,
                    borderRadius: 20,
                    top: 5

                }}>


                </View>
            }{
                textInput &&
                <View style={{
                    width: 270, borderWidth: 0.5, borderRadius: 20, marginTop: 10, height: 42,
                    alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10
                }} >
                    <Ionicons name={'search-outline'} size={30} color={icon_color} />
                    <TextInput
                        placeholder="Search"
                        style={{ flex: 1 }}
                        {...rest}
                    />
                </View>

            }
            {right_site_icon_name &&
                <TouchableOpacity style={styles.icon_container_style} onPress={onPressRightIcon}>
                    <Ionicons name={right_site_icon_name} size={icon_size} color={icon_color} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#69ad',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',

    },
    icon_container_style: {
        marginHorizontal: 20
    }
})