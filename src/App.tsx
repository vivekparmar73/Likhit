import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from './template';
import { AppProvider } from './contexts/AppContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AppProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
