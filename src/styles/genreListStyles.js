import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  genreCheckbox: {
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genre: {
    ...theme.colors.gray,
    ...theme.sizes.big,
  },
  selectedGenre: {
    ...theme.colors.white,
    ...theme.sizes.big,
  },
});
