import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  getWatchedMovies,
  clearWatchingHistory,
  getWatchLaterMovies,
} from '../../ducks/movies';
import Movie from '../Movie';
import BackButton from '../common/BackButton';
import {getRandomID} from '../../utils';
import styles from '../../styles/historyScreenStyles';

const HistoryScreen = ({navigation}) => {
  const movies = useSelector(state => getWatchedMovies(state));
  const watchLater = useSelector(state => getWatchLaterMovies(state));
  const dispatch = useDispatch();

  const isWatchLater = navigation.getParam('watchLater');

  const onPressHandler = () => dispatch(clearWatchingHistory());

  const getList = data => {
    return (
      <View style={{marginLeft: 16}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id + getRandomID()}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row'}}>
              <Movie
                detail={item}
                cid={item.cid}
                key={item.id}
                id={item.id}
                navigation={navigation}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={{marginLeft: 16}}
          onPress={() => navigation.navigate('Profile')}>
          <BackButton />
        </TouchableOpacity>
        {!isWatchLater && (
          <TouchableOpacity onPress={onPressHandler} style={styles.button}>
            <Text style={styles.buttonText}>Clear history</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{paddingBottom: '5%'}}>
        {movies.length !== 0 || watchLater.length !== 0 ? (
          !isWatchLater ? (
            getList(movies)
          ) : (
            getList(watchLater)
          )
        ) : (
          <Text style={styles.text}>No watched movies</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
