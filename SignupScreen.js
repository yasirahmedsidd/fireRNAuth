import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
const SignupScreen = () => {
  const Navigation = useNavigation();

  const [name, setName] = useState('Yasir Ahmed Siddiqui');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('12345678');
  const [errorMsg, setErrorMsg] = useState(null);
  const [avatar, setAvatar] = useState();
  const currUser = auth().currentUser;
  const handleSignup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        userInfo.user
          .updateProfile({displayName: name})
          .then(() => auth().currentUser.reload());
        // .then((s) => {});
      })
      .catch((error) => setErrorMsg(error.message));

    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((cred) => {
    //     const path = `user/${cred.user.uid}/profile.jpg`;
    //     storage()
    //       .ref(path)
    //       .putFile(avatar.uri)
    //       .then(() => {
    //         auth().currentUser.updateProfile({
    //           displayName: name,
    //           photoURL: 'https://via.placeholder.com/150',
    //         });
    //       })
    //       .then(() => {
    //         auth().currentUser.reload();
    //       })
    //       .catch((e) => console.log(e));
    //   })
    //   .catch((e) => setErrorMsg(e.message));
  };

  const handleImagePick = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setAvatar(res);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      {/* <Image
        source={{uri: 'http://via.placeholder.com/200x200'}}
        style={{height: 200, marginTop: -76, marginLeft: -50}}
      />
      <Image
        source={{uri: 'http://via.placeholder.com/200x200'}}
        style={{height: 200, position: 'absolute', bottom: -325, right: -225}}
      />
      <Image
        source={{uri: 'http://via.placeholder.com/100x100'}}
        style={{height: 100, marginTop: -50}}
      /> */}
      <Text
        style={styles.greeting}>{`Hello Again.\nSign Up to get Started!`}</Text>
      <TouchableOpacity style={styles.avatar} onPress={handleImagePick}>
        {!avatar ? (
          <Ionicons name="ios-add" size={40} color="#FFF" />
        ) : (
          <Image
            source={{uri: avatar.uri}}
            style={{height: 100, width: 100, borderRadius: 50}}
          />
        )}
      </TouchableOpacity>
      <View style={styles.errMessage}>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(e) => setName(e)}
            value={name}
          />
        </View>
        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(e) => setEmail(e)}
            value={email}
          />
        </View>
        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={{color: '#FFF', fontWeight: '400'}}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 32}}
        onPress={() => Navigation.navigate('Login')}>
        <Text style={{color: '#414959', fontSize: 13}}>
          New to my App?{' '}
          <Text style={{fontWeight: '500', color: '#e9446a'}}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E2E6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  errMessage: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#e9946a',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {marginBottom: 48, marginHorizontal: 30},
  inputTitle: {color: '#8a8f9e', fontSize: 10, textTransform: 'uppercase'},
  input: {
    borderBottomColor: '#8a8f9e',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161f3d',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#e9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
