import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import constValueStyles from '../constants/constValueStyles';
import {useSelector} from 'react-redux';

const FoundCartItems = ({cart, navigation}) => {
  const counter = useSelector(state => state.cart.cart.length);
  return counter != 0 ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Cart')}>
      <Text style={styles.text}>Go to your cart</Text>
      <Icon name={'cart-plus'} size={25} color={colors.white} />
      <Text style={styles.text}>X{counter}</Text>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '90%',
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    zIndex: 10,
  },
  text: {
    color: colors.white,
    fontSize: constValueStyles.regularText,
    fontFamily: constValueStyles.boldFamily,
  },
});

export default FoundCartItems;
