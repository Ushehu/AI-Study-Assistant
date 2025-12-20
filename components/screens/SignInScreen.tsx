import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Icons } from '../Icons';

interface SignInScreenProps {
  onSignIn?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onNavigateToSignUp?: () => void;
  onGoogleSignIn?: () => void;
  onAppleSignIn?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignIn,
  onForgotPassword,
  onNavigateToSignUp,
  onGoogleSignIn,
  onAppleSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (email.trim() && password.trim() && onSignIn) {
      onSignIn(email.trim(), password.trim());
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
              Welcome Back
            </Text>
            <Text className="text-sm text-gray-500 mt-2 text-center">
              Sign in to continue learning
            </Text>
          </View>

          {/* Form Section */}
          <View className="mt-4">
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
            <View className="mb-2">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex-row items-center">
                <Icons.Lock size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base text-gray-900 flex-1 mx-3"
                  placeholder="Enter your password"
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

            {/* Forgot Password Link */}
            <View className="items-end mb-6">
              <TouchableOpacity onPress={onForgotPassword}>
                <Text className="text-sm text-indigo-600 font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity 
              className="bg-indigo-600 rounded-full py-4 shadow-sm"
              onPress={handleSignIn}
            >
              <Text className="text-white text-center text-base font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-4 text-xs text-gray-500">OR</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Sign In */}
            <TouchableOpacity 
              className="bg-white rounded-full py-4 border border-gray-200 mb-3"
              onPress={onGoogleSignIn}
            >
              <Text className="text-gray-700 text-center text-base font-medium">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-white rounded-full py-4 border border-gray-200"
              onPress={onAppleSignIn}
            >
              <Text className="text-gray-700 text-center text-base font-medium">
                Continue with Apple
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-6 mb-8">
              <Text className="text-sm text-gray-600">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onNavigateToSignUp}>
                <Text className="text-sm text-indigo-600 font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};