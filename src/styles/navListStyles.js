import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  navContainer: {
    flex: 1,
    paddingTop: 112,
    paddingLeft: 16,
    paddingBottom: '15%',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  icon: {
    ...theme.colors.whiteGray,
    fontSize: 16,
  },
  navTextContainer: {
    flex: 1,
    marginLeft: 32,
  },
  navLinks: {
    ...theme.colors.whiteGray,
    ...theme.sizes.big,
  },
});
