import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';

const OrderCard = ({url, name, state, date, navigate}) => (
  <TouchableOpacity style={styles.container(true)} onPress={navigate}>
    <Text style={styles.type(state == 'delivered')}>{state}</Text>
    <Text style={styles.smallText}>{date}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: bool => ({
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    elevation: bool ? 3 : 0,
    marginVertical: bool ? 10 : 0,
  }),
  image: {
    resizeMode: 'stretch',
    width: 90,
    height: 90,
  },
  restaurantName: {
    fontFamily: constValueStyles.boldFamily,
    fontSize: constValueStyles.regularText,
    color: colors.basicText,
  },
  type: state => ({
    fontFamily: constValueStyles.regularFamily,
    fontSize: constValueStyles.regularText,
    color: state ? colors.success : colors.star,
  }),
  line: {
    borderWidth: 0.5,
    borderColor: colors.obacityBlack,
  },
  smallText: {
    fontFamily: constValueStyles.regularFamily,
    fontSize: constValueStyles.smallText,
    color: colors.obacityBlack,
    marginHorizontal: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrderCard;
