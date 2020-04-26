import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

const ReloadButton = ({callback, title}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={title}
        buttonStyle={styles.playButton}
        onPress={callback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: '20%',
    right: 0,
    bottom: '20%',
    left: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 200,
    borderRadius: 22,
    marginLeft: 16,
    zIndex: 10,
  },
});

export default ReloadButton;
