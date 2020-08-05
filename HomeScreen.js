import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
const HomeScreen = () => {
  useEffect(() => {
    auth()
      .currentUser.reload()
      .then(() => {
        console.log('User email: ', auth().currentUser.email);
        console.log('User Name: ', auth().currentUser.displayName);
      });
  }, []);

  // auth()
  //   .currentUser.getIdToken(true)
  //   .then(() => {
  //     console.log(auth().currentUser);
  //   });
  // useEffect(() => {
  //   currUser.reload().then(() => {
  //   });
  // }, []);
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDisplayName(auth().currentUser.displayName);
  //     setAvatar(auth().currentUser.photoURL);
  //     console.log(auth().currentUser);
  //     // getProfileAvatar();
  //   }, 3000);
  // }, []);
  const signOutUser = () => {
    auth().signOut();
  };

  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      {/* <Text>Hi, {email}!</Text>
      
    */}
      <Text style={styles.name}>{displayName}!</Text>
      {avatar ? (
        <Image source={{uri: avatar}} style={styles.avatar} />
      ) : (
        <Text>Loading Image</Text>
      )}
      <TouchableOpacity style={styles.btn} onPress={signOutUser}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => alert('Hello World!')}>
        <Text style={styles.btnText}>Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  btn: {
    width: Dimensions.get('window').width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'crimson',
  },
  btnText: {
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'crimson',
  },
  avatar: {
    marginTop: 32,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});
