import React from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { ProfileScreen } from '@/components/screens';
import { useAuthStore, useQuestionStore } from '@/stores';

export default function Profile() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const clearAllQuestions = useQuestionStore((state) => state.clearAllQuestions);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            logout();
            // Optionally clear questions on logout
            // clearAllQuestions();
            router.replace('/(auth)/sign-in');
          },
        },
      ]
    );
  };

  return (
    <ProfileScreen onSignOut={handleSignOut} />
  );
}