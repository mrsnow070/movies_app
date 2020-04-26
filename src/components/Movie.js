import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {getDate, parse} from '../utils';
import {addToStorage} from '../ducks/movies';
import {getSource} from '../ducks/sources';
import styles from '../styles/movieStyle';
import {screenWidth, HISTORY} from '../const';

const dummyImageLink = 'https://i.imgur.com/WXJ5Ldm.png';

const Movie = ({navigation, cid, detail, vertical, id}) => {
  const dispatch = useDispatch();
  const date = getDate();
  const movie = parse(detail);
  const {baseUrl} = useSelector(state => getSource(state));

  const imgUrl = baseUrl.replace('/api.php', '');

  const onPressHandler = () => {
    dispatch(addToStorage({id, cid, date}, HISTORY));
    navigation.navigate('Movie', {id, cid});
  };

  return vertical ? (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPressHandler}>
        <Image
          source={{
            uri: `${imgUrl}/images/${movie.channel_thumbnail}`,
            // uri: dummyImageLink,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{movie.title}</Text>
      {/* <Text style={styles.title}>Best Movie</Text> */}
    </View>
  ) : (
    <TouchableOpacity activeOpacity={0.5} onPress={onPressHandler}>
      <View style={styles.verticalContainer}>
        <View style={styles.verticalImageWrapper}>
          <Image
            source={{
              uri: `${imgUrl}/images/${movie.channel_thumbnail}`,
              // uri: dummyImageLink,
            }}
            style={styles.verticalImage}
          />
        </View>
        <View style={styles.detail}>
          <Text style={[styles.verticalTitle, {marginBottom: 9}]}>
            {movie.title}
            {/* Best Movie */}
          </Text>
          <Text style={styles.detailText}>{movie.category_name}</Text>
          <Text style={styles.detailText}>{movie.year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Movie;
