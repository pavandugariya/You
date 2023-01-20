import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonField from '../components/ButtonField';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const AddressPaymentDetails = () => {
  const navigation = useNavigation();
  return (
    <View
      // colors={['#051937', '#AAD9DF']}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 0.5 }}
      style={styles.container}>
      <ScrollView>

        {/* shipping code */}
        <View style={styles.shipping_container} >
          <Text style={styles.shipping_text_style}>Shipping information </Text>

          <View style={styles.text_icon_container}>
            <Ionicons name='person-outline' size={24} style={{ marginHorizontal: 10, flex: 1, }} />
            <Text style={[styles.shipping_box_text_style, { fontSize: 17 }]} >Kalika Mishra </Text>
          </View>

          <View style={styles.text_icon_container}>
            <Ionicons name='location-outline' size={24} style={{ marginHorizontal: 10, flex: 1, }} />
            <Text style={[styles.shipping_box_text_style, { fontSize: 15 }]} >Codes For Tomorrow Veena nagar B-35 MR-10 Indore </Text>
          </View>
          <View style={styles.text_icon_container}>
            <Ionicons name='call-outline' size={24} style={{ marginHorizontal: 10, flex: 1, }} />
            <Text style={[styles.shipping_box_text_style, { fontSize: 15 }]} > 9977917065 </Text>
          </View>
          <TouchableOpacity style={styles.change_btn}
            onPress={() => navigation.navigate('EditAddress')}
          >
            <Text style={styles.change_btn_text}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Billing code */}
        <View style={styles.shipping_container} >
          <Text style={styles.shipping_text_style}>Billing information </Text>

          <View style={styles.text_icon_container}>
            <Ionicons name='person-outline' size={24} style={{ marginHorizontal: 10, flex: 1, }} />
            <Text style={[styles.shipping_box_text_style, { fontSize: 17 }]} >Kalika Mishra </Text>
          </View>

          <View style={styles.text_icon_container}>
            <Ionicons name='location-outline' size={24} style={{ marginHorizontal: 10, flex: 1, }} />
            <Text style={[styles.shipping_box_text_style, { fontSize: 15 }]} >Codes For Tomorrow Veena nagar B-35 MR-10 Indore, </Text>
          </View>
          <View style={styles.text_icon_container}>
            <Ionicons name='call-outline' size={24} style={{ marginHorizontal: 10, flex: 1, }} />
            <Text style={[styles.shipping_box_text_style, { fontSize: 15 }]} > 9977917065 </Text>
          </View>
        </View>

        <View style={styles.top_container}>
          <Text style={styles.txt_style}>Promo Code</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
            <TextInput
              fontSize={20}
              style={{ flex: 1, backgroundColor: '#f2f2f2', paddingHorizontal: 10, borderRadius: 5, marginRight: 10, borderWidth: 0.2, height: 40 }}
            />
            <Animatable.View animation='zoomInLeft'>
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={[styles.txt_style, { color: '#5956E9' }]}>Apply</Text>
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
              <Text style={[styles.order_txt_style, { marginTop: 10 }]} >Discount</Text>
            </View>
            <View style={styles.ordert_inner_second_container}>
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >5000.00</Text>
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >100.00</Text>
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >-2000.00</Text>
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
              <Text style={[styles.order_txt_style, { color: '#000', marginTop: 10 }]} >2900.00</Text>
            </View>
          </View>


          {/* // payemt btn */}
          <Animatable.View
            animation="slideInLeft"
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{ flex: 1.3, justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: '100%', height: 50, backgroundColor: '#5956E9' }}
              onPress={() => navigation.navigate('Payment')}
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
    // backgroundColor: '#AAD9DF',efe3de
    //backgroundColor: '#efe3de',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  top_container: {

    //backgroundColor: '#f0f',
    // borderRadius: 5,
    // paddingHorizontal: 10,
    paddingVertical: 20,
    // paddingTop: 20
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 4,

  },
  txt_style: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Raleway'
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
    height: 170,
    width: '95%',
    marginVertical: 10

  },
  shipping_text_style: {
    fontSize: 17,
    fontFamily: 'Raleway',
    fontWeight: '600',
    lineHeight: 17,
    marginBottom: 30,
    color: '#000'
  },
  text_icon_container: {
    flexDirection: 'row',
    marginLeft: 10,
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
    fontSize: 15,
    color: '#5956E9',
    fontFamily: 'Raleway',
    fontWeight: '600'

  }


})