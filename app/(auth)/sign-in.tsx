import React from 'react';
import { useRouter } from 'expo-router';
import { SignInScreen } from '@/components/screens';
import { useAuthStore } from '@/stores';

export default function SignIn() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSignIn = (email: string, password: string) => {
    // TODO: Add real validation
    if (email && password) {
      // Simulate successful login
      login(email, 'User Name'); // Later: get real name from API
      router.replace('/(tabs)');
    } else {
      alert('Please enter email and password');
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleNavigateToSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in
    console.log('Google sign in');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign in
    console.log('Apple sign in');
  };

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