import {connect} from 'react-redux';
import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import AppBar from '../components/appBar';
import ItemCard from '../components/itemCard';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';

const Cart = ({navigation, cart}) => {
  const counter = useSelector(state => state.cart.cart.length);
  const [refresher, setRefresher] = useState(false);
  return (
    <View style={styles.container}>
      <AppBar
        iconName={'arrow-left'}
        title={'Cart'}
        navigation={navigation}
        back={true}
      />
      <FlatList
        data={cart}
        ListEmptyComponent={() => (
          <View style={styles.centralItems}>
            <Text style={styles.notFoundText}>No products available!</Text>
          </View>
        )}
        extraData={counter || refresher}
        contentContainerStyle={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <ItemCard
              qty={item.qty}
              name={item.name}
              price={item.price}
              refresher={() => setRefresher(!refresher)}
            />
          );
        }}
      />
      {counter != 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.text}>Go to checkout</Text>
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
  notFoundText: {
    color: colors.obacityBlack,
    fontFamily: constValueStyles.semiBoldFamily,
    fontSize: constValueStyles.regularText,
  },
  centralItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '60%',
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    justifyContent: 'center',
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
const mapStateToProps = state => ({
  cart: state.cart.cart,
});
export default connect(mapStateToProps)(Cart);
