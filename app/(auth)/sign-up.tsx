import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, ActivityIndicator, View} from 'react-native';
import { SignUpScreen } from '@/components/screens';
import { authService } from '@/services/authService';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.signUp(email, password, name);

      if (result.success) {
        // User is automatically logged in after sign up
        // onAuthStateChanged will handle navigation
        router.replace('/(tabs)');
      } else {
        Alert.alert('Sign Up Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up
    Alert.alert('Coming Soon', 'Google sign up will be available soon');
  };

  const handleAppleSignUp = () => {
    // TODO: Implement Apple sign up
    Alert.alert('Coming Soon', 'Apple sign up will be available soon');
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SignUpScreen
      onSignUp={handleSignUp}
      onNavigateToSignIn={handleNavigateToSignIn}
      onGoogleSignUp={handleGoogleSignUp}
      onAppleSignUp={handleAppleSignUp}
    />
  );
}