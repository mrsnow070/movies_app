import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.70)',
    zIndex: 1000,
    paddingLeft: 16,
  },
  text: {
    ...theme.colors.white,
    ...theme.sizes.medium,
  },
  backTouchableOpacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1001,
  },
  modalContent: {
    backgroundColor: theme.colors.primaryDark.color,
    top: '25%',
    zIndex: 1002,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  driveRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
