import React from 'react';
import { useRouter } from 'expo-router';
import { SignUpScreen } from '@/components/screens';
import { useAuthStore } from '@/stores';

export default function SignUp() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSignUp = (name: string, email: string, password: string) => {
    // TODO: Add real validation and API call
    if (name && email && password) {
      // Simulate successful sign up
      login(email, name);
      router.replace('/(tabs)');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleNavigateToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up
    console.log('Google sign up');
  };

  const handleAppleSignUp = () => {
    // TODO: Implement Apple sign up
    console.log('Apple sign up');
  };

  return (
    <SignUpScreen
      onSignUp={handleSignUp}
      onNavigateToSignIn={handleNavigateToSignIn}
      onGoogleSignUp={handleGoogleSignUp}
      onAppleSignUp={handleAppleSignUp}
    />
  );
}