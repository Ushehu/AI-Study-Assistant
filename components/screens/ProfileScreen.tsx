import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Icons } from '../Icons';

interface ProfileScreenProps {
  onSignOut?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onSignOut,
}) => {
  const infoItems = [
    { label: 'Built with', value: 'React Native + Expo' },
    { label: 'Styling', value: 'NativeWind (Tailwind CSS)' },
    { label: 'Storage', value: 'Offline Support' },
    { label: 'Version', value: 'v1.0.0' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="px-6 pt-12">
          {/* Top Section */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-indigo-600 rounded-full items-center justify-center mb-4">
              <Icons.Brain size={40} color="#FFFFFF" />
            </View>
            <Text className="text-2xl font-semibold text-gray-900">
              AI Study Assistant
            </Text>
            <Text className="text-sm text-gray-500 mt-2">
              Learn smarter with AI
            </Text>
          </View>

          {/* Info Section */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
            {infoItems.map((item, index) => (
              <View
                key={index}
                className={`px-5 py-4 flex-row justify-between items-center ${
                  index !== infoItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <Text className="text-sm font-medium text-gray-600">
                  {item.label}
                </Text>
                <Text className="text-sm text-gray-900">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Sign Out Button */}
          {onSignOut && (
            <TouchableOpacity 
              className="bg-red-50 rounded-2xl py-4 border border-red-100 flex-row items-center justify-center"
              onPress={onSignOut}
            >
              <Icons.LogOut size={20} color="#DC2626" />
              <Text className="text-red-600 text-center text-base font-semibold ml-2">
                Sign Out
              </Text>
            </TouchableOpacity>
          )}

          {/* Developer Credit */}
          <View className="items-center mt-12 mb-8">
            <Text className="text-xs text-gray-400">
              Built by Umar Faruk
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};