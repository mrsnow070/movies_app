import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryDark.color,
    paddingHorizontal: 16,
  },
  headerText: {
    textAlignVertical: 'center',
    letterSpacing: 1,
    paddingBottom: 7,
    fontWeight: '700',
    color: 'white',
    fontSize: 35,
    width: 80,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 6,
  },
  date: {
    color: 'white',
    fontSize: 16,
    opacity: 0.6,
  },
  text: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
