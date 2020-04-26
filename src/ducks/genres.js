import {Record} from 'immutable';
import axios from 'axios';
import {getActiveSource} from '../utils/';
import {switchSource} from './sources';

export const moduleName = 'genres';
export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';
export const FETCH_GENRES = `${moduleName}/FETCH_GENRES`;

// Reducer
const ReducerRecord = Record({
  requiredGenres: [
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ],
  genres: null,
  loading: false,
  loaded: false,
});

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_GENRES + START:
      return state.set('loading', true);

    case FETCH_GENRES + SUCCESS:
      return state
        .set(
          'genres',
          payload.data.category_list.filter(
            (genre, i) => genre.cid === state.requiredGenres[i],
          ),
        )
        .set('loaded', true)
        .set('loading', false);

    case FETCH_GENRES + FAIL:
      return state.set(ReducerRecord);
    default:
      return state;
  }
}

// Action creators
export function loadGenres() {
  return async (dispatch, getState) => {
    const {baseUrl, apiCode, folder} = getActiveSource(getState);

    dispatch({
      type: FETCH_GENRES + START,
    });

    try {
      const {data} = await axios.get(baseUrl, {
        params: {
          keydata: apiCode,
          ['home']: '',
        },
      });

      dispatch({
        type: FETCH_GENRES + SUCCESS,
        payload: {data: data[folder]},
      });
    } catch (error) {
      // dispatch({
      //   type: FETCH_GENRES + FAIL,
      // });
      console.log(error);
      // dispatch(switchSource());
    }
  };
}

// Selectors
export const getState = state => state[moduleName];
export const getGenres = state => getState(state).genres;
export const getLoading = state => getState(state).loading;
export const getLoaded = state => getState(state).loaded;
export const getAds = state => getState(state).ads;
