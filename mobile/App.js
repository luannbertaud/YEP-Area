import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/scenes/Main';
import LoginUser from './src/components/auth/LoginUser';
import RegisterUser from './src/components/auth/RegisterUser';
import Applet from './src/components/Applet';
import Homepage from './src/components/Homepage.jsx';
import Board from './src/scenes/Board';
import Profile from './src/components/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'} screenOptions={{headerShown: false}}>
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='LoginUser' component={LoginUser}/>
        <Stack.Screen name='RegisterUser' component={RegisterUser}/>
        <Stack.Screen name='Applet' component={Applet}/>
        <Stack.Screen name='Homepage' component={Homepage}/>
        <Stack.Screen name='Board' component={Board}/>
        <Stack.Screen name='Profile' component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}