import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonField from '../components/ButtonField';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import { getData, postDataSecond, putData } from '../api/axios/axiosApi';
import { colors } from '../utils/color';
import RazorpayCheckout from 'react-native-razorpay';
import { FirstNameHandler, LastNameHandler, AddAddressHandler } from '../Redux/Action/AddressAction/AddressAction';

const AddressPaymentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const addressReducerData = useSelector((state) => state.AddressR);
  const CartReducerData = useSelector((state) => state.CartR);
  const addressDispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(true)
  const AuthReducerData = useSelector((state) => state.AuthR);
  const { id, price, _line_item } = route.params;
  console.log('products_ ', _line_item.line_items);
  const line_item = _line_item.line_items
  const orderAmount = price;
  const deliveryAmount = 10;
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const discount = (orderAmount * discountPercentage) / 100;
  const totalPay = parseFloat(orderAmount) + parseFloat(deliveryAmount - discount);
  const emailId = AuthReducerData.userEmail;
  const [promoCode, setpromoCode] = useState('')

  // order generate handler 
  const orderCreateHandler = async () => {
    console.log('orderHandelr_line_item' + line_item);
    if (addressReducerData.addressData.firstName !== '' &&
      addressReducerData.addressData.addressOne !== '' &&
      addressReducerData.addressData.mobileNo !== ''
    ) {

      try {
        const dataObj = {
          "line_items": line_item,
          "billing": {
            "first_name": addressReducerData.sameAddress == true ? addressReducerData.addressData.firstName : addressReducerData.addressData.BillingfirstName,
            "last_name": addressReducerData.sameAddress == true ? addressReducerData.addressData.lastName : addressReducerData.addressData.BillinglastName,
            "company": "",
            "address_1": addressReducerData.sameAddress == true ? addressReducerData.addressData.addressOne : addressReducerData.addressData.BillingaddressOne,
            "address_2": addressReducerData.sameAddress == true ? addressReducerData.addressData.addressTwo : addressReducerData.addressData.BillingaddressTwo,
            "city": addressReducerData.sameAddress == true ? addressReducerData.addressData.city : addressReducerData.addressData.Billingcity,
            "state": addressReducerData.sameAddress == true ? addressReducerData.addressData.state : addressReducerData.addressData.Billingstate,
            "postcode": addressReducerData.sameAddress == true ? addressReducerData.addressData.pinCode : addressReducerData.addressData.BillingpinCode,
            "country": addressReducerData.sameAddress == true ? addressReducerData.addressData.country : addressReducerData.addressData.Billingcountry,
            "email": emailId,
            "phone": addressReducerData.sameAddress == true ? addressReducerData.addressData.mobileNo : addressReducerData.addressData.BillingmobileNo,
          },
          "shipping": {
            "first_name": addressReducerData.addressData.firstName,
            "last_name": addressReducerData.addressData.lastName,
            "company": "",
            "address_1": addressReducerData.addressData.addressOne,
            "address_2": addressReducerData.addressData.addressTwo,
            "city": addressReducerData.addressData.city,
            "state": addressReducerData.addressData.state,
            "postcode": addressReducerData.addressData.pinCode,
            "country": addressReducerData.addressData.country,
            "phone": addressReducerData.addressData.mobileNo,
          },

        }
        const res = await postDataSecond(`https://automart.codesfortomorrow.com/wp-json/wc/v3/orders`, dataObj);
        console.log(res.id);

        // promo code apply
        if (promoCode.length > 0) {
          const dataObjp = {
            "coupon_lines": [
              { "code": promoCode }
            ],
          }
          const ress = await putData(`https://automart.codesfortomorrow.com/wp-json/wc/v3/orders/${res.id}`, dataObjp)
          console.log(ress);
        }
        // payment handel
        if (res.id > 0) {
          payButtonHandler(res.id);
        } else {
          alert('something went wrong')
        }
      } catch (error) {
        console.log(error);
      }

    } else {
      alert('Please fill shipping and billing address first')
    }
  }

  // payButton handler
  const payButtonHandler = async (id) => {
    setShowIndicator(false);
    console.log('idas', id);
    // rozerpay
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_fmFnvOTQNBdsKa',
      amount: totalPay * 100,
      name: 'Car Product',
      order_id: '',//Replace this with an order_id created using Orders API.
      handler: function (response) {
        console.log('response...> ', response);
        // checkPaymentStatus(response, transferId)
        // setTransferId(transferId);
      },
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar'
      },

      theme: { color: colors._theme_primary_color }
    }

    RazorpayCheckout.open(options).then(async (data) => {
      // handle success
      console.log(data);
      alert(`Success: ${data.razorpay_payment_id}`);

      const dataObj = {
        "transaction_id": data.razorpay_payment_id,
        "status": "completed",

      }
      try {
        const res = await putData(`https://automart.codesfortomorrow.com/wp-json/wc/v3/orders/${id}`, dataObj)
        navigation.navigate('Thanks', { id: id })
      } catch (error) {
        console.log(error);
      }

    }).catch((error) => {
      // handle failure
      console.log(error);
      alert(`Error: ${error.code} | ${error.description}`);
    });
    // navigation.navigate('Payment')    
    setShowIndicator(true);

  }

  // promo code apply
  const promoCodeHandler = async () => {
    try {
      if (price < 100) {
        alert('Apply coupon codes for total order value is greater than 100 INR')
      } else {

        if (promoCode.length > 0) {
          try {
            const res = await getData(`https://automart.codesfortomorrow.com/wp-json/wc/v3/coupons?code=${promoCode}`)
            // console.log(res[0].code);
            if (res.length > 0) {
              setDiscountPercentage(5);
              if (res[0].code == promoCode.toLocaleLowerCase()) {
                alert('promo code applyed')
              }
            } else {
              setpromoCode('')
              alert("promo code does't exist");
            }

          } catch (error) {
            console.log(error);
          }
        } else {
          alert('Please Fill Correct Code')
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <View
      style={styles.container}>
      {
        showIndicator == false ? <ActivityIndicator size={50}
          style={{ position: 'absolute', alignItems: 'center', top: '50%', left: '45%', justifyContent: 'center', zIndex: 1 }} /> : ''
      }
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* shipping code */}
        <View style={styles.shipping_container} >
          <Text style={styles.shipping_text_style}>Shipping information </Text>
          <View style={styles.shipping_inner_box}>

            <View style={styles.text_icon_container}>
              <Ionicons name='person-outline' size={24} color={colors._theme_primary_color} style={{ marginHorizontal: 10, flex: 1, }} />
              {addressReducerData.addressData.firstName !== '' &&
                addressReducerData.addressData.addressOne !== '' &&
                <Text
                  style={[styles.shipping_box_text_style, { fontSize: 17, textTransform: 'capitalize' }]} >
                  {addressReducerData.addressData.firstName + ' ' + addressReducerData.addressData.lastName}</Text>
              }
            </View>

            <View style={styles.text_icon_container}>
              <Ionicons name='location-outline' size={24} color={colors._theme_primary_color} style={{ marginHorizontal: 10, flex: 1, }} />
              <Text style={[styles.shipping_box_text_style, { fontSize: 15, textTransform: 'capitalize' }]} >{addressReducerData.addressData.addressOne} </Text>
            </View>
            <View style={styles.text_icon_container}>
              <Ionicons name='call-outline' size={24} color={colors._theme_primary_color} style={{ marginHorizontal: 10, flex: 1, }} />
              <Text style={[styles.shipping_box_text_style, { fontSize: 15 }]} > {addressReducerData.addressData.mobileNo}</Text>
            </View>

            {addressReducerData.addressData.firstName === '' &&
              addressReducerData.addressData.addressOne === '' &&
              <View style={{ position: 'absolute', top: '55%', left: '25%' }}>
                <Text style={[styles.txt_style, { fontWeight: '100' }]}>Shipping details Add </Text>
              </View>
            }
          </View>

          <TouchableOpacity style={styles.change_btn}
            onPress={() => navigation.navigate('EditAddress')}
          >
            <Animatable.Text
              animation='slideInUp'
              direction='alternate'
              iterationCount={addressReducerData.addressData.firstName === '' ? 5 : 0}
              style={styles.change_btn_text}> {addressReducerData.addressData.firstName === '' ? 'ADD' : 'Change'}</Animatable.Text>
          </TouchableOpacity>



        </View>

        {/* Billing code */}
        <View style={styles.shipping_container} >
          <Text style={styles.shipping_text_style}>Billing information </Text>
          <View style={styles.shipping_inner_box}>
            <View style={styles.text_icon_container}>
              <Ionicons name='person-outline' size={24} color={colors._theme_primary_color} style={{ marginHorizontal: 10, flex: 1, }} />
              <Text style={[styles.shipping_box_text_style, { fontSize: 17, textTransform: 'capitalize' }]} >
                {addressReducerData.sameAddress ? addressReducerData.addressData.firstName + ' ' + addressReducerData.addressData.lastName : addressReducerData.addressData.BillingfirstName + ' ' + addressReducerData.addressData.BillinglastName}</Text>
            </View>

            <View style={styles.text_icon_container}>
              <Ionicons name='location-outline' size={24} color={colors._theme_primary_color} style={{ marginHorizontal: 10, flex: 1, }} />
              <Text style={[styles.shipping_box_text_style, { fontSize: 15, textTransform: 'capitalize' }]} >
                {addressReducerData.sameAddress ? addressReducerData.addressData.addressOne : addressReducerData.addressData.BillingaddressOne} </Text>
            </View>
            <View style={styles.text_icon_container}>
              <Ionicons name='call-outline' size={24} color={colors._theme_primary_color} style={{ marginHorizontal: 10, flex: 1, }} />
              <Text style={[styles.shipping_box_text_style, { fontSize: 15 }]} >
                {addressReducerData.sameAddress ? addressReducerData.addressData.mobileNo : addressReducerData.addressData.BillingmobileNo} </Text>
            </View>
            {addressReducerData.addressData.firstName === '' &&
              addressReducerData.addressData.addressOne === '' &&
              <View style={{ position: 'absolute', top: '55%', left: '25%' }}>
                <Text style={[styles.txt_style, { fontWeight: '100' }]}>Billing details Add </Text>
              </View>
            }
          </View>
        </View>

        {/* //Promo Code */}
        <View style={styles.top_container}>
          <Text style={styles.txt_style}>Promo Code</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
            <TextInput
              fontSize={15}
              placeholder={"Enter Promo Code"}
              placeholderTextColor={'#777'}
              value={promoCode}
              onChangeText={(val) => setpromoCode(val)}
              style={{ flex: 1, backgroundColor: '#f2f2f2', paddingHorizontal: 10, borderRadius: 5, borderColor: colors._theme_primary_color, marginRight: 10, borderWidth: 0.3, height: 40, color: '#000', }}
            />
            <Animatable.View animation='zoomInLeft'>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 20 }}
                onPress={promoCodeHandler}
              >
                <Text style={[styles.txt_style, { color: colors._theme_primary_color }]}>Apply</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
          {/* <Text>Discount...</Text> */}
          {/* Order Summary */}
          <Text style={styles.txt_style}>Total Payment</Text>
          <View style={styles.order_top_container} >
            <View style={styles.order_inner_first_container}>
              <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Order Amount</Text>
              <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Delivery Fees</Text>
              <Text style={[styles.order_txt_style, { marginTop: 10, fontWeight: "700", color: "#44A037" }]} >Discount</Text>
            </View>
            <View style={styles.ordert_inner_second_container}>
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >{orderAmount}</Text>
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >{deliveryAmount}.00</Text>
              <Text style={[styles.order_txt_style, { color: "#44A037", marginTop: 10 }]} >-{discount}</Text>
            </View>
          </View>
          {/* // horizontal line */}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={styles.order_top_container} >
            <View style={styles.order_inner_first_container}>
              <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Total Pay</Text>
            </View>
            <View style={styles.ordert_inner_second_container}>
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >{totalPay.toFixed(2)}</Text>
            </View>
          </View>


          {/* // payemt btn */}
          <Animatable.View
            animation="slideInLeft"
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{ flex: 1.3, justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: '100%', height: 50, backgroundColor: colors._theme_primary_color }}
              onPress={() => orderCreateHandler()}
            >
              <Animatable.Text
                animation="flash"
                iterationCount={2}
                style={{ fontSize: 20, color: '#fff', fontWeight: 'bold', fontFamily: 'Raleway' }}> Payment</Animatable.Text>
            </TouchableOpacity>
          </Animatable.View>

        </View>
      </ScrollView>

    </View>
  )
}

export default AddressPaymentDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors._bg_color,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  top_container: {
    paddingVertical: 10,
  },
  txt_style: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Raleway',
    fontWeight: Platform === 'ios' ? '600' : 'bold',

  },
  order_top_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  order_inner_first_container: {
    margin: 10
  },
  ordert_inner_second_container: {
    margin: 10,
    alignItems: 'flex-end'

  },
  order_txt_style: {
    fontSize: 19,
    color: '#000',
    fontFamily: 'Raleway'

  },
  shipping_container: {
    height: 200,
    width: '100%',
    marginVertical: 10

  },
  shipping_text_style: {
    fontSize: 17,
    fontFamily: 'Raleway',
    fontWeight: Platform === 'ios' ? '600' : 'bold',
    lineHeight: 17,
    marginBottom: 20,
    color: '#000'
  },
  text_icon_container: {
    flexDirection: 'row',
    marginLeft: 0,
    height: 40,
    // borderWidth: 1,
    alignItems: 'center',
    width: '95%'
  },
  shipping_box_text_style: {
    flex: 7,
    color: '#000',
    fontFamily: 'Raleway',
    fontWeight: '400',
  },
  change_btn: {
    position: 'absolute',
    right: 0,
  },
  change_btn_text: {
    fontSize: 17,
    color: colors._theme_primary_color,
    fontFamily: 'Raleway',
    fontWeight: Platform === 'ios' ? '600' : 'bold',
  },
  shipping_inner_box: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingVertical: 20,
    width: '100%'
  }


})