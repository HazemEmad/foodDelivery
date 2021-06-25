import {connect, useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import AppBar from '../components/appBar';
import {Radio, FormControl, VStack, NativeBaseProvider} from 'native-base';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';
import ModalOfPayment from '../components/modalOfPayment';
import {GET_ORDERS} from '../constants/urls';
import {clearCart} from '../redux/actions/cart';
import {CommonActions} from '@react-navigation/native';

const Checkout = ({navigation, cart, dispatch}) => {
  const [payment, setPayment] = useState('cash');
  const [showGateway, setShowGateway] = useState(false);
  const [load, setLoad] = useState(false);

  const makeOrder = () => {
    setLoad(true);
    fetch(GET_ORDERS, {
      method: 'POST',
      body: JSON.stringify({
        items: cart,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(clearCart());
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        });
        navigation.dispatch(resetAction);
      })
      .finally(() => setLoad(false));
  };
  return (
    <View style={styles.container}>
      {showGateway ? (
        <ModalOfPayment
          showGateway={showGateway}
          setShowGateway={bool => setShowGateway(bool)}
          makeOrder={makeOrder}
        />
      ) : null}
      <AppBar
        iconName={'arrow-left'}
        title={'Checkout'}
        navigation={navigation}
        back={true}
      />
      <NativeBaseProvider>
        <FormControl>
          <FormControl.Label mb={3}>
            Choose your payment method:
          </FormControl.Label>
          <Radio.Group
            nativeID="patani"
            name="cash_visa"
            value={payment}
            onChange={nextValue => {
              setPayment(nextValue);
            }}>
            <VStack space={3} aria>
              <Radio value="cash">Cash</Radio>
              <Radio value="visa">Visa</Radio>
            </VStack>
          </Radio.Group>
        </FormControl>
      </NativeBaseProvider>
      {payment == 'visa' && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setShowGateway(true)}>
          <Text style={styles.btnTxt}>Pay Using PayPal</Text>
        </TouchableOpacity>
      )}
      {payment == 'cash' && (
        <TouchableOpacity onPress={makeOrder} style={styles.editButton}>
          {load ? (
            <ActivityIndicator size={20} color={colors.white} />
          ) : (
            <Text style={styles.textButton}>Submit</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: constValueStyles.paddingHorizontal,
    paddingVertical: constValueStyles.paddingVertical,
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    backgroundColor: '#014679',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  editButton: {
    position: 'absolute',
    bottom: 100,
    marginTop: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    width: 100,
    height: 50,
    paddingVertical: 10,
  },
  textButton: {
    fontFamily: constValueStyles.semiBoldFamily,
    color: colors.white,
    fontSize: constValueStyles.regularText,
  },
});
const mapStateToProps = state => ({
  cart: state.cart.cart,
});
export default connect(mapStateToProps)(Checkout);
