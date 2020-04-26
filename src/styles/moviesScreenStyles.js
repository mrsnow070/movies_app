import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  headerText: {
    textAlignVertical: 'center',
    letterSpacing: 1,
    paddingBottom: 7,
    fontSize: 28,
    fontWeight: '700',
    ...theme.colors.white,
  },
});
