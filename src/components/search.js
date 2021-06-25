import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, FlatList, TextInput, Text} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import RestaurantCard from './restaurantCard';
import constValueStyles from '../constants/constValueStyles';
import {useIsFocused} from '@react-navigation/native';

const Search = ({visible, onRequestClose, restaurants, navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearchTerm('');
  }, [isFocused]);
  const filterRestaurant = restaurants.filter(restaurant =>
    restaurant.name.toUpperCase().includes(searchTerm.toUpperCase()),
  );
  return (
    <Modal
      style={styles.container}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            name={'arrow-left'}
            size={25}
            color={colors.basicText}
            onPress={onRequestClose}
          />
          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder={'search with your restaurant'}
              placeholderTextColor={colors.obacityBlack}
              onChangeText={val => setSearchTerm(val)}
              style={styles.textInput}
            />
          </View>
        </View>
        <FlatList
          data={filterRestaurant}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.centralItems}>
              <Text style={styles.notFoundText}>not fount any restaurant!</Text>
            </View>
          )}
          contentContainerStyle={filterRestaurant.length == 0 && {flex: 1}}
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: constValueStyles.paddingHorizontal,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '90%',
    borderRadius: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.obacityBlack,
  },
  textInput: {
    color: colors.basicText,
    fontFamily: constValueStyles.semiBoldFamily,
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
export default Search;
