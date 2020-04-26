import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {stopAds} from '../../../../ducks/ads';
import styles from '../../../../styles/driveSelectionStyle';
import theme from '../../../../styles/theme';

const DriveSelection = ({
  isModalVisible,
  urls,
  navigation,
  movie,
  setDriveSelectVisibility,
}) => {
  const dispatch = useDispatch();

  const getMovieTimeStamp = async () => {
    const moviesArray = JSON.parse(
      await AsyncStorage.getItem('watched_movies'),
    );

    return moviesArray.filter(el => el.id === movie.id);
  };
  const onPlayHandler = navParams => {
    navigation.navigate('Watch', navParams);
    dispatch(stopAds());
  };

  const closeModal = () => {
    setDriveSelectVisibility(false);
  };
  return (
    <>
      {isModalVisible && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backTouchableOpacity}
            onPress={closeModal}
          />
          <View style={styles.modalContent}>
            <Text style={[styles.text, {fontSize: 20}]}>Select drive</Text>
            {urls.map((url, index) => (
              <TouchableOpacity
                key={url}
                onPress={() =>
                  onPlayHandler({
                    movie_url: url,
                    movie_id: movie.id,
                    movie_timeStamp: getMovieTimeStamp(),
                  })
                }>
                <View style={styles.driveRow}>
                  <Text style={styles.text}>Server drive {index + 1}</Text>
                  <Entypo
                    name="controller-play"
                    size={16}
                    color={theme.colors.sky.color}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default DriveSelection;
