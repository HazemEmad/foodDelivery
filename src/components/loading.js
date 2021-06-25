import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colors.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
