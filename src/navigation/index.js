import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './authStack';
import AppDrawer from './appDrawer';
import {connect} from 'react-redux';

const MainNavigator = ({user}) => {
  return (
    <NavigationContainer>
      {Object.entries(user).length != 0 ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(MainNavigator);
