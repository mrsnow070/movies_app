import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    marginBottom: 0,
    marginLeft: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...theme.colors.whiteGray,
    letterSpacing: 2,
    ...theme.sizes.h1,
  },
  flatListPadding: {
    paddingBottom: 60,
  },
});
