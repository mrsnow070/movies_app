import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addFilter, resetFilter} from '../../../ducks/search';
import HardPressBack from '../../common/HardPressBack';
import Movie from '../../Movie';
import {getHomeScreenMovies} from '../../../ducks/movies';
import {getRandomID} from '../../../utils/';
import Feather from 'react-native-vector-icons/Feather';

import GenreRow from './components/GenreRow';
import styles from '../../../styles/homeScreenStyles';
import theme from '../../../styles/theme';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const homePageMovies = useSelector(state => getHomeScreenMovies(state));

  const _onSelectGenre = cid => {
    dispatch(resetFilter());
    dispatch(addFilter(cid));
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {Platform.OS === 'android' && <HardPressBack />}
      <FlatList
        style={styles.container}
        data={homePageMovies}
        keyExtractor={({_, index}) => getRandomID()}
        renderItem={({item, index}) => {
          return (
            <>
              {index === 1 && <GenreRow />}
              <View style={styles.rowHeader}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                {typeof item.cid !== 'undefined' && (
                  <>
                    <TouchableOpacity
                      onPress={() => _onSelectGenre(item.cid)}
                      style={styles.touchable}
                    />
                    <Feather
                      name="more-vertical"
                      size={20}
                      color={theme.colors.whiteGray.color}
                    />
                  </>
                )}
              </View>
              <FlatList
                horizontal={index !== homePageMovies.length - 1}
                data={item.list}
                style={[
                  styles.row,
                  index === homePageMovies.length - 1 && styles.lastRow,
                ]}
                keyExtractor={() => getRandomID()}
                renderItem={render => {
                  return (
                    <>
                      <Movie
                        detail={render.item}
                        cid={'allMovies'}
                        // key={item.id}
                        id={render.item.id}
                        vertical={index !== homePageMovies.length - 1}
                        navigation={navigation}
                      />
                    </>
                  );
                }}
              />
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
