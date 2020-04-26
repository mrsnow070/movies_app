import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const Blur = ({children}) => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <BlurView style={styles.absolute} blurAmount={4} />
      ) : null}
      <View style={styles.wrapper}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(3, 8, 24, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Blur;
