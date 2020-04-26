import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  row: {
    marginVertical: 8,
  },
  touchable: {...StyleSheet.absoluteFill, zIndex: 1},
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingRight: 8,
  },
  lastRow: {paddingBottom: 60},
  rowTitle: {
    ...theme.colors.whiteGray,
    ...theme.sizes.medium,
  },
});
