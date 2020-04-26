import React, {useState} from 'react';
import RangeItem from './RangeItem';
import {View, FlatList, StyleSheet} from 'react-native';

const RangeSelector = () => {
  const range = [30, 50, 70, 90, 10];
  const [direction, setDirection] = useState(true);
  const [selected, setSelected] = useState({
    from: range[0],
    to: range[range.length - 1],
  });

  const selectHandler = int => {
    const elIndex = range.indexOf(int);
    const fromIndex = range.indexOf(selected.from);
    const toIndex = range.indexOf(selected.to);

    if (!direction) {
      elIndex < fromIndex
        ? (setSelected({
            from: int,
            to: selected.to,
          }),
          setDirection(false))
        : (setSelected({
            from: selected.from,
            to: int,
          }),
          setDirection(true));
    }
    if (direction) {
      elIndex < toIndex
        ? (setSelected({
            from: int,
            to: selected.to,
          }),
          setDirection(false))
        : (setSelected({
            from: selected.from,
            to: int,
          }),
          setDirection(true));
    }
  };

  const checkRange = int => {
    const elIndex = range.indexOf(int);
    const fromIndex = range.indexOf(selected.from);
    const toIndex = range.indexOf(selected.to);
    return fromIndex < elIndex && toIndex > elIndex;
  };

  return (
    <View style={styles.selectionBlock}>
      <FlatList
        data={range}
        numColumns={3}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <RangeItem
            selected={item === selected.from || item === selected.to}
            direction={item === selected.to ? 'left' : null}
            text={`${item}s`}
            click={() => selectHandler(item)}
            inRange={checkRange(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectionBlock: {flex: 2, paddingTop: 40, justifyContent: 'center'},
});

export default RangeSelector;
