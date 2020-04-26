import React from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';

import avatarPlaceholder from './avatar-placeholder.png';
import NavList from './NavList';
import RadialBackGround from './RadialBackground';

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.screnContainer}>
      <RadialBackGround />
      <View style={styles.avatarContainer}>
        <Image style={styles.headerAvatar} source={avatarPlaceholder} />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <NavList navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screnContainer: {
    flex: 1,
    backgroundColor: '#050A17',
  },
  headerAvatar: {
    width: 112,
    height: 112,
    borderRadius: 500,
  },
  avatarContainer: {
    zIndex: 1,
    width: 112,
    height: 112,
    borderRadius: 500,
    position: 'absolute',
    top: 210 - 112 / 2,
    left: 16,
  },
  headerTitle: {
    color: '#fff',
    left: 144,
    top: 20,
    position: 'absolute',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 21,
  },
});

export default ProfileScreen;
