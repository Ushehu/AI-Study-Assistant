import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, ActivityIndicator, View } from 'react-native';
import { ProfileScreen } from '@/components/screens';
import { authService } from '@/services/authService';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
          onPress: async () => {
            setLoading(true);
            try {
              const result = await authService.signOut();
              
              if (result.success) {
                router.replace('/(auth)/sign-in');
              } else {
                Alert.alert('Error', result.error || 'Failed to sign out');
              }
            } catch (error) {
              Alert.alert('Error', 'An unexpected error occurred');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ProfileScreen onSignOut={handleSignOut} />
  );
}