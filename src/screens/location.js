import React, {useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import GeolocationCustomHook from '../hooks/geolocationCustomHook';
import colors from '../constants/colors';
import GeocoderCustomHook from '../hooks/geocoderCustomHook';
import {connect} from 'react-redux';
import AppBar from '../components/appBar';
import {get} from 'lodash-es';
import {authUserData} from '../redux/actions/auth';
import Loading from '../components/loading';

const Location = ({user, navigation, dispatch}) => {
  const {currentLongitude, currentLatitude} = GeolocationCustomHook();
  const address = GeocoderCustomHook();
  useEffect(() => {
    if (address) {
      if (get(user, 'area', '') == '') {
        dispatch(authUserData({...user, area: get(address, 'long_name', '')}));
      }
    }
  }, [address]);
  return (
    <View style={styles.container}>
      <AppBar
        iconName={'arrow-left'}
        title={'Location'}
        navigation={navigation}
        back={true}
      />
      {currentLongitude && currentLatitude ? (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: parseFloat(currentLatitude),
              longitude: parseFloat(currentLongitude),
            }}
          />
        </MapView>
      ) : (
        <Loading />
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Location);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
