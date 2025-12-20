import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Icons } from '../Icons';

interface AnswerScreenProps {
  question: string;
  answer: string;
  isBookmarked?: boolean;
  isLoading?: boolean;
  onBack?: () => void;
  onBookmark?: () => void;
  onSaveBookmark?: () => void;
  onAskAnother?: () => void;
}

export const AnswerScreen: React.FC<AnswerScreenProps> = ({
  question,
  answer,
  isBookmarked = false,
  isLoading = false,
  onBack,
  onBookmark,
  onSaveBookmark,
  onAskAnother,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center"
          onPress={onBack}
        >
          <Icons.ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          AI Answer
        </Text>
        <TouchableOpacity 
          className="w-10 h-10 items-center justify-center"
          onPress={onBookmark}
        >
          <Icons.Bookmark 
            size={24} 
            color={isBookmarked ? "#4F46E5" : "#9CA3AF"}
            fill={isBookmarked ? "#4F46E5" : "none"}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        // Loading State
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="text-base font-medium text-gray-900 mt-4">
            Generating answer…
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className="px-6 pt-6">
            {/* Question Card */}
            <View className="bg-indigo-50 rounded-2xl p-4 mb-4">
              <Text className="text-xs font-medium text-indigo-600 mb-2">
                YOUR QUESTION
              </Text>
              <Text className="text-sm text-gray-800">
                {question}
              </Text>
            </View>

            {/* Answer Card */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Text className="text-xs font-medium text-indigo-600 mb-4">
                AI EXPLANATION
              </Text>
              <Text className="text-base text-gray-800 leading-6">
                {answer}
              </Text>
            </View>

            {/* Actions Section */}
            <View className="mt-6 mb-8">
              {!isBookmarked && onSaveBookmark && (
                <TouchableOpacity 
                  className="bg-indigo-600 rounded-full py-4 shadow-sm"
                  onPress={onSaveBookmark}
                >
                  <Text className="text-white text-center text-base font-semibold">
                    Save to Bookmarks
                  </Text>
                </TouchableOpacity>
              )}
              
              {onAskAnother && (
                <TouchableOpacity 
                  className="py-4 mt-2"
                  onPress={onAskAnother}
                >
                  <Text className="text-indigo-600 text-center text-sm font-medium">
                    Ask another question
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};