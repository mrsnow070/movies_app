import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomePage/Screens/HomeScreen';
import MoviesScreen from './HomePage/Screens/MoviesScreen';
import MovieScreen from './HomePage/Screens/MovieScreen';
import SearchScreen from './SearchPage/SearchScreen';
import HistoryScreen from './HistoryPage/HistoryScreen';
import FavouriteScreen from './FavouritePage/FavouriteScreen';
import ProfileScreen from './ProfilePage/ProfileScreen';
import AuthenticationScreen from './AuthenticationPage/AuthenticationScreen';
import VideoPlayer from '../components/HomePage/MoviePlayer';
import InitScreen from './common/InitScreen';
import Blur from './common/Blur';
import {createSwitchNavigator} from 'react-navigation';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Movie: MovieScreen,
    Watch: {
      screen: VideoPlayer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    Movies: MoviesScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {backgroundColor: '#030818'},
    initialRouteName: 'Home',
  },
);

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === 'Auth' || routeName === 'Watch') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    Favourite: FavouriteScreen,
    History: HistoryScreen,
    Auth: AuthenticationScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {backgroundColor: '#030818'},
    initialRouteName: 'Profile',
  },
);

const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Blur>
            <IconFeather name="home" size={30} color={tintColor} />
          </Blur>
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Blur>
            <IconFontAwesome name="search" size={30} color={tintColor} />
          </Blur>
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Blur>
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={tintColor}
            />
          </Blur>
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
    tabBarOptions: {
      showLabel: false,
      lazyLoad: true,
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      style: {
        height: 60,
        borderTopColor: 'transparent',
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
      },
    },
  },
);

const StackNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: InitScreen,
    },
    Main: Navigator,
  },
  {
    defaultNavigationOptions: {
      header: null,
      cardStyle: {backgroundColor: '#030818'},
    },
  },
);

export default createAppContainer(StackNavigator);
