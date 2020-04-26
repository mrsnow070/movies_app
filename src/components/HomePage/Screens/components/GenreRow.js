import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getGenres} from '../../../../ducks/genres';
import {addFilter, resetFilter} from '../../../../ducks/search';
import styles from '../../../../styles/genresRowStyles';
import {withNavigation} from 'react-navigation';

const GenreRow = ({navigation}) => {
  const genres = useSelector(state => getGenres(state));
  const dispatch = useDispatch();

  const _onSelectGenre = cid => {
    dispatch(resetFilter());
    dispatch(addFilter(cid));
    navigation.navigate('Search');
  };

  return (
    <FlatList
      data={genres}
      keyExtractor={item => item.cid}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <View style={[styles.container]}>
            <TouchableOpacity
              onPress={() => _onSelectGenre(item.cid)}
              style={styles.touchable}
            />
            <Text style={styles.text}>{item.category_name}</Text>
          </View>
        );
      }}
    />
  );
};

export default withNavigation(GenreRow);
