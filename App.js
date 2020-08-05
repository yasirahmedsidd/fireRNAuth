import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import HomeScreen from './HomeScreen';
import LoadingScreen from './LoadingScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
const App = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     console.log(user);
  //     setUser(user ? user : false);
  //   });
  // }, []);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user ? user : false);
    });
  }, []);

  const Stack = createStackNavigator();
  const ModalStack = createStackNavigator();

  const BottomTabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{headerShown: false}}>
        {user === null && (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        )}
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// <NavigationContainer>
//   {/* {user === null && (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Loading" component={LoadingScreen} />
//     </Stack.Navigator>
//   )} */}
//   {user ? (
//     <BottomTabs.Navigator
//       tabBarOptions={{
//         activeTintColor: '#161F3D',
//         inactiveTintColor: '#b8b8c4',
//         showLabel: false,
//       }}>
//       <BottomTabs.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Ionicons name="home-outline" size={24} color={color} />
//           ),
//         }}
//       />
//       <BottomTabs.Screen
//         name="Messages"
//         component={Messages}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Ionicons name="chatbubbles-outline" size={24} color={color} />
//           ),
//         }}
//       />
//       <BottomTabs.Screen
//         name="Posts"
//         component={Posts}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Ionicons
//               name="add-circle"
//               size={48}
//               color="#e9446A"
//               style={{
//                 shadowColor: '#E9446A',
//                 shadowOffset: {width: 0, height: 0},
//                 shadowRadius: 10,
//                 shadowOpacity: 0.3,
//               }}
//             />
//           ),
//         }}
//       />
//       <BottomTabs.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Ionicons name="bulb-outline" size={24} color={color} />
//           ),
//         }}
//       />
//       <BottomTabs.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({color}) => (
//             <Ionicons name="person-outline" size={24} color={color} />
//           ),
//         }}
//       />
//     </BottomTabs.Navigator>
//   ) : (
//     <Stack.Navigator
//       initialRouteName="Signup"
//       screenOptions={{headerShown: false}}>
//       {user === null && (
//         <Stack.Screen name="Loading" component={LoadingScreen} />
//       )}
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//     </Stack.Navigator>
//   )}
// </NavigationContainer>

export default App;

const styles = StyleSheet.create({});

const Messages = () => (
  <View>
    <Text>Messages</Text>
  </View>
);
const Posts = () => (
  <View>
    <Text>Posts</Text>
  </View>
);
const Profile = () => (
  <View>
    <Text>Profile</Text>
  </View>
);
const Notifications = () => (
  <View>
    <Text>Notifications</Text>
  </View>
);
const Modal = ({navigation}) => (
  <View>
    <Text>Modal</Text>
  </View>
);
