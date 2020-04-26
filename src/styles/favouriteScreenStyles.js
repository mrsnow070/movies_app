import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: theme.colors.primaryDark.color,
  },
  title: {
    ...theme.colors.white,
    ...theme.sizes.h1,
    paddingVertical: 15,
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopColor: theme.colors.white.color,
    borderBottomColor: theme.colors.white.color,
    borderWidth: 1,
    paddingVertical: 5,
  },
  movieDesc: {
    ...theme.colors.white,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  movieText: {
    ...theme.colors.white,
    ...theme.sizes.small,
    opacity: 0.5,
  },
  text: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    ...theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
});
