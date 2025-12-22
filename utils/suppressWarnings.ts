import { LogBox } from 'react-native';

// Suppress Firebase AsyncStorage warning
LogBox.ignoreLogs([
  'AsyncStorage has been extracted',
  '@firebase/auth: Auth',
  'You are initializing Firebase Auth for React Native without providing AsyncStorage',
]);

export {};