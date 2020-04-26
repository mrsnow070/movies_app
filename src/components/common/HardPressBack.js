import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, BackHandler} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Rate from 'react-native-rate';
import {getRatingStatus, setRatingStatus} from '../../ducks/ads';
import {ratingOptions} from '../../const';

const HardPressBack = () => {
  const dispatch = useDispatch();
  const [backH, setBackH] = useState(null);
  const isRated = useSelector(state => getRatingStatus(state));

  const _onWillFocus = () => {
    setBackH(BackHandler.addEventListener('hardwareBackPress', handleBack));
  };

  const _onWillBlur = () => {
    backH.remove();
  };

  const handleBack = () => {
    Alert.alert(
      'Do you want to exit?',
      isRated
        ? ''
        : 'Please give your feedback by rating our app on Google play',
      [
        !isRated && {
          text: 'Given',
          onPress: () => dispatch(setRatingStatus()),
        },
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
        !isRated
          ? {
              text: 'Rate now',
              onPress: () => {
                Rate.rate(ratingOptions, success => {
                  if (success) {
                    console.log(success);
                  }
                });
              },
            }
          : {text: 'cancel', onPress: () => console.log('cancel pressed')},
      ],
      {cancelable: true},
    );
    return true;
  };
  return (
    <NavigationEvents onDidFocus={_onWillFocus} onWillBlur={_onWillBlur} />
  );
};

export default HardPressBack;
