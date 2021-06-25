import {useEffect, useState} from 'react';
import Geocoder from 'react-native-geocoding';
import {YOUR_API_KEY} from '../constants/urls';
import GeolocationCustomHook from './geolocationCustomHook';

const GeocoderCustomHook = () => {
  const [address, setAddress] = useState();
  const {currentLongitude, currentLatitude} = GeolocationCustomHook();
  useEffect(() => {
    Geocoder.init(YOUR_API_KEY);
  }, []);
  useEffect(() => {
    if (currentLatitude && currentLongitude)
      Geocoder.from({
        latitude: parseFloat(currentLatitude),
        longitude: parseFloat(currentLongitude),
      })
        .then(json => {
          setAddress(json.results[0].address_components[0]);
        })
        .catch(error => console.warn(error));
  }, [currentLongitude, currentLatitude]);

  return address;
};

export default GeocoderCustomHook;
