import {StyleSheet} from 'react-native';
import {screenWidth} from '../const';

import theme from './theme';

export default StyleSheet.create({
  screnContainer: {paddingBottom: '5%'},
  backNav: {
    position: 'absolute',
    left: 16,
    top: 60,
    zIndex: 100,
  },
  headerImageContainer: {
    width: screenWidth,
    height: 210,
    ...theme.colors.primaryDark,
    position: 'relative',
  },
  headerImageBlur: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  posterImage: {flex: 1, top: '-40%', borderRadius: 10},
  moviePosterContainer: {
    width: 120,
    height: 198,
    position: 'relative',
    marginLeft: 16,
    zIndex: 5,
  },
  movieTitle: {
    ...theme.colors.whiteGray,
    ...theme.sizes.big,
    top: '-25%',
    marginLeft: 10,
    overflow: 'scroll',
  },
  movieDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 21,
  },
  movieInfoText: {
    ...theme.colors.gray,
    ...theme.sizes.small,
  },
  ratingText: {
    ...theme.colors.pink,
    ...theme.sizes.big,
  },
  iconStyle: {
    ...theme.colors.white,
    fontSize: 20,
  },
  iconActive: {
    ...theme.colors.sky,
  },
  videoButtonContainer: {
    top: -48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {width: 100, borderRadius: 22, marginLeft: 16, zIndex: 10},
  trailerButton: {marginRight: 22, backgroundColor: 'transparent', zIndex: 10},
  trailerButtonTitle: {
    ...theme.colors.sky,
    textDecorationLine: 'underline',
  },
  videoContainer: {
    height: 205,
    marginBottom: 20,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  menuItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.sky.color,
  },
  menuItemText: {
    ...theme.colors.gray,
    ...theme.sizes.big,
    textTransform: 'capitalize',
    opacity: 0.8,
  },
  infoContainer: {
    minHeight: 145,
    paddingHorizontal: 16,
  },
  description: {
    ...theme.colors.gray,
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.7,
  },
});
