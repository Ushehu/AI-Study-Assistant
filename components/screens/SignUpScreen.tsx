import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icons } from '../Icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignUpScreenProps {
  onSignUp?: (name: string, email: string, password: string) => void;
  onNavigateToSignIn?: () => void;
  onGoogleSignUp?: () => void;
  onAppleSignUp?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUp,
  onNavigateToSignIn,
  onGoogleSignUp,
  onAppleSignUp,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    if (name.trim() && email.trim() && password.trim() && onSignUp) {
      onSignUp(name.trim(), email.trim(), password.trim());
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="px-6 pt-12">
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-indigo-600 rounded-full items-center justify-center mb-4">
              <Icons.Brain size={40} color="#FFFFFF" />
            </View>
            <Text className="text-2xl font-semibold text-gray-900">
              Create Account
            </Text>
            <Text className="text-sm text-gray-500 mt-2 text-center">
              Start your learning journey with AI
            </Text>
          </View>

          {/* Form Section */}
          <View className="mt-4">
            {/* Name Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Full Name
              </Text>
              <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">
                <Icons.User size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base text-gray-900 flex-1 ml-3"
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="mb-4">
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
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">
                <Icons.Lock size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base text-gray-900 flex-1 mx-3"
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Icons.EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Icons.Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              className="bg-indigo-600 rounded-full py-4 shadow-sm"
              onPress={handleSignUp}
            >
              <Text className="text-white text-center text-base font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-4 text-xs text-gray-500">OR</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Sign Up */}
            <TouchableOpacity 
              className="bg-white rounded-full py-4 border border-gray-200 mb-3"
              onPress={onGoogleSignUp}
            >
              <Text className="text-gray-700 text-center text-base font-medium">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="flex-row justify-center items-center mt-6 mb-8">
              <Text className="text-sm text-gray-600">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onNavigateToSignIn}>
                <Text className="text-sm text-indigo-600 font-semibold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};