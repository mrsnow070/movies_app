import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RangeItem = ({text, selected, inRange, direction, click}) => (
  <TouchableOpacity
    onPress={click}
    style={{position: 'relative', width: '33%', marginLeft: 16}}>
    <View style={styles.rangeEnryContainer}>
      {selected && (
        <Svg
          width={88}
          height={72}
          viewBox="0 0 88 72"
          style={{position: 'absolute', top: 5}}
          fill="none">
          {direction === 'left' ? (
            <Path
              d="M74 46.256a8 8 0 01-8 8H33.898a8 8 0 01-6.3-3.07l-10.957-14a8 8 0 010-9.86l10.957-14a8 8 0 016.3-3.07H66a8 8 0 018 8v28z"
              fill="#007AFF"
            />
          ) : (
            <Path
              d="M14.646 18a8 8 0 018-8h32.102a8 8 0 016.3 3.07l10.957 14a8 8 0 010 9.86l-10.957 14a8 8 0 01-6.3 3.07H22.646a8 8 0 01-8-8V18z"
              fill="#007AFF"
            />
          )}
        </Svg>
      )}
      <Text
        style={[
          styles.text,
          inRange && styles.textInRange,
          selected && styles.textSelected,
          direction === 'left' && {marginLeft: 10},
        ]}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: '#8C8C8C',
    zIndex: 1,
    alignSelf: 'center',
    fontSize: 17,
    lineHeight: 21,
  },
  textInRange: {color: '#007AFF'},
  textSelected: {color: '#fff'},
  rangeEnryContainer: {
    width: 88,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RangeItem;
