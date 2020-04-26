import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

const Auth = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.title}>Sign up</Text>
      <View style={[styles.inputContainer, {marginTop: 41}]}>
        <Input
          placeholderTextColor="#8C8C8C"
          inputStyle={styles.inputStyle}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="User name or email"
        />
      </View>
      <View style={[styles.inputContainer, {marginTop: 31}]}>
        <Input
          placeholderTextColor="#8C8C8C"
          inputStyle={styles.inputStyle}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    color: '#DADADA',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 34,
    alignSelf: 'flex-start',
    marginLeft: 17,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: 22,
    width: '89.6%',
  },
  inputStyle: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 18,
    paddingLeft: 21,
  },
});

export default Auth;
