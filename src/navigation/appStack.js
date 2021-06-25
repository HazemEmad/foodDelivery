import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Orders from '../screens/orders';
import Account from '../screens/account';
import Location from '../screens/location';
import colors from '../constants/colors';
import TabIcon from '../components/tabIcon';
import constValueStyles from '../constants/constValueStyles';
import AppBar from '../components/appBar';

const Tab = createBottomTabNavigator();

const AppStack = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondary,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={styles.text(color, focused ? 15 : 12)}>Home</Text>
          ),
          tabBarIcon: ({focused, color}) => (
            <TabIcon name="home" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={styles.text(color, focused ? 15 : 12)}>Orders</Text>
          ),
          tabBarIcon: ({color, focused}) => (
            <TabIcon name="book" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={styles.text(color, focused ? 15 : 12)}>Account</Text>
          ),
          tabBarIcon: ({color, focused}) => (
            <TabIcon name="user" color={color} size={focused ? 25 : 20} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={styles.text(color, focused ? 15 : 12)}>Location</Text>
          ),
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              name="street-view"
              color={color}
              size={focused ? 25 : 20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: (color, size) => ({
    fontFamily: constValueStyles.boldFamily,
    color: color,
    fontSize: size,
  }),
});

export default AppStack;
