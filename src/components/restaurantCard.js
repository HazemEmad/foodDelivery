import React from 'react';
import {TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';

const RestaurantCard = ({url, name, type, rate, min, navigate}) => (
  <TouchableOpacity style={styles.container(true)} onPress={navigate}>
    <Image source={{uri: url}} style={styles.image} />
    <View style={{flex: 0.95}}>
      <Text style={styles.restaurantName}>{name}</Text>
      <Text style={styles.type}>{type}</Text>
      <View style={styles.line} />
      <View style={styles.container(false)}>
        <View style={styles.row}>
          <Icon name={'star'} color={colors.star} />
          <Text style={styles.smallText}>{rate}</Text>
        </View>
        <Text style={styles.smallText}>{min} mins</Text>
      </View>
    </View>
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
  type: {
    fontFamily: constValueStyles.semiBoldFamily,
    fontSize: constValueStyles.regularText,
    color: colors.obacityBlack,
  },
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

export default RestaurantCard;
