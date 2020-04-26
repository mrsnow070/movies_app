import React, {useState, useRef, useMemo, useEffect} from 'react';
import axios from 'axios';
import {TOKEN_URL, tokenRefreshParams} from '../const/';
import {saveTimestampToLocalStorage} from '../utils/';
import VideoPlayer from 'react-native-video-controls';
import {
  HideNavigationBar,
  ShowNavigationBar,
} from 'react-native-navigation-bar-color';
import {useDispatch} from 'react-redux';
import Orientation from 'react-native-orientation';

const useVideoPlayer = (
  uri,
  navigation,
  movie_id,
  movie_timeStamp,
  setError,
) => {
  const [userData, setUserData] = useState(null);
  const movieRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    Orientation.lockToLandscape();
    getUserData();
    return () => {
      Orientation.lockToPortrait();
    };
  }, [dispatch]);

  async function getUserData() {
    try {
      const {data} = await axios.post(TOKEN_URL, tokenRefreshParams);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const memoPlayer = useMemo(() => {
    return (
      <VideoPlayer
        ref={movieRef}
        resizeMode="contain"
        onReadyForDisplay={toPosition}
        onEnd={() => navigation.goBack()}
        seekColor="#007AFF"
        fullscreen={false}
        fullscreenAutorotate
        controlTimeout={10000}
        onBack={() => {
          ShowNavigationBar();
          navigation.goBack();
        }}
        onEnterFullscreen={() => HideNavigationBar()}
        onExitFullscreen={() => ShowNavigationBar()}
        minLoadRetryCount={1}
        onError={e => {
          console.log(e);
          if (!e.what === -38) {
            setError(true);
          }
        }}
        onProgress={({currentTime}) =>
          saveTimestampToLocalStorage(movie_id, currentTime.toFixed())
        }
        source={{
          uri: uri,
          headers: {
            Authorization: userData ? `Bearer ${userData.access_token}` : '',
          },
        }}
        navigator={navigation}
        disableVolume
      />
    );
  }, [uri, userData, toPosition, movie_id, userData]);

  async function toPosition() {
    try {
      const timeStamp = await movie_timeStamp;
      movieRef.current.player.ref.seek(Number(timeStamp[0].timeStamp));
    } catch (err) {
      movieRef.current.player.ref.seek(0);
    }
  }

  return {
    memoPlayer,
  };
};

export default useVideoPlayer;
