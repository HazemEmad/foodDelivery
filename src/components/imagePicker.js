import {get} from 'lodash';
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {DEFAUL_PROFILE} from '../constants/urls';
import {authUserData} from '../redux/actions/auth';

const ImagePicker = ({uri, dispatch, user}) => {
  const [photo, setPhoto] = useState(uri);

  const choosePhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        const profile = get(response, ['assets', 0, 'uri'], DEFAUL_PROFILE);
        setPhoto(profile);
        dispatch(authUserData({...user, picture: profile}));
      }
    });
  };
  console.log(photo);
  return (
    <TouchableOpacity onPress={() => choosePhoto()}>
      <Image
        style={styles.image(useWindowDimensions().width)}
        source={{
          uri: photo,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: width => ({
    height: 250,
    width: width,
    resizeMode: 'stretch',
    marginTop: 60,
  }),
});
export default ImagePicker;
