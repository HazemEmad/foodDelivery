import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import constValueStyles from '../constants/constValueStyles';
import auth from '@react-native-firebase/auth';
import {logoutUser} from '../redux/actions/auth';
import {connect} from 'react-redux';
import TabIcon from './tabIcon';

const SideMenu = props => {
  const items = [
    {
      name: 'Home',
      iconName: 'home',
    },
    {
      name: 'Orders',
      iconName: 'book',
    },
    {
      name: 'Account',
      iconName: 'user',
    },
    {
      name: 'Location',
      iconName: 'street-view',
    },
    {
      name: 'Cart',
      iconName: 'cart-plus',
    },

    {
      name: 'Logout',
      iconName: 'sign-out',
    },
  ];
  const signout = () => {
    auth()
      .signOut()
      .then(() => {
        props.dispatch(logoutUser());
        console.log('User signed out!');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FOOD DELIVERY</Text>
      {items.map(item => (
        <TouchableOpacity
          key={item.name}
          style={styles.row}
          onPress={() =>
            item.name == 'Logout'
              ? signout()
              : props.navigation.navigate(item.name)
          }>
          <TabIcon
            name={item.iconName}
            size={25}
            color={colors.secondary}
            style={{width: '40%'}}
          />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: constValueStyles.largeText,
    color: colors.secondary,
    fontFamily: constValueStyles.extraBoldFamily,
    marginBottom: constValueStyles.listMarginBottom * 5,
  },
  text: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: constValueStyles.semiBoldFamily,
    width: '60%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginVertical: 20,
  },
});
export default connect()(SideMenu);
