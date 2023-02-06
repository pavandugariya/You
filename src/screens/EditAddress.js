import { StyleSheet, Text, View, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import CheckBox from '@react-native-community/checkbox';
import CustomDropdown from '../components/CustomDropdown ';
import { useSelector, useDispatch } from 'react-redux';
import { AddAddressHandler, SameAddressHandler } from '../Redux/Action/AddressAction/AddressAction';
import { postAddressData, postDataSecond } from '../api/axios/axiosApi';
const { heightx } = Dimensions.get('window').height

const EditAddress = () => {
    const navigation = useNavigation();
    const addressReducerData = useSelector((state) => state.AddressR);
    const authReducer = useSelector((state) => state.AuthR);
    const userID = authReducer.userId;
    const dispatch = useDispatch();
    const [toggleCheckBox, setToggleCheckBox] = useState(true)
    //state in india custome drop down cod 
    const stateName = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        "Assam",
        'Bihar ',
        'Chhattisgarh',
        "Goa",
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana ',
        'Tripura',
        'Uttarakhand',
        'Uttar Pradesh ',
        'West Bengal',

    ];
    const [isSelected, setisSelected] = useState(false)
    const [selectedValue, setSelectedValue] = useState('Select State')
    const [selectedValueBilling, setSelectedValueBilling] = useState('Select State')
    const [statsData, setStatesData] = useState(stateName)

    useEffect(() => {
        setisSelectedFun()
    }, [selectedValue])

    setisSelectedFun = () => {
        setData({
            ...data,
            state: selectedValue,
        })
        // return selectedValue;
    }

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: selectedValue,
        country: 'India',
        pinCode: '',
        mobileNo: '',
        BillingfirstName: '',
        BillinglastName: '',
        BillingaddressOne: '',
        BillingaddressTwo: '',
        Billingcity: '',
        Billingstate: selectedValueBilling,
        Billingcountry: 'India',
        BillingpinCode: '',
        BillingmobileNo: '',

    });
    // console.log(selectedValue);
    console.log(data.state);

    const saveHandler = () => {
        if (data.firstName.length >= 4 && data.lastName.length >= 4 && data.addressOne.length >= 4 && data.city.length >= 1 && data.mobileNo.length >= 4 && data.pinCode) {

            dispatch(AddAddressHandler(data))
            dispatch(SameAddressHandler(toggleCheckBox))

            sendUserData();

            // console.log(dataObj);
            alert('Your data has been successfully saved.')
            navigation.goBack()
        } else {
            if (data.firstName.length < 4) {
                alert('please provide first name')
            } else if (data.lastName.length < 4) {
                alert('please provide last name')
            } else if (data.addressOne.length < 4) {
                alert('please fill address')
            } else if (data.city.length < 2) {
                alert('please fill city')
            } else if (data.pinCode.length < 4) {
                alert('please fill city pin code')
            } else if (data.mobileNo.length < 4) {
                alert('please fill mobile no ')
            } else {
                alert('please provide all information')
            }

        }

    }
    // send data in database
    const sendUserData = async () => {
        try {
            const dataObj = {
                "billing": {
                    "first_name": toggleCheckBox == true ? data.firstName : data.BillingfirstName,
                    "last_name": toggleCheckBox == true ? data.lastName : data.BillinglastName,
                    "company": "",
                    "address_1": toggleCheckBox == true ? data.addressOne : data.BillingaddressOne,
                    "address_2": toggleCheckBox == true ? data.addressTwo : data.BillingaddressTwo,
                    "city": toggleCheckBox == true ? data.city : data.Billingcity,
                    "state": toggleCheckBox == true ? data.state : data.Billingstate,
                    "postcode": toggleCheckBox == true ? data.pinCode : data.BillingpinCode,
                    "country": toggleCheckBox == true ? data.country : data.Billingcountry,
                    "phone": toggleCheckBox == true ? data.mobileNo : data.BillingmobileNo,
                },
                "shipping": {
                    "first_name": data.firstName,
                    "last_name": data.lastName,
                    "company": "",
                    "address_1": data.addressOne,
                    "address_2": data.addressTwo,
                    "city": data.city,
                    "state": data.state,
                    "postcode": data.pinCode,
                    "country": data.country,
                    "phone": data.mobileNo,
                },
            }
            const res = await postAddressData(`https://automart.codesfortomorrow.com/wp-json/wc/v2/customers/${userID}`, dataObj);
            console.log(res);
        } catch (error) {
            console.log(error, 'send profile data in database using api ...? editeaddress screen');
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={styles.top_container}>
                    <Text style={{ fontFamily: 'Raleway-Black', fontSize: 30, color: '#000' }}>Fill your information</Text>
                </View>
                <View style={styles.bottom_container}>
                    <Text style={styles.shipping_detail_txt}>Shipping Details</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        backgroundColor: '#fff',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 2,

                    }}>
                        <View
                            style={{
                                height: 80,
                                flex: 1,
                                marginRight: 10
                            }}>
                            <Text style={[styles.txt_style,]}>First Name:</Text>
                            <TextInput
                                placeholder='First Name'
                                placeholderTextColor={'#777'}
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
                            <Text style={[styles.txt_style,]}>Last Name:</Text>
                            <TextInput
                                placeholder='Last Name'
                                placeholderTextColor={'#777'}

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
                        <Text style={styles.txt_style}>Address one:</Text>
                        <TextInput
                            placeholder='Address one..'
                            placeholderTextColor={'#777'}

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
                        <Text style={styles.txt_style}>Address two:</Text>
                        <TextInput
                            placeholder='Address two..'
                            placeholderTextColor={'#777'}
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
                        <Text style={styles.txt_style}>City:</Text>
                        <TextInput
                            placeholder='City'
                            placeholderTextColor={'#777'}

                            style={styles.text_input_txt_style}
                            value={data.city}
                            onChangeText={(val) => setData({
                                ...data,
                                city: val
                            })}

                        />
                    </View>

                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>State:</Text>
                        <CustomDropdown
                            selectedValue={selectedValue}
                            isSelected={isSelected}
                            onPressTop={() => {
                                setisSelected(!isSelected)

                            }}

                            setSelectedValue={setSelectedValue}
                            dropDownData={statsData}
                            setisSelected={setisSelected}
                        />

                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Country:</Text>
                        <TextInput
                            placeholder='Country'
                            placeholderTextColor={'#777'}
                            editable={false}
                            style={styles.text_input_txt_style}
                            value={data.country}
                            onChangeText={(val) => setData({
                                ...data,
                                country: val
                            })}
                        />
                    </View>
                    <View style={styles.text_input}>
                        <Text style={styles.txt_style}>Pin code:</Text>
                        <TextInput
                            placeholder='Enter pin code'
                            placeholderTextColor={'#777'}
                            maxLength={6}
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
                        <Text style={styles.txt_style}>Mobile No:</Text>
                        <View style={[styles.text_input_txt_style, {
                            flexDirection: 'row', alignItems: 'center'
                        }]}>
                            <Text style={[{
                                fontSize: 17,
                                fontFamily: 'Raleway',
                                color: '#000',
                            }]}>+91</Text>
                            <TextInput
                                placeholder='5254989274'
                                placeholderTextColor={'#777'}
                                style={[{
                                    fontSize: 17,
                                    fontFamily: 'Raleway',
                                    color: '#000',
                                    flex: 1,
                                }]}
                                keyboardType={'number-pad'}
                                maxLength={10}
                                value={data.mobileNo}
                                onChangeText={(val) => setData({
                                    ...data,
                                    mobileNo: val
                                })}
                            />
                        </View>
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
                                marginHorizontal: 20,
                                backgroundColor: '#fff',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 3,
                            }}>
                                <View style={{
                                    height: 80,
                                    flex: 1,
                                    marginRight: 10
                                }}>
                                    <Text style={styles.txt_style}>First Name:</Text>
                                    <TextInput
                                        placeholder='First Name'
                                        placeholderTextColor={'#777'}

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
                                    <Text style={styles.txt_style}>First Name:</Text>
                                    <TextInput
                                        placeholder='Last Name'
                                        placeholderTextColor={'#777'}

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
                                <Text style={styles.txt_style}>Address one:</Text>
                                <TextInput
                                    placeholder='Address one...'
                                    placeholderTextColor={'#777'}

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
                                <Text style={styles.txt_style}>Address two: </Text>
                                <TextInput
                                    placeholder='Address two..'
                                    placeholderTextColor={'#777'}

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
                                <Text style={styles.txt_style}>City:</Text>
                                <TextInput
                                    placeholder='City'
                                    placeholderTextColor={'#777'}

                                    style={styles.text_input_txt_style}
                                    value={data.Billingcity}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        Billingcity: val
                                    })}
                                />
                            </View>

                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>State:</Text>
                                <CustomDropdown
                                    selectedValue={selectedValueBilling}
                                    isSelected={isSelected}
                                    onPressTop={() => {
                                        setisSelected(!isSelected)
                                    }}
                                    setSelectedValue={setSelectedValueBilling}
                                    dropDownData={statsData}
                                    setisSelected={setisSelected}

                                />
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Country:</Text>
                                <TextInput
                                    placeholder='Country'
                                    placeholderTextColor={'#777'}
                                    editable={false}
                                    style={styles.text_input_txt_style}
                                    value={data.Billingcountry}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        country: val
                                    })}
                                />
                            </View>
                            <View style={styles.text_input}>
                                <Text style={styles.txt_style}>Pin code:</Text>
                                <TextInput
                                    placeholder='Enter pin code'
                                    placeholderTextColor={'#777'}

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
                                <Text style={styles.txt_style}>Mobile No:</Text>
                                <View style={[styles.text_input_txt_style, {
                                    flexDirection: 'row', alignItems: 'center'
                                }]}>
                                    <Text style={[{
                                        fontSize: 17,
                                        fontFamily: 'Raleway',
                                        color: '#000',
                                    }]}>+91</Text>
                                    <TextInput
                                        placeholder='9987654321'
                                        placeholderTextColor={'#777'}
                                        style={[{
                                            fontSize: 17,
                                            fontFamily: 'Raleway',
                                            color: '#000',
                                            flex: 1,
                                        }]}
                                        keyboardType={'number-pad'}
                                        maxLength={10}
                                        value={data.BillingmobileNo}
                                        onChangeText={(val) => setData({
                                            ...data,
                                            BillingmobileNo: val
                                        })}
                                    />
                                </View>
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
                        onPress={() => saveHandler()}
                    />

                </View>
            </ScrollView>
            <View style={styles.circle_style}></View>
            <View style={styles.circle2_style}></View>
            <View style={styles.circle3_style}></View>
            <View style={styles.circle4_style}></View>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',

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
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 2,
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
    },
    circle_style: {
        position: 'absolute',
        height: 200,
        width: 200,
        borderRadius: 100,
        top: -50,
        left: -50,
        backgroundColor: '#cbccf7',
        zIndex: -50,
        overflow: 'hidden',
        borderWidth: 20,
        borderColor: '#d2d2f1'
    },
    circle2_style: {
        position: 'absolute',
        height: 200,
        width: 200,
        borderRadius: 100,
        top: 400,
        right: -50,
        backgroundColor: '#c3c4f6',
        zIndex: -50,
        overflow: 'hidden',
        borderWidth: 40,
        borderColor: '#cacaf1'
    },
    circle3_style: {
        position: 'absolute',
        height: 80,
        width: 80,
        borderRadius: 40,
        top: 180,
        left: 0,
        backgroundColor: '#fff',
        zIndex: -50,
        borderWidth: 10,
        borderColor: '#cbccf7'
    },
    circle4_style: {
        position: 'absolute',
        height: 40,
        width: 40,
        borderRadius: 20,
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        zIndex: -50,
        borderWidth: 10,
        borderColor: '#cbccf7'
    },

})