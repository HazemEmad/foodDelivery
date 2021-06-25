import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ImageBackground, Text} from 'react-native';
import colors from '../constants/colors';

import {connect} from 'react-redux';
import AppBar from '../components/appBar';
import constValueStyles from '../constants/constValueStyles';
import RestaurantCard from '../components/restaurantCard';
import {get} from 'lodash';
import {GET_RESTAURANTS, GET_OFFERS, DEFAULT_IMAGE} from '../constants/urls';
import Loading from '../components/loading';
import Search from '../components/search';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, user}) => {
  const [offers, setOffers] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [load, setLoad] = useState(true);
  const [modal, setModal] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setModal(false);
  }, [isFocused]);
  const label =
    get(user, 'area', 'Food Delivery') == ''
      ? 'Food Delivery'
      : get(user, 'area', 'Food Delivery');

  const getRestaurants = new Promise((resolve, reject) =>
    fetch(GET_RESTAURANTS)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(e => reject(e)),
  );
  const getOffers = new Promise((resolve, reject) =>
    fetch(GET_OFFERS)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(e => reject(e)),
  );

  useEffect(() => {
    let isSubscribed = true;
    if (load)
      Promise.all([getRestaurants, getOffers]).then(([restaurants, offers]) => {
        if (isSubscribed) {
          setRestaurants(restaurants);
          setOffers(offers);
          return setLoad(false);
        }
      });
    return () => (isSubscribed = false);
  }, [load]);
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.btnText}>Load More...</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppBar
        iconName={'bars'}
        title={label}
        navigation={navigation}
        back={false}
        search={() => setModal(true)}
        load={load}
      />
      {load ? (
        <Loading />
      ) : (
        <>
          <Search
            visible={modal}
            onRequestClose={() => setModal(false)}
            restaurants={restaurants}
            navigation={navigation}
          />
          <FlatList
            data={offers}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <ImageBackground
                  source={{uri: item.url || DEFAULT_IMAGE}}
                  style={styles.imageBackground}
                  imageStyle={styles.image}
                />
              );
            }}
          />
          <FlatList
            data={restaurants}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => setLoad(true)}
            refreshing={load}
            onEndReached={() =>
              getRestaurants.then(res =>
                setRestaurants([...restaurants, ...res]),
              )
            }
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            renderItem={({item}) => {
              return (
                <RestaurantCard
                  url={item.url || DEFAULT_IMAGE}
                  rate={item.rate}
                  name={item.name}
                  type={item.type}
                  min={item.delivery_min}
                  navigate={() =>
                    navigation.navigate('Items', {
                      items: item.items,
                    })
                  }
                />
              );
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: constValueStyles.paddingHorizontal,
    paddingTop: constValueStyles.paddingVertical,
  },
  imageBackground: {
    justifyContent: 'space-between',
    resizeMode: 'stretch',
    height: 200,
    width: 200,
    marginVertical: constValueStyles.listMarginBottom,
    marginRight: constValueStyles.listMarginHorizontal,
    backgroundColor: colors.white,
    elevation: 4,
  },
  image: {
    resizeMode: 'stretch',
  },
  footer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: colors.secondary,
    fontSize: constValueStyles.smallText,
    fontFamily: constValueStyles.semiBoldFamily,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Home);
