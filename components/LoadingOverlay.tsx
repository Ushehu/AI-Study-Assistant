import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  visible = true,
  message = 'Generating answer…'
}) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <View className="bg-white rounded-2xl p-8 items-center shadow-lg mx-6">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="text-base font-medium text-gray-900 mt-4">
          {message}
        </Text>
      </View>
    </View>
  );
};