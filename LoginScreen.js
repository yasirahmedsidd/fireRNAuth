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
const LoginScreen = () => {
  const Navigation = useNavigation();

  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('12345678');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => setErrorMsg(e.message));
  };
  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Image
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
      />
      <Text style={styles.greeting}>{`Hello Again.\nWelcome Back`}</Text>
      <View style={styles.errMessage}>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      </View>
      <View style={styles.form}>
        <View>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{color: '#FFF', fontWeight: '400'}}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 32}}
        onPress={() => Navigation.navigate('Signup')}>
        <Text style={{color: '#414959', fontSize: 13}}>
          New to my App?{' '}
          <Text style={{fontWeight: '500', color: '#e9446a'}}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errMessage: {
    height: 72,
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
