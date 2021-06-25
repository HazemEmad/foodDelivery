import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../constants/colors';
import AppBar from '../components/appBar';
import {connect} from 'react-redux';
import constValueStyles from '../constants/constValueStyles';
import {get} from 'lodash';
import {Formik} from 'formik';
import * as yup from 'yup';
import TextLabel from '../components/textLabel';
import {authUserData} from '../redux/actions/auth';
import ImagePicker from '../components/imagePicker';

const Account = ({navigation, user, dispatch}) => {
  const [edit, setEdit] = useState(false);
  const nameRegExp = /^([^0-9]*)$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return (
    <View style={styles.container}>
      <AppBar
        iconName={'arrow-left'}
        title={'Account'}
        navigation={navigation}
        back={true}
      />
      <ScrollView>
        <ImagePicker
          uri={get(user, 'picture')}
          dispatch={dispatch}
          user={user}
        />
        <Formik
          initialValues={{
            name: get(user, 'name', ''),
            phone: get(user, 'phone', ''),
            email: get(user, 'email', ''),
            area: get(user, 'area', ''),
          }}
          onSubmit={values => {
            console.log({
              name: values.name,
              phone: values.phone,
              email: values.email,
              area: values.area,
            });
          }}
          validationSchema={yup.object().shape({
            name: yup
              .string()
              .matches(nameRegExp, "name shouldn't contain numbers")
              .required('Name Required!')
              .typeError('Name must be a string!'),
            phone: yup
              .string()
              .required('Phone Required!')
              .matches(phoneRegExp, 'Phone number is not valid')
              .length(11),
            email: yup
              .string()
              .required('Phone Required!')
              .trim()
              .email('Invalid email!')
              .typeError('Invalid email!'),
            area: yup.string().required('Area Required!'),
          })}
          validateOnBlur={false}>
          {({values, handleChange, errors, isValid, handleSubmit}) => (
            <View style={styles.formContainer}>
              <Fragment>
                <TextLabel
                  label={'Name'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  editable={edit}
                  error={errors.name}
                />
                <TextLabel
                  label={'Email'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  editable={edit}
                  error={errors.email}
                />
                <TextLabel
                  label={'Phone'}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  editable={edit}
                  error={errors.phone}
                />
                <TextLabel
                  label={'Area'}
                  value={values.area}
                  onChangeText={handleChange('area')}
                  editable={edit}
                  error={errors.area}
                />
              </Fragment>
              <TouchableOpacity
                onPress={() => {
                  dispatch(authUserData({...values, picture: user.picture}));
                  setEdit(!edit);
                  handleSubmit;
                }}
                disabled={!isValid}
                style={styles.editButton(isValid)}>
                <Text style={styles.textButton}>
                  {edit ? 'Submit' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: width => ({
    height: 250,
    width: width,
    resizeMode: 'stretch',
    marginTop: 60,
  }),
  formContainer: {
    flex: 1,
    paddingHorizontal: constValueStyles.paddingHorizontal,
    marginBottom: 30,
  },
  editButton: valid => ({
    marginTop: 25,
    alignSelf: 'center',
    backgroundColor: valid ? colors.secondary : colors.obacityBlack,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  }),
  textButton: {
    fontFamily: constValueStyles.semiBoldFamily,
    color: colors.white,
    fontSize: constValueStyles.regularText,
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Account);
