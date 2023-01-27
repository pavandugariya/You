import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


const CustomInputField = ({ leftIcon, textname, placeholderText, textValue, onChangeTextHandler, rightIcon, rightIconOnpressHandler, isVisible, secondRightIcon, colors, ...rest }) => {
    return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Icon name={leftIcon} size={24} color={'#868686'} />
                <Text style={{ fontFamily: 'Raleway', fontSize: 15, fontWeight: '600', lineHeight: 17, color: '#868686', marginHorizontal: 10 }}>{textname}</Text>
            </View>
            <TextInput
                placeholder={placeholderText}
                value={textValue}
                onChangeText={onChangeTextHandler}
                style={styles.text_input_style}
                secureTextEntry={isVisible}
                {...rest}

            />
            {rightIcon &&
                <TouchableOpacity
                    onPress={rightIconOnpressHandler}
                    style={styles.rightIcon_style}
                >
                    <Icon name={isVisible != true ? rightIcon : secondRightIcon} size={24} color="#5956E9"
                    // style={styles.rightIcon_style}
                    />
                </TouchableOpacity>
            }

        </View>
    )
}

export default CustomInputField

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
        paddingLeft: 0,

    },
    top_container: {
        flexDirection: 'row',
        alignItems: 'center',
        left: -2,
    },
    text_input_style: {
        height: 40,
        fontFamily: 'Raleway',
        fontSize: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#C9C9C9',
        left: -5,
        paddingRight: 45,
        color: '#000'
    },
    rightIcon_style: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 40,
        paddingHorizontal: 8,
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})