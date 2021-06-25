import React from 'react';
import colors from '../constants/colors';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import constValueStyles from '../constants/constValueStyles';

const TextLabel = props => {
  let {label, editable, error, value} = props;
  return (
    <View style={styles.container} {...props}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          multiline
          placeholder={value == '' ? `Add your ${label}` : value}
          placeholderTextColor={colors.obacityBlack}
          style={styles.textInput(editable, error)}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontFamily: constValueStyles.semiBoldFamily,
    fontSize: constValueStyles.smallText,
    color: colors.secondary,
    width: '15%',
  },
  inputContainer: {
    width: '80%',
  },
  textInput: (editable, error) => ({
    color: editable ? colors.obacityBlack : colors.basicText,
    fontFamily: constValueStyles.semiBoldFamily,
    borderBottomWidth: editable ? 1 : 0,
    borderBottomColor: error ? colors.errText : colors.obacityBlack,
  }),
  errorText: {
    color: colors.errText,
    fontFamily: constValueStyles.regularFamily,
    fontSize: constValueStyles.smallText,
  },
});
export default TextLabel;
