import {Record, OrderedSet} from 'immutable';
import axios from 'axios';
import {getActiveSource} from '../utils/';
import {
  LATEST_MOVIES,
  POPULAR_MOVIES,
  ALL_MOVIES,
  WATCH_LATER,
  FAVOURITE,
  HISTORY,
  DESTROY_SESSION,
  permissionToPlayMoviesUrl,
  homePageGenres,
} from '../const';
import AsyncStorage from '@react-native-community/async-storage';
import {initSourcesList} from './sources';

export const moduleName = 'movies';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';
export const REFRESH_WATCH_LATER = `${moduleName}/REFRESH_WATCH_LATER`;
export const REFRESH_FAVOURITES = `${moduleName}/REFRESH_FAVOURITES`;
export const REFRESH_HISTORY = `${moduleName}/REFRESH_HISTORY`;
export const FETCH_GENRES = `${moduleName}/FETCH_GENRES`;
export const FETCH_HOME_SCREEN = `${moduleName}/FETCH_HOME_SCREEN`;
export const SHOW_HOME_SCREEN = `${moduleName}/SHOW_HOME_SCREEN`;
export const FETCH_MOVIES = `${moduleName}/FETCH_MOVIES`;
export const FETCH_ALL_CID = `${moduleName}/FETCH_ALL_CID`;
export const ADD_FAVOURITE_MOVIE = `${moduleName}/ADD_FAVOURITE_MOVIE`;
export const DELETE_FAVOURITE_MOVIE = `${moduleName}/DELETE_FAVOURITE_MOVIE`;
export const ADD_WATCH_LATER = `${moduleName}/ADD_WATCH_LATER`;
export const DELETE_WATCH_LATER = `${moduleName}/DELETE_WATCH_LATER`;
export const ADD_WATCHED_MOVIE = `${moduleName}/ADD_WATCHED_MOVIE`;
export const CLEAR_HISTORY = `${moduleName}/CLEAR_HISTORY`;
export const GET_PERMISSION_FROM_SERVER_TO_SHOW_MOVIES = `${moduleName}/GET_PERMISSION_FROM_SERVER_TO_SHOW_MOVIES`;

// Reducer
const ReducerRecord = Record({
  movies: new OrderedSet([]),
  allMovies: new OrderedSet([]),
  lastesMovies: null,
  sliderMovies: null,
  favouriteMovies: new OrderedSet([]),
  watchedMovies: new OrderedSet([]),
  watchLater: new OrderedSet([]),
  loading: true,
  isPlayPermitted: false,
  homeScreen: [],
});

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_MOVIES + SUCCESS:
      if (payload.cid === LATEST_MOVIES)
        return state.set('lastesMovies', payload.data);
      if (payload.cid === POPULAR_MOVIES)
        return state.set('sliderMovies', payload.data);
      return state.update('movies', movies => movies.add(payload.data));

    case FETCH_ALL_CID:
      return state
        .update('allMovies', allMovies =>
          allMovies
            .concat([...payload])
            .toSet()
            .toOrderedSet(),
        )
        .set('loading', false);

    case FETCH_HOME_SCREEN:
      return state.set('homeScreen', payload);

    case DELETE_FAVOURITE_MOVIE:
      return state.update('favouriteMovies', favouriteMovies =>
        favouriteMovies.delete(
          favouriteMovies.find(movie => movie.id === payload.movie.id),
        ),
      );
    case REFRESH_FAVOURITES:
      return state.set('favouriteMovies', new OrderedSet([...payload]));

    case REFRESH_WATCH_LATER:
      return state.set('watchLater', new OrderedSet([...payload]));

    case DELETE_WATCH_LATER:
      return state.update('watchLater', watchLater =>
        watchLater.delete(
          watchLater.find(movie => movie.id === payload.movie.id),
        ),
      );

    case REFRESH_HISTORY:
      return state.set('watchedMovies', new OrderedSet([...payload]));

    case CLEAR_HISTORY:
      return state.set('watchedMovies', new OrderedSet([]));

    case GET_PERMISSION_FROM_SERVER_TO_SHOW_MOVIES:
      return state.set('isPlayPermitted', payload);

    default:
      return state;
  }
}

// Action creators

export function refreshWatchLater(movies) {
  return {
    type: REFRESH_WATCH_LATER,
    payload: movies,
  };
}

export function refreshFavourites(movies) {
  return {
    type: REFRESH_FAVOURITES,
    payload: movies,
  };
}

export function refreshHistory(movies) {
  return {
    type: REFRESH_HISTORY,
    payload: movies,
  };
}

export const initStorage = () => {
  return async dispatch => {
    const storedToWatchLater = await AsyncStorage.getItem(WATCH_LATER);
    const storedFavourites = await AsyncStorage.getItem(FAVOURITE);
    const storedHistory = await AsyncStorage.getItem(HISTORY);

    dispatch(
      refreshWatchLater(
        storedToWatchLater === null ? [] : JSON.parse(storedToWatchLater),
      ),
    );
    dispatch(
      refreshFavourites(
        storedFavourites === null ? [] : JSON.parse(storedFavourites),
      ),
    );
    dispatch(
      refreshHistory(storedHistory === null ? [] : JSON.parse(storedHistory)),
    );
  };
};

export function removeMovieFromStorage(movie, key) {
  return async dispatch => {
    let storedMovies = JSON.parse(await AsyncStorage.getItem(key));
    storedMovies = storedMovies.filter(m => m.id !== movie.id);
    await AsyncStorage.setItem(key, JSON.stringify(storedMovies));
    const updatedArray = await AsyncStorage.getItem(key);
    if (key === WATCH_LATER) {
      dispatch(refreshWatchLater(JSON.parse(updatedArray)));
    }
    if (key === FAVOURITE) {
      dispatch(refreshFavourites(JSON.parse(updatedArray)));
    }
  };
}

export function addToStorage(movie, key) {
  return async dispatch => {
    const storedMovies = JSON.parse(await AsyncStorage.getItem(key));
    if (storedMovies !== null) {
      let newArray = storedMovies.filter(m => m.id !== movie.id);
      newArray = newArray.concat(movie);
      await AsyncStorage.setItem(key, JSON.stringify(newArray));
      const updatedArray = await AsyncStorage.getItem(key);
      if (key === WATCH_LATER) {
        dispatch(refreshWatchLater(JSON.parse(updatedArray)));
      }
      if (key === FAVOURITE) {
        dispatch(refreshFavourites(JSON.parse(updatedArray)));
      }
      if (key === HISTORY) {
        dispatch(refreshHistory(JSON.parse(updatedArray)));
      }
    }
    if (storedMovies === null) {
      await AsyncStorage.setItem(key, JSON.stringify([movie]));
      const newArray = await AsyncStorage.getItem(key);
      if (key === WATCH_LATER) {
        dispatch(refreshWatchLater(JSON.parse(newArray)));
      }
      if (key === FAVOURITE) {
        dispatch(refreshFavourites(JSON.parse(newArray)));
      }
      if (key === HISTORY) {
        dispatch(refreshHistory(JSON.parse(newArray)));
      }
    }
  };
}

export function showHomeScreen({navigation}) {
  navigation.navigate('Home');

  return {
    type: SHOW_HOME_SCREEN,
  };
}

export function clearWatchingHistory() {
  return async dispatch => {
    await AsyncStorage.removeItem(HISTORY);

    dispatch(refreshHistory([]));
  };
}

export function loadAllMovies(navigation) {
  return async (dispatch, getState) => {
    const genres = getState().genres.get('requiredGenres');
    const {baseUrl, apiCode, folder} = getActiveSource(getState);

    const promiceArray = genres.map(g =>
      axios.get(baseUrl, {
        params: {
          keydata: apiCode,
          cat_id: g,
        },
      }),
    );

    try {
      let data = await Promise.all(promiceArray);
      data = data.reduce((t, c) => {
        return t.concat(c.data[folder]);
      }, []);

      dispatch({
        type: FETCH_ALL_CID,
        payload: data,
      });
    } catch (err) {
      dispatch({type: DESTROY_SESSION});
    }
  };
}

export function getPermissionToPlay() {
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.get(permissionToPlayMoviesUrl);

      dispatch(initSourcesList(data.sources));

      const activeSource = await getState().source.get('activeSource');
      if (await getState().source.valid.includes(activeSource)) {
        data.Style === '1'
          ? dispatch({
              type: GET_PERMISSION_FROM_SERVER_TO_SHOW_MOVIES,
              payload: true,
            })
          : null;
      } else {
        dispatch({type: 'INVALID_SOURCE_DATA'});
      }
    } catch (err) {
      console.log('error', err);
    }
  };
}

export function loadHomeScreen(navigation, handleError) {
  return async (dispatch, getState) => {
    const isNavDisabled = getState().source.get('disableNavigation');

    const {baseUrl, apiCode, folder} = getActiveSource(getState);
    try {
      const {data} = await axios.get(baseUrl, {
        params: {
          keydata: apiCode,
          ['home']: '',
        },
      });

      const homePageData = homePageGenres.map(el => {
        return {list: data[folder][el.section], title: el.title, cid: el.cid};
      });

      if (!isNavDisabled) {
        navigation.navigate('Home');
      } else {
        handleError(1);
      }
      !isNavDisabled &&
        dispatch({type: FETCH_HOME_SCREEN, payload: homePageData});
    } catch (error) {
      console.log(error);
    }
  };
}

// Selectors
export const getState = state => state[moduleName];
export const getGenresMovies = state => getState(state).movies;
export const getLastesMovies = state => getState(state).lastesMovies;
export const getSliderMovies = state => getState(state).sliderMovies;
export const getHomeScreenMovies = state => getState(state).homeScreen;
export const getAllMovies = state => getState(state).allMovies;
export const getWatchLater = state => getState(state).watchLater;
export const getIsAllMoviesLoading = state => getState(state).loading;
export const getIsPlayPermitted = state => getState(state).isPlayPermitted;
export const getMovie = (state, id, cid) =>
  getMovies(state, cid).find(movie => movie.id === id);

export const getMovies = (state, cid) => {
  const movies = getGenresMovies(state);
  const lastesMovies = getLastesMovies(state);
  const sliderMovies = getSliderMovies(state);
  const allMovies = getAllMovies(state);

  const isFilled = movies || !allMovies || !lastesMovies || !sliderMovies;

  if (isFilled) {
    if (cid === LATEST_MOVIES) return lastesMovies;
    if (cid === POPULAR_MOVIES) return sliderMovies;
    if (cid === ALL_MOVIES) return allMovies;
    return movies.find(selectedMovies => selectedMovies[0].cid === cid);
  }
};

export const getWatchedMovies = state => {
  const watchedMovies = getState(state).watchedMovies.toArray();
  return watchedMovies.map(movie => ({
    ...getMovie(state, movie.id, movie.cid),
    cid: movie.cid,
    date: movie.date,
  }));
};

export const getWatchLaterMovies = state => {
  const watchLater = getState(state).watchLater.toArray();
  return watchLater.map(movie => ({
    ...getMovie(state, movie.id, movie.cid),
    cid: movie.cid,
    date: movie.date,
  }));
};

export const getFavouriteMovies = state => {
  const favouriteMovies = getState(state).favouriteMovies.toArray();
  return favouriteMovies.map(movie => ({
    ...getMovie(state, movie.id, movie.cid),
    cid: movie.cid,
  }));
};

export const getSearchedMovies = (state, str, filter) => {
  const movies = getMovies(state, 'allMovies');
  const regexp = new RegExp(str, 'igm');
  let filtered = movies.filter(movie => {
    return regexp.test(movie.channel_title);
  });

  if (filter.length > 0) {
    filtered = filtered.filter(el => filter.includes(el.cat_id));
  }
  const reduced = filtered.reduce((total, current) => {
    return total.concat(current);
  }, []);
  const SetList = new Set([...reduced]);
  return Array.from(SetList);
};
