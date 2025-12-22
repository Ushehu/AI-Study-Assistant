import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, ActivityIndicator, View } from 'react-native';
import { SignInScreen } from '@/components/screens';
import { authService } from '@/services/authService';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.signIn(email, password);

      if (result.success) {
        // onAuthStateChanged will handle navigation
        router.replace('/(tabs)');
      } else {
        Alert.alert('Sign In Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleNavigateToSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Coming Soon', 'Google sign in will be available soon');
  };

  const handleAppleSignIn = () => {
    Alert.alert('Coming Soon', 'Apple sign in will be available soon');
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SignInScreen
      onSignIn={handleSignIn}
      onForgotPassword={handleForgotPassword}
      onNavigateToSignUp={handleNavigateToSignUp}
      onGoogleSignIn={handleGoogleSignIn}
      onAppleSignIn={handleAppleSignIn}
    />
  );
}