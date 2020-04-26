import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    height: 50,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.sky.color,
    marginRight: 9,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.sky.color,
    // marginHorizontal: 14,
    marginVertical: 5,
  },
  firstContainer: {marginLeft: 14},
  touchable: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  text: {
    ...theme.colors.whiteGray,
    ...theme.sizes.big,
  },
});
