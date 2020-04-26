import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

import axios from 'axios';
import Movie from '../../../Movie';
import {getSource} from '../../../../ducks/sources';
import styles from '../../../../styles/suggestBlockStyles';
import theme from '../../../../styles/theme';

const SuggestBlock = ({id, navigation}) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const {baseUrl, apiCode, folder} = useSelector(state => getSource(state));

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  const sendRequest = useCallback(async () => {
    const {data} = await axios.get(baseUrl, {
      params: {
        keydata: apiCode,
        channel_id: id,
      },
    });
    // const parsed = parse(data[folder][0].related);
    // console.log(parsed);
    setRelated(data[folder][0].related);
    setLoading(false);
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Movies may you like</Text>
      {loading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" color={theme.colors.sky.color} />
        </View>
      ) : (
        <FlatList
          data={related}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Movie
                detail={item}
                cid="allMovies"
                key={item.id}
                vertical={true}
                id={item.id}
                navigation={navigation}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default SuggestBlock;
