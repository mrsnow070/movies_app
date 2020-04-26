import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, Text, View} from 'react-native';
import {getMovies} from '../ducks/movies';
import Movie from './Movie';
import Loader from './common/Loader';
import styles from '../styles/movieListStyles';

const MoviesList = ({navigation, cid, categoryTitle, vertical}) => {
  const movies = useSelector(state => getMovies(state, cid));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{categoryTitle}</Text>
      </View>
      {movies ? (
        <FlatList
          data={movies}
          horizontal={!vertical}
          style={[vertical && styles.flatListPadding]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Movie
              detail={item}
              cid={cid}
              key={item.id}
              vertical={!vertical}
              id={item.id}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default MoviesList;
