import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from 'react-native-rate';
import {ratingOptions} from '../../const/';
import styles from '../../styles/navListStyles';
import theme from '../../styles/theme';

// import AntDesign from 'react-native-vector-icons/AntDesign';

const NavList = ({navigation}) => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Favourite')}
        style={styles.navRow}>
        <IconAntDesign name="hearto" style={styles.icon} />
        <View style={styles.navTextContainer}>
          <Text style={styles.navLinks}>Favorite</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navRow}
        onPress={() => navigation.navigate('History', {watchLater: true})}>
        <SimpleLineIcons name="clock" style={styles.icon} />
        <View style={styles.navTextContainer}>
          <Text style={styles.navLinks}>Watch later</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navRow}
        onPress={() => navigation.navigate('History')}>
        <MaterialCommunityIcons name="history" style={[styles.icon]} />

        <View style={styles.navTextContainer}>
          <Text style={styles.navLinks}>History</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navRow}
        onPress={() => {
          Rate.rate(ratingOptions, success => {
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              console.log(success);
            }
          });
        }}>
        <IconAntDesign name="staro" style={[styles.icon, theme.colors.sky]} />
        <View style={styles.navTextContainer}>
          <Text style={styles.navLinks}>Rate App</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity style={[styles.navRow, {marginTop: 69}]}>
        <SimpleLineIcons name="lock" style={styles.icon} />
        <View style={styles.navTextContainer}>
          <Text style={styles.navLinks}>Change password</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navRow}>
        <AntDesign name="logout" style={styles.icon} />
        <View style={styles.navTextContainer}>
          <Text style={styles.navLinks}>Sign out</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default NavList;
