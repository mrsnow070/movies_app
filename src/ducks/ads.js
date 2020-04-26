import {AdMobInterstitial} from 'react-native-admob';
import {AdMobCredentials} from '../const/';
import AsyncStorage from '@react-native-community/async-storage';

export const moduleName = 'ads';
export const ADS_START = `${moduleName}/START`;
export const ADS_STOP = `${moduleName}/STOP`;
export const ADS_INIT = `${moduleName}/INIT`;
export const CHECK_RATING_STATUS = `${moduleName}/CHECK_RATING_STATUS`;
export const SET_RATING_STATUS = `${moduleName}/SET_RATING_STATUS`;
import {Record} from 'immutable';

const ReducerRecord = Record({
  ads: false,
  interval: null,
  isRated: false,
});

const resetInterval = (state, action) => {
  clearInterval(state.get('interval'));
  return state.set('interval', null);
};

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action;

  switch (type) {
    case ADS_START:
      return state.set('interval', payload);

    case ADS_STOP:
      return resetInterval(state, action);

    case ADS_INIT:
      return state.set('ads', true);

    case CHECK_RATING_STATUS:
      return state.set('isRated', payload);

    default:
      return state;
  }
}

//action creators

export const initAds = () => {
  AdMobInterstitial.setAdUnitID(AdMobCredentials.interstitial);
  AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  return {
    type: 'ADS_INIT',
  };
};

const showAd = () => {
  AdMobInterstitial.requestAd()
    .then(() => AdMobInterstitial.showAd())
    .catch(err => console.log(err));
};

export const startAds = () => {
  showAd();
  return {
    type: ADS_START,
    payload: setInterval(showAd, AdMobCredentials.interval),
  };
};

export const stopAds = () => {
  return {
    type: ADS_STOP,
  };
};

export const checkRatingStatus = () => {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('isRated');

      if (value !== null) {
        dispatch({
          type: CHECK_RATING_STATUS,
          payload: Boolean(value),
        });
      } else {
        AsyncStorage.setItem('isRated', 'false');
        dispatch({
          type: CHECK_RATING_STATUS,
          payload: false,
        });
      }
    } catch (e) {
      // error reading value
    }
  };
};

export const setRatingStatus = () => {
  AsyncStorage.setItem('isRated', 'true');

  return {
    type: SET_RATING_STATUS,
    payload: Boolean('true'),
  };
};

//selectors
export const getState = state => state[moduleName];
export const getAdsState = state => getState(state).ads;
export const getRatingStatus = state => getState(state).isRated;
