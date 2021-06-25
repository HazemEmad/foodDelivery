import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppStack from './appStack';
import Items from '../screens/Items';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import SideMenu from '../components/drawer';
const Drawer = createDrawerNavigator();

const AppDrawer = props => {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen name="AppStack" component={AppStack} />
      <Drawer.Screen name="Items" component={Items} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Checkout" component={Checkout} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
