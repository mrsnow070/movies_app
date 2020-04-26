import {StyleSheet} from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: theme.colors.primaryDark.color},
  searchContainer: {
    borderWidth: 1,
    borderRadius: 22,
    borderColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  search: {
    backgroundColor: theme.colors.primaryDark.color,
    borderRadius: 22,
    maxHeight: 50,
  },
  searchInput: {...theme.colors.whiteGray, marginLeft: 20},
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.sky.color,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 7,
    marginRight: 12,
    width: 100,
  },
  buttonContent: {
    ...theme.sizes.big,
    ...theme.colors.white,
    marginLeft: 3,
  },
});
