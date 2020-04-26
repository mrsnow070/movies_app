import React from 'react';
import Auth from './Auth';
import {Button} from 'react-native-elements';
import LabelSvg from './LabelSvg';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';

const AuthScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={[styles.text, {fontWeight: '900'}]}>Movie </Text>
        <Text style={[styles.text, {marginRight: 9}]}>Free</Text>
        <LabelSvg />
      </View>
      <Auth />

      <Button
        title="Sign Up"
        titleStyle={styles.buttonText}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpContainer: {
    paddingBottom: 100,
    justifyContent: 'flex-end',
    width: '89.5%',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    lineHeight: 43,
    color: '#fff',
  },
  buttonContainer: {
    flex: 1,
    marginLeft: '4.27%',
    marginRight: '6.13%',
    justifyContent: 'flex-end',
    paddingBottom: '10.84%',
  },
  button: {
    borderRadius: 22,
    backgroundColor: '#007AFF',
    paddingVertical: 13,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
  },
});

export default AuthScreen;
