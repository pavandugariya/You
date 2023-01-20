import { StyleSheet, Text, View, TextInput, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import CheckBox from '@react-native-community/checkbox';
import CustomDropdown from '../components/CustomDropdown ';

const EditAddress = () => {
    const navigation = useNavigation();
    const [toggleCheckBox, setToggleCheckBox] = useState(true)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        mobileNo: '',
        BillingfirstName: '',
        BillinglastName: '',
        BillingaddressOne: '',
        BillingaddressTwo: '',
        Billingcity: '',
        Billingstate: '',
        Billingcountry: '',
        BillingpinCode: '',
        BillingmobileNo: '',

    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.top_container}>
                    <Text style={{ fontFamily: 'Raleway-Black', fontSize: 30, color: '#000' }}>Fill your information</Text>
                </View>
                <View style={styles.bottom_container}>
                    <Text style={styles.shipping_detail_txt}>Shipping Details</Text>
                    <CustomDropdown />
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 30,

                    }}>
                        <View
                            style={{
                                height: 80,
                                flex: 1,
                                marginRight: 10
                            }}>
                            <Text style={[styles.txt_style,]}>First Name</Text>
                            <TextInput
                                placeholder='First Name'
                                style={[styles.text_input_txt_style,]}
                                value={data.firstName}
                                onChangeText={(val) => setData({
                                    ...data,
                                    firstName: val
                                })}
                            />
                        </View>
                        <View
                            style={{
                                height: 80,
                                flex: 1,

                            }}>
                            <Text style={[styles.txt_style,]}>Last Name</Text>
                            <TextInput
                                placeholder='Last Name'
                                style={[styles.text_input_txt_style, {
                                    borderWidth: 1,
                                    borderColor: '#582ED0',
                                    borderRadius: 10,
                                    paddingLeft: 10
                                }]}
                                value={data.lastName}
                                onChangeText={(val) => setData({
                                    ...data,
                                    lastName: val
                                })}

                            />
                        </View>
                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Address 1</Text>
                        <TextInput
                            placeholder='Address 1...'
                            multiline={true}
                            style={styles.text_input_txt_style}
                            value={data.addressOne}
                            onChangeText={(val) => setData({
                                ...data,
                                addressOne: val
                            })}
                        />
                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Address 2 </Text>
                        <TextInput
                            placeholder='Address 2...'
                            style={styles.text_input_txt_style}
                            multiline={true}
                            value={data.addressTwo}
                            onChangeText={(val) => setData({
                                ...data,
                                addressTwo: val
                            })}
                        />
                    </View>

                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>City</Text>
                        <TextInput
                            placeholder='City'
                            style={styles.text_input_txt_style}
                            value={data.city}
                            onChangeText={(val) => setData({
                                ...data,
                                city: val
                            })}

                        />
                    </View>

                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>State</Text>
                        <TextInput
                            placeholder='State'
                            style={styles.text_input_txt_style}
                            value={data.state}
                            onChangeText={(val) => setData({
                                ...data,
                                state: val
                            })}
                        />
                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Country</Text>
                        <TextInput
                            placeholder='Country'
                            style={styles.text_input_txt_style}
                            value={data.country}
                            onChangeText={(val) => setData({
                                ...data,
                                country: val
                            })}
                        />
                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Pin code</Text>
                        <TextInput
                            placeholder='Enter pin code'
                            style={styles.text_input_txt_style}
                            keyboardType={'number-pad'}
                            value={data.pinCode}
                            onChangeText={(val) => setData({
                                ...data,
                                pinCode: val
                            })}
                        />
                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Mobile No</Text>
                        <TextInput
                            placeholder='+91 5254989274'
                            style={styles.text_input_txt_style}
                            keyboardType={'number-pad'}
                            maxLength={10}
                            value={data.mobileNo}
                            onChangeText={(val) => setData({
                                ...data,
                                mobileNo: val
                            })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={{ color: '#000', fontSize: 15 }}>Billing address same as shipping address</Text>
                    </View>
                    {(toggleCheckBox === false)
                        ?

                        <View style={[styles.bottom_container, { top: 10, marginBottom: 10 }]}>
                            <Text style={styles.shipping_detail_txt}>Billing Details</Text>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 30
                            }}>
                                <View style={{
                                    height: 80,
                                    flex: 1,
                                    marginRight: 10
                                }}>
                                    <Text style={styles.txt_style}>First Name</Text>
                                    <TextInput
                                        placeholder='First Name'
                                        style={styles.text_input_txt_style}
                                        value={data.BillingfirstName}
                                        onChangeText={(val) => setData({
                                            ...data,
                                            BillingfirstName: val
                                        })}
                                    />
                                </View>
                                <View style={{
                                    height: 80,
                                    flex: 1,
                                }}>
                                    <Text style={styles.txt_style}>First Name</Text>
                                    <TextInput
                                        placeholder='Last Name'
                                        style={styles.text_input_txt_style}
                                        value={data.BillinglastNametName}
                                        onChangeText={(val) => setData({
                                            ...data,
                                            BillinglastNametName: val
                                        })}
                                    />
                                </View>
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Address 1</Text>
                                <TextInput
                                    placeholder='Address 1...'
                                    style={styles.text_input_txt_style}
                                    multiline={true}
                                    value={data.BillingaddressOne}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        BillingaddressOne: val
                                    })}

                                />
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Address 2 </Text>
                                <TextInput
                                    placeholder='Address 2...'
                                    style={styles.text_input_txt_style}
                                    multiline={true}
                                    value={data.BillingaddressTwo}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        BillingaddressTwo: val
                                    })}
                                />
                            </View>

                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>City</Text>
                                <TextInput
                                    placeholder='City'
                                    style={styles.text_input_txt_style}
                                    value={data.Billingcity}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        Billingcity: val
                                    })}
                                />
                            </View>

                            <View style={styles.text_input}>
                                <Text>State</Text>
                                <TextInput
                                    placeholder='State'
                                    style={styles.text_input_txt_style}
                                    value={data.Billingstate}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        Billingstate: val
                                    })}

                                />
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Country</Text>
                                <TextInput
                                    placeholder='Country'
                                    style={styles.text_input_txt_style}
                                    value={data.Billingcountry}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        Billingcountry: val
                                    })}
                                />
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Pin code</Text>
                                <TextInput
                                    placeholder='Enter pin code'
                                    style={styles.text_input_txt_style}
                                    keyboardType={'number-pad'}
                                    value={data.BillingpinCode}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        BillingpinCode: val
                                    })}
                                />
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Mobile No</Text>
                                <TextInput
                                    placeholder='+91 5254989274'
                                    style={styles.text_input_txt_style}
                                    keyboardType={'number-pad'}
                                    value={data.BillingmobileNo}
                                    maxLength={10}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        BillingmobileNo: val
                                    })}
                                />
                            </View>
                        </View>
                        : ''

                    }
                    <ButtonField
                        loginBtnText={'SAVE'}
                        bgColor={'#582ED0'}
                        height={50}
                        width={'85%'}
                        marginHorizontal={30}
                        marginVertical={20}
                        color={'#f2f2f5'}
                        onPress={() => {
                            alert('Save')
                            navigation.navigate('AddressPaymentDetails')
                        }}
                    />

                </View>
            </ScrollView>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#dddddd',

    },
    top_container: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
    },
    bottom_container: {
        flex: 3,
        marginBottom: 150,
        backgroundColor: "#fff1",
        top: 50,
    },
    text_input: {
        marginHorizontal: 30,
        marginVertical: 10,

    },
    txt_style: {
        fontSize: 16,
        fontFamily: 'Raleway',
        fontWeight: '900',
        color: '#868686',
        // paddingVertical: 10,
        paddingBottom: 10,
    },
    shipping_detail_txt: {
        fontFamily: 'Raleway',
        left: 30,
        marginBottom: 10,
        fontSize: 20,
        color: '#000000'
    },
    text_input_txt_style: {
        fontSize: 17,
        fontFamily: 'Raleway',
        color: '#000',
        borderRadius: 10,
        backgroundColor: '#f2f5f5f5',
        borderColor: '#582ED0',
        borderWidth: 1,
        paddingLeft: 10
    }

})