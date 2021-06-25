import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import constValueStyles from '../constants/constValueStyles';
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions/cart';
import {helperAddToCart} from '../services/helperFunctions';

const AddMinus = ({item, cart, dispatch, qtyAtCart, refresher}) => {
  const [counter, setCounter] = useState(qtyAtCart);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      refresher();
      dispatch(addToCart(helperAddToCart(item, counter, cart)));
    }
    setFirstRender(false);
  }, [counter]);
  return (
    <View style={styles.row}>
      <Icon
        name={'plus'}
        color={colors.secondary}
        size={20}
        onPress={() => counter < 100 && setCounter(counter + 1)}
      />
      <Text style={styles.counter}>{counter}</Text>
      <Icon
        name={'minus'}
        color={colors.secondary}
        size={20}
        onPress={() => counter != 0 && setCounter(counter - 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '70%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
  counter: {
    fontFamily: constValueStyles.extraBoldFamily,
    fontSize: constValueStyles.smallText,
    color: colors.basicText,
  },
});
const mapStateToProps = state => ({
  cart: state.cart.cart,
});
export default connect(mapStateToProps)(AddMinus);
