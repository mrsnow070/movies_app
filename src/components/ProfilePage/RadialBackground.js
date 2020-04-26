import React from 'react';
import RadialGradient from 'react-native-radial-gradient';
import {StyleSheet} from 'react-native';
import {screenWidth} from '../../const';

const RadialBackGround = () => {
  return (
    <RadialGradient
      style={styles.radialGradient}
      colors={['#021B79', '#0575E6']}
      stops={[0.1, 0.4, 0.3, 0.75]}
      center={[78, 210]}
      radius={500}
    />
  );
};

const styles = StyleSheet.create({
  radialGradient: {
    height: 210,
    width: screenWidth,
  },
});

export default RadialBackGround;
