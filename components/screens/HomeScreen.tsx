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

interface HomeScreenProps {
  onAskQuestion?: (question: string) => void;
  onViewBookmarks?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onAskQuestion,
  onViewBookmarks,
}) => {
  const [question, setQuestion] = useState('');

  const handleAskQuestion = () => {
    if (question.trim() && onAskQuestion) {
      onAskQuestion(question.trim());
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="px-6 pt-8">
          {/* Header Section */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1">
              <Text className="text-2xl font-semibold text-gray-900">
                AI Study Assistant
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Ask questions. Learn faster.
              </Text>
            </View>
            <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
              <Icons.Brain size={24} color="#4F46E5" />
            </View>
          </View>

          {/* Question Input Card */}
          <View className="mt-8">
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <TextInput
                className="text-base text-gray-900 min-h-[100px]"
                placeholder="Type your question here…"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={question}
                onChangeText={setQuestion}
              />
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity 
              className="bg-indigo-600 rounded-full py-4 mt-4 shadow-sm"
              onPress={handleAskQuestion}
            >
              <Text className="text-white text-center text-base font-semibold">
                Ask AI
              </Text>
            </TouchableOpacity>

            {/* Secondary Action */}
            <TouchableOpacity 
              className="py-4 mt-2"
              onPress={onViewBookmarks}
            >
              <Text className="text-indigo-600 text-center text-sm font-medium">
                View Saved Answers
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};