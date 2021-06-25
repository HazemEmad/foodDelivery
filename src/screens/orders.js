import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';
import AppBar from '../components/appBar';
import {connect} from 'react-redux';
import OrderCard from '../components/orderCard';
import {GET_ORDERS} from '../constants/urls';
import Loading from '../components/loading';
import {isArray} from 'lodash-es';

const Orders = ({navigation}) => {
  const [pressed, setPressed] = useState(true);
  const [orders, setOrders] = useState(null);
  const [load, setLoad] = useState(true);
  const getOrders = () =>
    fetch(GET_ORDERS)
      .then(response => response.json())
      .then(json => setOrders(isArray(json) ? json : []))
      .finally(() => setLoad(false));

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      load && getOrders();
    }
    return () => (isSubscribed = false);
  }, [load]);
  return (
    <View style={styles.container}>
      <AppBar
        iconName={'arrow-left'}
        title={'Orders'}
        navigation={navigation}
        back={true}
      />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setPressed(true)}>
          <Text style={styles.tabs(pressed)}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPressed(false)}>
          <Text style={styles.tabs(!pressed)}>Previous</Text>
        </TouchableOpacity>
      </View>
      {!load ? (
        <FlatList
          data={orders.filter(
            order => order.state == (pressed ? 'pending' : 'delivered'),
          )}
          ListEmptyComponent={() => (
            <View style={styles.centralItems}>
              <Text style={styles.notFoundText}>
                No orders {pressed ? 'active' : 'previous'}
              </Text>
            </View>
          )}
          onRefresh={() => setLoad(true)}
          refreshing={load}
          contentContainerStyle={{flex: 1}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <OrderCard
                url={item.url}
                date={item.date}
                name={item.name}
                state={item.state}
                navigate={() =>
                  navigation.navigate('Items', {
                    items: item.items,
                  })
                }
              />
            );
          }}
        />
      ) : (
        <Loading />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: '70%',
    marginVertical: constValueStyles.listMarginBottom + 10,
  },
  tabs: active => ({
    fontSize: constValueStyles.mediumText,
    fontFamily: constValueStyles.semiBoldFamily,
    color: active ? colors.secondary : colors.obacityBlack,
  }),
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
  user: state.auth.user,
});
export default connect(mapStateToProps)(Orders);
