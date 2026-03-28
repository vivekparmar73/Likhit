import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetupScreen from '../screens/SetupScreen';
import WritingScreen from '../screens/WritingScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
  Setup: undefined;
  Writing: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Setup"
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="Setup" component={SetupScreen} />
      <Stack.Screen name="Writing" component={WritingScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}
