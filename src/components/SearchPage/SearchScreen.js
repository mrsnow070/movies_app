import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GenresList from './GenresList';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {getGenres} from '../../ducks/genres';
import {getSearchedMovies} from '../../ducks/movies';
import {
  getSearchedStr,
  getFilterState,
  getFilter,
  setSearchedStr,
  changeFilterState,
} from '../../ducks/search';
import Movie from '../Movie';
import {ALL_MOVIES} from '../../const';
import styles from '../../styles/searchScreenStyles';
import theme from '../../styles/theme';
// import RangeSelector from './RangeSelector';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const genres = useSelector(state => getGenres(state));
  const search = useSelector(state => getSearchedStr(state));
  const isOpen = useSelector(state => getFilterState(state));
  const filter = useSelector(state => getFilter(state));
  const movies = useSelector(state => getSearchedMovies(state, search, filter));

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{marginBottom: 1}}>
        <View style={styles.searchContainer}>
          <SearchBar
            searchIcon={
              <IconAntDesign
                style={{opacity: 0.6}}
                name="search1"
                size={25}
                color="white"
              />
            }
            containerStyle={[styles.search, {justifyContent: 'center'}]}
            inputContainerStyle={styles.search}
            placeholder="Find movies..."
            placeholderTextColor={theme.colors.gray.color}
            autoCapitalize="none"
            inputStyle={styles.searchInput}
            onChangeText={str => dispatch(setSearchedStr(str))}
            value={search}
          />
        </View>
        <TouchableOpacity onPress={() => dispatch(changeFilterState(!isOpen))}>
          <View style={styles.button}>
            <IconIonicons
              name={isOpen ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
              color="white"
              size={20}
            />
            <Text style={styles.buttonContent}>Filter</Text>
          </View>
        </TouchableOpacity>
      </View>
      {genres && isOpen && (
        <GenresList />
        // <ScrollView style={{marginBottom: '10%'}}>
        //   <RangeSelector />
        // </ScrollView>
      )}
      {movies.length !== 0
        ? !isOpen && (
            <View style={{marginLeft: 16, paddingBottom: 160}}>
              <FlatList
                style={{paddingBottom: 120}}
                data={movies}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Movie
                    detail={item}
                    cid={ALL_MOVIES}
                    key={item.id}
                    id={item.id}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          )
        : !isOpen && <Text style={styles.title}>No found movies</Text>}
    </SafeAreaView>
  );
};

export default SearchScreen;
