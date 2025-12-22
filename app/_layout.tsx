import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "./globals.css"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../utils/suppressWarnings';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    
      <StatusBar style="dark" />
      <Slot />
    </SafeAreaProvider>
  );
}
