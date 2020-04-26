import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import Orientation from 'react-native-orientation';
import VideoRN from 'react-native-video';
import axios from 'axios';
import {TOKEN_URL, tokenRefreshParams, apiKey} from '../../const/';
import {saveTimestampToLocalStorage} from '../../utils/';
import {Button} from 'react-native';
import {HideNavigationBar} from 'react-native-navigation-bar-color';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import ReloadButton from '../common/ReloadButton';
import BackButton from '../common/BackButton';

const VideoPlayer = ({navigation}) => {
  const movieRef = useRef(null);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);
  const movie_urls = navigation.getParam('movie_url');
  const movie_id = navigation.getParam('movie_id');
  const movie_timeStamp = navigation.getParam('movie_timeStamp');
  const [currentVideo, setCurrentVideo] = useState(0);
  const [uri, setUri] = useState(
    // `https://www.googleapis.com/drive/v3/files/${movie_urls[0]}?key=${apiKey}`,
    'https://cloud.hotlan.by/movies/4fe964268d214dfc8d35c70e155dc0ee74b1b15c/131689892fa954599e2ffc0c2a518018:2020011806/360.mp4',
  );

  useEffect(() => {
    Orientation.lockToLandscape();
    getUserData();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  console.log(HideNavigationBar);

  async function getUserData() {
    try {
      const {data} = await axios.post(TOKEN_URL, tokenRefreshParams);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const toPosition = async () => {
    try {
      const timeStamp = await movie_timeStamp;
      movieRef.current.seek(Number(timeStamp[0].timeStamp));
    } catch (err) {
      movieRef.current.seek(0);
    }
  };

  const memoPlayer = useMemo(() => {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <VideoRN
          ref={movieRef}
          key={currentVideo}
          source={{
            // uri: uri + '&alt=media',
            uri: uri,
            headers: {
              Authorization: userData ? `Bearer ${userData.access_token}` : '',
            },
          }}
          resizeMode="cover"
          onReadyForDisplay={toPosition}
          fullscreenAutorotate={false}
          onError={e => console.log(e)}
          onProgress={({currentTime}) => {
            saveTimestampToLocalStorage(movie_id, currentTime.toFixed());
          }}
          style={{flex: 1}}
          controls
        />
      </View>
    );
  }, [uri, userData]);

  //not work properly
  const switchSource = () => {
    setError(false);
    setCurrentVideo(
      currentVideo < movie_urls.length - 1 ? currentVideo + 1 : 0,
    );
    setUri(
      `https://www.googleapis.com/drive/v3/files/${movie_urls[currentVideo]}?key=AIzaSyCU5i4PwYzy9p85VWy50xTW0LRbVfpNXCQ&alt=media`,
    );
  };

  console.log('current uri', uri);
  const fullscreenHandler = () => {
    console.log(movieRef.current.presentFullscreenPlayer());
  };
  return (
    <>
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <View style={styles.backNav}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                Orientation.lockToPortrait();
              }}>
              <BackButton />
            </TouchableOpacity>
          </View>
        ) : null}
        {movieRef !== null && (
          <Button title="hide panel" onPress={fullscreenHandler} />
        )}
        {error && (
          <ReloadButton
            title={`Unexpected error! Switch Source(${currentVideo})`}
            callback={switchSource}
          />
        )}
        {userData !== null && memoPlayer}
      </View>
    </>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backNav: {
    position: 'absolute',
    left: '4.76%',
    top: '10%',
    zIndex: 100,
  },
});

export default VideoPlayer;
