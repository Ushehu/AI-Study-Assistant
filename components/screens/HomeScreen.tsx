import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icons } from '../Icons';
import { VoiceButton } from '../VoiceButton';

interface HomeScreenProps {
  onAskQuestion?: (question: string) => void;
  onViewBookmarks?: () => void;
  isRecording?: boolean;
  voiceTranscript?: string;
  onStartVoice?: () => void;
  onStopVoice?: () => void;
  voiceAvailable?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onAskQuestion,
  onViewBookmarks,
  isRecording = false,
  voiceTranscript = '',
  onStartVoice,
  onStopVoice,
  voiceAvailable = false,
}) => {
  const [question, setQuestion] = useState('');

  // Update question when voice transcript changes
  useEffect(() => {
    if (voiceTranscript) {
      setQuestion(voiceTranscript);
    }
  }, [voiceTranscript]);

  const handleAskQuestion = () => {
    if (question.trim() && onAskQuestion) {
      onAskQuestion(question.trim());
      setQuestion(''); // Clear after asking
    }
  };

  const handleVoicePress = () => {
    if (isRecording) {
      onStopVoice?.();
    } else {
      onStartVoice?.();
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
              
              {/* Voice Recording Indicator */}
              {isRecording && (
                <View className="mt-3 flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  <Text className="text-sm text-red-500 font-medium">
                    Listening...
                  </Text>
                </View>
              )}
            </View>

            {/* Voice Button Row */}
            {voiceAvailable && (
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-1 mr-3">
                  <TouchableOpacity 
                    className="bg-indigo-600 rounded-full py-4 shadow-sm"
                    onPress={handleAskQuestion}
                  >
                    <Text className="text-white text-center text-base font-semibold">
                      Ask AI
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <VoiceButton
                  isRecording={isRecording}
                  onPress={handleVoicePress}
                />
              </View>
            )}

            {/* Ask Button (if no voice) */}
            {!voiceAvailable && (
              <TouchableOpacity 
                className="bg-indigo-600 rounded-full py-4 mt-4 shadow-sm"
                onPress={handleAskQuestion}
              >
                <Text className="text-white text-center text-base font-semibold">
                  Ask AI
                </Text>
              </TouchableOpacity>
            )}

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