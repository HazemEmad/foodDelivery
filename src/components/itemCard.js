import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';
import {floatingPrice} from '../services/helperFunctions';
import AddMinus from './addMinus';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';

const ItemCard = ({qty, url, name, price, cart, refresher}) => {
  const [addMinus, setAddMinus] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    setAddMinus(false);
  }, [isFocused]);
  const indexItemAtCart = cart.findIndex(obj => obj.name == name);
  return (
    <View>
      <TouchableOpacity
        style={styles.container(true)}
        onPress={() => setAddMinus(!addMinus)}>
        {url && <Image source={{uri: url}} style={styles.image} />}
        {qty && <Text style={styles.qty}>X{qty}</Text>}
        <View style={styles.row}>
          <Text style={styles.restaurantName} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.smallText}>{floatingPrice(price)}</Text>
        </View>
      </TouchableOpacity>
      {addMinus && (
        <AddMinus
          item={{name, price}}
          qtyAtCart={indexItemAtCart == -1 ? 0 : cart[indexItemAtCart].qty}
          refresher={refresher}
        />
      )}
    </View>
  );
};

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
  qty: {
    width: 30,
    fontFamily: constValueStyles.extraBoldFamily,
    fontSize: constValueStyles.smallText,
    color: colors.basicText,
  },
  restaurantName: {
    fontFamily: constValueStyles.extraBoldFamily,
    fontSize: constValueStyles.smallText,
    color: colors.basicText,
    width: '75%',
  },
  smallText: {
    fontFamily: constValueStyles.regularFamily,
    fontSize: constValueStyles.smallText,
    color: colors.secondary,
    width: '25%',
  },
  row: {
    flex: 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
const mapStateToProps = state => ({
  cart: state.cart.cart,
});
export default connect(mapStateToProps)(ItemCard);
