import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import {getFavouriteMovies} from '../../ducks/movies';
import Movie from '../Movie';
import {parse} from '../../utils';
import styles from '../../styles/favouriteScreenStyles';

const FavouriteScreen = ({navigation, vertical}) => {
  const movies = useSelector(state => getFavouriteMovies(state));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favourite movies</Text>
      {movies.length !== 0 ? (
        <FlatList
          data={movies}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const movie = parse(item);

            return (
              <View style={styles.movieContainer}>
                <View style={{marginRight: 13}}>
                  <Movie
                    detail={movie}
                    cid={movie.cid}
                    key={movie.id}
                    vertical={!vertical}
                    id={item.id}
                    navigation={navigation}
                  />
                </View>
                <View style={{width: 230, paddingTop: 7}}>
                  <Text
                    style={[
                      styles.movieText,
                      {marginBottom: 14},
                    ]}>{`${movie.category_name}, ${movie.year}`}</Text>
                  <Text style={styles.movieDesc}>{movie.description}</Text>
                  <Text style={[styles.movieText, {marginVertical: 5}]}>
                    {movie.director}
                  </Text>
                  <Text style={styles.movieText}>{movie.stars}</Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text style={styles.text}>No favourite movies</Text>
      )}
    </SafeAreaView>
  );
};

export default FavouriteScreen;
