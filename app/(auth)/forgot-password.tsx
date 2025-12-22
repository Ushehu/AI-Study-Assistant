import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icons } from '@/components/Icons';
import { authService } from '@/services/authService';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.resetPassword(email);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        Alert.alert('Error', result.error || 'Failed to send reset email');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="px-6 pt-12">
          {/* Back Button */}
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center mb-8 -ml-2"
            onPress={handleBackToSignIn}
          >
            <Icons.ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>

          {/* Header Section */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold text-gray-900 mb-2">
              Forgot Password?
            </Text>
            <Text className="text-sm text-gray-500">
              {isSubmitted 
                ? "Check your email for reset instructions"
                : "Enter your email and we'll send you reset instructions"
              }
            </Text>
          </View>

          {!isSubmitted ? (
            <View>
              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </Text>
                <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">
                  <Icons.Mail size={20} color="#9CA3AF" />
                  <TextInput
                    className="text-base text-gray-900 flex-1 ml-3"
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Reset Button */}
              <TouchableOpacity 
                className="bg-indigo-600 rounded-full py-4 shadow-sm"
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white text-center text-base font-semibold">
                    Send Reset Link
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-6">
              <View className="items-center mb-4">
                <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-3">
                  <Icons.CheckCircle size={32} color="#10B981" />
                </View>
                <Text className="text-base font-semibold text-gray-900 text-center">
                  Email Sent!
                </Text>
              </View>
              <Text className="text-sm text-gray-600 text-center mb-4">
                We've sent password reset instructions to:
              </Text>
              <Text className="text-sm font-medium text-gray-900 text-center">
                {email}
              </Text>
            </View>
          )}

          {/* Back to Sign In Link */}
          <View className="flex-row justify-center items-center mt-6">
            <TouchableOpacity 
              className="flex-row items-center"
              onPress={handleBackToSignIn}
            >
              <Icons.ArrowLeft size={16} color="#4F46E5" />
              <Text className="text-sm text-indigo-600 font-medium ml-2">
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}