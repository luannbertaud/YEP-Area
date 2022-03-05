import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/scenes/Main';
import Board from './src/scenes/Board';
import WidgetCreator from './src/scenes/WidgetCreator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'WidgetCreator'} screenOptions={{headerShown: false}}>
        <Stack.Screen name='WidgetCreator' component={WidgetCreator}/>
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='Board' component={Board}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}