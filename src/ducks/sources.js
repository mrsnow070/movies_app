import {Record} from 'immutable';
import {loadAllMovies} from './movies';
import {loadGenres} from './genres';
import axios from 'axios';
import {isString} from '../utils/';

export const moduleName = 'source';
export const SUCCESS = '_SUCCESS';
export const SWITCH_SOURCE = `${moduleName}/SWITCH_SOURCE`;
export const INIT_SOURCE = `${moduleName}/INIT_SOURCE`;
const VALIDATE_SOURCE = `${moduleName}/VALIDATE_SOURCE`;
const ADD_VALID_SOURCES = `${moduleName}/ADD_VALID_SOURCES`;

// Reducer
const ReducerRecord = Record({
  activeSource: 0,
  sourceError: false,
  sources: [],
  valid: [0],
  disableNavigation: false,
});

const nextSource = (state, action) => {
  if (state.activeSource < state.sources.length - 1) {
    return state.set('activeSource', state.activeSource + 1);
  } else {
    return state.set('sourceError', true);
  }
};

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;
  // console.log(action);
  switch (type) {
    case SWITCH_SOURCE:
      return nextSource(state, action);

    case INIT_SOURCE:
      return state.set('sources', payload);

    case ADD_VALID_SOURCES:
      return state.set('valid', payload);

    case 'INVALID_SOURCE_DATA':
      return state.set('disableNavigation', true);

    default:
      return state;
  }
}

// Action creators
export function switchSource() {
  return dispatch => {
    dispatch({
      type: SWITCH_SOURCE,
    });
    // dispatch(loadGenres());
    // dispatch(loadAllMovies());
  };
}

function addValidSources(arr) {
  return {
    type: ADD_VALID_SOURCES,
    payload: arr,
  };
}

const validateSource = () => {
  return async (dispatch, getState) => {
    const sources = await getState()[moduleName].sources;

    const sourcesPromisses = await Promise.all(
      sources.map(s =>
        axios.get(s.baseUrl, {
          params: {
            keydata: s.apiCode,
            ['home']: '',
          },
        }),
      ),
    );

    //find valid/invalid responce from server then split it in 2 arrays
    //after that check Is responced data valid
    let respReduced = sourcesPromisses.reduce(
      (t, c, index) => {
        let total = t;
        if (isString(c.data)) {
          total.invalid = total.invalid.concat(index);
        } else {
          const key = Object.keys(c.data)[0];

          const testChanels =
            typeof c.data[key].latest_channels !== 'undefined'
              ? c.data[key].latest_channels
              : null;

          let titlesArray = testChanels.map(el => el.channel_title);

          titlesArray = titlesArray.map((_, i) =>
            titlesArray[0] === titlesArray[i] ? 1 : 0,
          );

          let sum = titlesArray.reduce((prev, curr) => prev + curr, 0);
          if (sum > 2) {
            total.invalid = total.invalid.concat(index);
          } else {
            total.valid = total.valid.concat(index);
          }
        }
        return total;
      },
      {
        valid: [],
        invalid: [],
      },
    );

    dispatch(addValidSources(respReduced.valid));
  };
};

export function initSourcesList(sources) {
  return async dispatch => {
    dispatch({
      type: INIT_SOURCE,
      payload: sources,
    });

    dispatch(validateSource());
  };
}

// Selectors
export const getState = state => state[moduleName];

export const getSource = state =>
  getState(state).sources[state[moduleName].activeSource];

export const getSourceErrorState = state => getState(state).sourceError;

export const getNavigationPermission = state =>
  getState(state).disableNavigation;

export const isActiveSourceValid = state => {
  const activeSource = getState(state).activeSource;
  return getState(state).valid.includes(activeSource);
};
