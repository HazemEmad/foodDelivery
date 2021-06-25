import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../screens/auth';

const Stack = createStackNavigator();

const AuthStack = props => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
