import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/colors';
import {authUserData} from '../redux/actions/auth';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import constValueStyles from '../constants/constValueStyles';
import R from '../constants/R';
import {DEFAUL_PROFILE} from '../constants/urls';
import {get} from 'lodash';

const Auth = ({dispatch}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current)
      GoogleSignin.configure({
        webClientId:
          '409637702414-bodadbdhlvhhboomu72i4g6tcho3c5f5.apps.googleusercontent.com',
      });
    return () => (isMounted.current = false);
  }, []);

  const saveUser = user => {
    console.log(user,user.additionalUserInfo.profile.picture);
    setError('');
    user = {
      name: get(user, ['additionalUserInfo', 'profile', 'name'], ''),
      phone: get(user, ['additionalUserInfo', 'user', 'phoneNumber'], ''),
      email: get(user, ['additionalUserInfo', 'profile', 'email'], ''),
      area: '',
      picture:
        get(user, [
          'additionalUserInfo',
          'profile',
          'picture',
          'data',
          'url',
        ]) ||
        get(user, ['additionalUserInfo', 'profile', 'picture'], DEFAUL_PROFILE),
    };
    dispatch(authUserData(user));
  };

  async function onFacebookButtonPress() {
    setError('');
    setLoading(true);
    // Attempt login with permissions

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    setError('');
    setLoading(true);
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FOOD DELIVERY</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isMounted.current)
            onFacebookButtonPress()
              .then(user => saveUser(user))
              .catch(err => setError(err.toString()))
              .finally(() => setLoading(false));
        }}>
        <R.Fb style={styles.svgIcons} />
        <Text style={styles.textButton}>Facebook Sign-In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isMounted.current)
            onGoogleButtonPress()
              .then(user => saveUser(user))
              .catch(err => setError(err.toString()))
              .finally(() => setLoading(false));
        }}>
        <R.Gm style={styles.svgIcons} />
        <Text style={styles.textButton}>Google Sign-In</Text>
      </TouchableOpacity>
      <Text style={styles.errText}>{error}</Text>
      {loading && (
        <ActivityIndicator
          size={40}
          color={colors.background}
          style={styles.indicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: constValueStyles.largeText,
    color: colors.background,
    fontFamily: constValueStyles.extraBoldFamily,
    marginBottom: constValueStyles.listMarginBottom * 5,
  },
  textButton: {
    fontFamily: constValueStyles.boldFamily,
    textAlign: 'center',
    color: colors.secondary,
    fontSize: constValueStyles.regularText,
  },
  button: {
    backgroundColor: colors.background,
    paddingVertical: 20,
    marginBottom: constValueStyles.listMarginBottom,
    borderRadius: constValueStyles.radius,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  svgIcons: {
    width: 100,
    height: 25,
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100,
  },
  errText: {
    fontFamily: constValueStyles.semiBoldFamily,
    textAlign: 'center',
    color: colors.errText,
    fontSize: constValueStyles.regularText,
  },
});
export default connect()(Auth);
