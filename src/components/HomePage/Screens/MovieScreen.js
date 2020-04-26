import React, {useState, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {WebView} from 'react-native-webview';
import {ShowNavigationBar} from 'react-native-navigation-bar-color';

import {getFavouriteMovies, getWatchLater} from '../../../ducks/movies';
import {getSource} from '../../../ducks/sources';
import styles from '../../../styles/movieScreenStyles';
import theme from '../../../styles/theme';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import PlayIcon from './components/PlayIcon';
import {Button} from 'react-native-elements';

import BackButton from '../../common/BackButton';
import {WATCH_LATER, FAVOURITE} from '../../../const';
import SuggestBlock from './components/SuggestBlock';
import DriveSelection from './components/DriveSelection';

// const dummyImageLink = 'https://i.imgur.com/WXJ5Ldm.png';

import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {parse, parse_2} from '../../../utils';
import {
  getMovie,
  removeMovieFromStorage,
  addToStorage,
  getIsPlayPermitted,
} from '../../../ducks/movies';

const MovieScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [driveSelectVisibility, setDriveSelectVisibility] = useState(false);
  const [parsedVar, setParsedVar] = useState(false);
  const {cid, id} = navigation.state.params;
  const initMovie = useSelector(state => getMovie(state, id, cid));
  const movie = parse(initMovie);
  const parsed_2 = parse_2(initMovie);
  const menuItems = ['description', 'director', 'writers', 'stars'];
  const [openedMenuItem, setOpenedMenuItem] = useState(menuItems[0]);
  const [isTrailerOpened, setTrailerOpened] = useState(false);
  const favouriteMovies = useSelector(state => getFavouriteMovies(state));
  const watchLaterMovies = useSelector(state => getWatchLater(state));
  const {baseUrl} = useSelector(state => getSource(state));
  const isPlayPermitted = useSelector(state => getIsPlayPermitted(state));
  const imgUrl = baseUrl.replace('/api.php', '');

  // console.log(parsed_2);
  useEffect(() => {
    if (
      movie.description === '' ||
      movie.director === '' ||
      movie.writers === '' ||
      movie.stars === ''
    ) {
      setParsedVar(true);
      // console.log('empty string');
    }
  }, [movie]);

  useEffect(() => {
    ShowNavigationBar();
  });

  let isFavourite = useMemo(() => favouriteMovies.some(m => m.id === id), [
    favouriteMovies,
    id,
  ]);

  let isInWatchLater = useMemo(
    () => watchLaterMovies.some(movie => movie.id === id),
    [movie],
  );

  const addToFavourite = () => {
    isFavourite
      ? dispatch(removeMovieFromStorage({id, cid: 'allMovies'}, FAVOURITE))
      : dispatch(addToStorage({id, cid: 'allMovies'}, FAVOURITE));
  };

  const addToWatchLater = () => {
    isInWatchLater
      ? dispatch(removeMovieFromStorage({id, cid: 'allMovies'}, WATCH_LATER))
      : dispatch(addToStorage({id, cid: 'allMovies'}, WATCH_LATER));
  };

  return (
    <ScrollView style={styles.screnContainer}>
      <DriveSelection
        isModalVisible={driveSelectVisibility}
        navigation={navigation}
        setDriveSelectVisibility={setDriveSelectVisibility}
        movie={movie}
        urls={movie.urls}
      />
      <View style={styles.backNav}>
        <TouchableOpacity
          style={{width: 50, height: 50}}
          onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={styles.headerImageContainer}>
        <Image
          source={{
            uri: `${imgUrl}/images/${movie.channel_thumbnail}`,
          }}
          blurRadius={1}
          style={{flex: 1}}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.moviePosterContainer}>
          <Image
            style={styles.posterImage}
            source={{
              uri: `${imgUrl}/images/${movie.channel_thumbnail}`,
              // uri: dummyImageLink,
            }}
          />
        </View>

        <View style={{paddingLeft: 10, flexShrink: 1}}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          {/* <Text style={styles.movieTitle}>Best movie</Text> */}
          <Text style={styles.movieInfoText}>{movie.category_name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 9,
            }}>
            <View>
              <Text style={styles.movieInfoText}>{movie.year}</Text>
            </View>
          </View>
          <View style={styles.movieDetailContainer}>
            {initMovie.year.length < 4 && (
              <View>
                <Text style={styles.ratingText}>{initMovie.year} </Text>
              </View>
            )}
            <TouchableOpacity onPress={addToWatchLater}>
              <Feather
                style={[
                  styles.iconStyle,
                  isInWatchLater && styles.iconActive,
                  {marginHorizontal: 41},
                ]}
                name="clock"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={addToFavourite}>
              <FontAwesome
                name="heart"
                style={[styles.iconStyle, isFavourite && styles.iconActive]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.videoButtonContainer}>
        {isPlayPermitted && (
          <Button
            title="Play"
            icon={PlayIcon}
            iconRight
            buttonStyle={styles.playButton}
            onPress={() => setDriveSelectVisibility(true)}
            titleStyle={{marginRight: 7}}
          />
        )}
        {movie.trailer && (
          <Button
            title={isTrailerOpened ? 'Hide trailer' : 'Watch trailer'}
            onPress={() => setTrailerOpened(!isTrailerOpened)}
            buttonStyle={styles.trailerButton}
            titleStyle={styles.trailerButtonTitle}
          />
        )}
      </View>

      {movie.trailer && isTrailerOpened && (
        <WebView
          style={styles.videoContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          source={{uri: movie.trailer}}
        />
      )}
      <View style={styles.menu}>
        {menuItems.map(item => {
          const isOpened = item === openedMenuItem;

          return (
            <View key={item}>
              <TouchableOpacity
                style={isOpened && styles.menuItemActive}
                onPress={() => setOpenedMenuItem(item)}>
                <Text
                  style={[styles.menuItemText, isOpened && theme.colors.sky]}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.description}>
          {parsedVar ? parsed_2[openedMenuItem] : movie[openedMenuItem]}
        </Text>
      </View>
      <SuggestBlock id={movie.id} navigation={navigation} />
    </ScrollView>
  );
};

export default MovieScreen;
