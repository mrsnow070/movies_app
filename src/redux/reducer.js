import {combineReducers} from 'redux';
import {DESTROY_SESSION} from '../const/';
import genresReducer, {moduleName as genresModule} from '../ducks/genres';
import moviesReducer, {moduleName as moviesModule} from '../ducks/movies';
import searchReducer, {moduleName as searchModule} from '../ducks/search';
import sourcesReducer, {moduleName as sourcesModule} from '../ducks/sources';
import adsReducer, {moduleName as adsModule} from '../ducks/ads';

const AppReducer = combineReducers({
  [moviesModule]: moviesReducer,
  [genresModule]: genresReducer,
  [searchModule]: searchReducer,
  [sourcesModule]: sourcesReducer,
  [adsModule]: adsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    state = undefined;
    const {navigation} = action.payload;
    navigation.navigate('Loading', {
      error: {status: true, message: 'Need to reload'},
    });
  }

  return AppReducer(state, action);
};

export default rootReducer;
