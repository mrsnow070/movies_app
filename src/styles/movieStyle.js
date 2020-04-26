import {StyleSheet} from 'react-native';
import {screenWidth} from '../const';

import theme from './theme';

export default StyleSheet.create({
  container: {
    width: 120,
    marginRight: 16,
    paddingVertical: 10,
    height: 192,
    flexShrink: 1,
  },
  image: {
    height: 144,
    // width: 120,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: 'gray',
  },
  title: {
    ...theme.colors.white,
    ...theme.sizes.small,
    textAlign: 'center',
  },
  verticalContainer: {
    paddingVertical: 10,
    width: screenWidth - 10,
    flexDirection: 'row',
  },
  verticalImageWrapper: {
    width: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  verticalImage: {
    height: 96,
  },
  verticalTitle: {
    ...theme.colors.whiteGray,
    ...theme.sizes.big,
  },
  detail: {
    marginLeft: 16,
    flexShrink: 1,
  },
  detailText: {
    ...theme.colors.gray,
    ...theme.sizes.small,
    marginBottom: 9,
  },
});
