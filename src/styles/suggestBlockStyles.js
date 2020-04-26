import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {flex: 2, paddingBottom: 100, marginLeft: 16},
  textHeader: {
    ...theme.colors.whiteGray,
    ...theme.sizes.h1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
