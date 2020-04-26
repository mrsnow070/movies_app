import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, StatusBar} from 'react-native';
import ReloadButton from '../common/ReloadButton';
import {apiKey} from '../../const/';
import NetInfo from '@react-native-community/netinfo';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import {startAds, stopAds} from '../../ducks/ads';

const dummy =
  'https://cloud.hotlan.by/movies/4fe964268d214dfc8d35c70e155dc0ee74b1b15c/4e2a73ec6e7f927f74fcfec51914e849:2020012413/360.mp4';

const MoviePlayer = ({navigation}) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const movie_url = navigation.getParam('movie_url');
  const [url] = useState(
    `https://www.googleapis.com/drive/v3/files/${movie_url}?key=${apiKey}`,
    // dummy,
  );

  useEffect(() => {
    dispatch(stopAds());

    return () => {
      dispatch(startAds());
    };
  }, [dispatch]);

  const movie_id = navigation.getParam('movie_id');
  const movie_timeStamp = navigation.getParam('movie_timeStamp');

  useEffect(() => {
    NetInfo.addEventListener(state => {
      state.isConnected && state.isInternetReachable
        ? setError(false)
        : setError(true);
    });
  }, []);

  const {memoPlayer} = useVideoPlayer(
    url + '&alt=media',
    // dummy,
    navigation,
    movie_id,
    movie_timeStamp,
    setError,
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden />
      {error ? (
        <ReloadButton
          title="Check internet connection or select another drive"
          callback={() => setError(false)}
        />
      ) : null}
      {memoPlayer}
    </View>
  );
};

export default MoviePlayer;
