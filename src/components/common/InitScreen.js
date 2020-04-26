import React, {useEffect, useCallback, useState} from 'react';
import {View, Image, ActivityIndicator, Text, Share} from 'react-native';
import Orientation from 'react-native-orientation';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';

import {VERSION, BUILD} from '../../const';
import codes from '../../const/errorCodes';
import {
  loadAllMovies,
  initStorage,
  getPermissionToPlay,
  loadHomeScreen,
} from '../../ducks/movies';
import {initAds, checkRatingStatus} from '../../ducks/ads';
import logo from '../../assets/image1.png';
import styles from '../../styles/initScreenStyles';
import theme from '../../styles/theme';
import {startAds} from '../../ducks/ads';

import {loadGenres} from '../../ducks/genres';

const InitScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isWarnBlockVisible, setIsWarnBlockVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Check Internet connection');
  const [loading, setLoading] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi, I would like to share Application which is used to watch live movie free please download it from Google Play Store Free Here https://play.google.com/store/apps/details?id=mobi.devsteam.movies1',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  function handleError(code) {
    const message = codes.get(code);
    setIsWarnBlockVisible(true);
    setErrorMessage(message);
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getPermissionToPlay());
    dispatch(checkRatingStatus());
    dispatch(initAds());
    Orientation.lockToPortrait();
  }, [dispatch]);

  const initialLoad = useCallback(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsWarnBlockVisible(false);
        dispatch(startAds());
        dispatch(loadGenres());
        dispatch(loadHomeScreen(navigation, handleError));
        dispatch(loadAllMovies());
        dispatch(initStorage());
        setLoading(true);
      } else {
        handleError(0);
      }
      setIsWarnBlockVisible(true);
    });
  }, [dispatch, navigation]);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setIsWarnBlockVisible(true);
      }
    });
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="contain" source={logo} />
      <Text style={styles.text}>{`v.${VERSION} build ${BUILD}`}</Text>
      {loading ? (
        <ActivityIndicator color={theme.colors.sky.color} size="large" />
      ) : (
        <View style={styles.warningBlock}>
          {!isWarnBlockVisible ? (
            <>
              <Button title="PLAY NOW" iconRight onPress={initialLoad} />
              <View style={styles.gapBetweenButtons} />
              <Button title="SHARE" onPress={onShare} />
            </>
          ) : (
            <>
              <Text style={styles.warningText}>{errorMessage}</Text>
              <Button
                title="RETRY"
                iconRight
                icon={<Ionicons style={styles.buttonIcon} name="md-refresh" />}
                onPress={initialLoad}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default InitScreen;
