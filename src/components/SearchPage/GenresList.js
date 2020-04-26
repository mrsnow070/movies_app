import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {getGenres, loadGenres} from '../../ducks/genres';
import {getFilter, addFilter, deleteFilter} from '../../ducks/search';
import styles from '../../styles/genreListStyles';
import theme from '../../styles/theme';

const GenresList = () => {
  const genres = useSelector(state => getGenres(state));
  const filter = useSelector(state => getFilter(state));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(genres.length);
    if (genres.length) {
      dispatch(loadGenres());
    }
  }, [loadGenres]);

  const selectFilter = (cid, isSelected) => {
    isSelected ? dispatch(deleteFilter(cid)) : dispatch(addFilter(cid));
  };

  return (
    <FlatList
      data={genres}
      keyExtractor={item => item.cid}
      renderItem={({item}) => {
        const isSelected = filter.some(param => param === item.cid);
        return (
          <View style={[styles.genreContainer]}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => selectFilter(item.cid, isSelected)}>
              <View style={styles.genreCheckbox}>
                {isSelected && (
                  <IconEntypo
                    name="check"
                    color={theme.colors.sky.color}
                    size={20}
                  />
                )}
              </View>
              <Text
                style={[
                  isSelected ? styles.selectedGenre : styles.genre,
                  {marginRight: 15},
                ]}>
                {item.category_name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default GenresList;
