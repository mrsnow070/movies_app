import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black.color,
  },
  image: {width: '50%', height: '30%'},
  warningBlock: {
    marginTop: 10,
  },
  warningText: {
    color: '#fff',
    paddingVertical: 20,
    textTransform: 'uppercase',
  },
  text: {
    ...theme.colors.white,
    marginBottom: 16,
  },
  buttonIcon: {
    fontSize: 18,
    ...theme.colors.white,
    marginLeft: 10,
  },
  gapBetweenButtons: {
    marginTop: 10,
  },
});
