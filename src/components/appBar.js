import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import constValueStyles from '../constants/constValueStyles';
import {useSelector} from 'react-redux';

const AppBar = ({iconName, title, navigation, back, search, load}) => {
  const itemsCart = useSelector(state => state.cart.cart.length);
  return (
    <View style={styles.container(useWindowDimensions().width)}>
      <TouchableOpacity
        onPress={() => (back ? navigation.goBack() : navigation.openDrawer())}>
        <Icon name={iconName} size={25} color={colors.basicText} />
      </TouchableOpacity>
      <Text style={styles.boldText} numberOfLines={1}>
        {title}
      </Text>
      {search && !load && (
        <Icon
          name={'search'}
          size={23}
          color={colors.secondary}
          style={{position: 'absolute', right: 30}}
          onPress={() => search()}
        />
      )}
      {itemsCart != 0 && title != 'Cart' && title != 'Checkout' && (
        <Icon
          name={'cart-plus'}
          size={23}
          color={colors.secondary}
          style={{position: 'absolute', right: search && !load ? 70 : 30}}
          onPress={() => navigation.navigate('Cart')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: width => ({
    flexDirection: 'row',
    backgroundColor: colors.background,
    marginBottom: constValueStyles.listMarginBottom,
    elevation: 1,
    width: width,
    position: 'absolute',
    top: 0,
    height: 60,
    paddingHorizontal: constValueStyles.paddingHorizontal,
    alignItems: 'center',
    zIndex: 10,
  }),
  boldText: {
    fontFamily: constValueStyles.boldFamily,
    color: colors.basicText,
    fontSize: 20,
    marginHorizontal: 30,
    width: '55%',
  },
});
export default AppBar;
