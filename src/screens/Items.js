import {connect} from 'react-redux';
import {get} from 'lodash';
import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import AppBar from '../components/appBar';
import FoundCartItems from '../components/foundItemsCart';
import ItemCard from '../components/itemCard';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';

const Items = ({navigation, route}) => {
  const [refresher, setRefresher] = useState(false);
  const items = get(route, ['params', 'items'], []);
  return (
    <View style={styles.container}>
      <FoundCartItems navigation={navigation} />
      <AppBar
        iconName={'arrow-left'}
        title={'Items'}
        navigation={navigation}
        back={true}
      />
      <FlatList
        data={items}
        ListEmptyComponent={() => (
          <View style={styles.centralItems}>
            <Text style={styles.notFoundText}>No products available!</Text>
          </View>
        )}
        extraData={refresher}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <ItemCard
              url={item.url}
              name={item.name}
              price={item.price}
              refresher={() => setRefresher(!refresher)}
            />
          );
        }}
      />
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
});
const mapStateToProps = state => ({
  cart: state.cart.cart,
});
export default connect(mapStateToProps)(Items);
