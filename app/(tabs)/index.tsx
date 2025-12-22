import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, View, ActivityIndicator, Text } from 'react-native';
import { HomeScreen } from '@/components/screens';
import { useQuestionStore } from '@/stores';
import { aiService } from '@/services/aiService';
import { useVoiceInput } from '@/hooks/useVoiceInput';

export default function Home() {  // ← Must have "export default"
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addQuestion } = useQuestionStore();
  
  // Voice input hook
  const {
    isRecording,
    transcript,
    isAvailable,
    startRecording,
    stopRecording,
    clearTranscript,
  } = useVoiceInput();

  const handleAskQuestion = async (question: string) => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    setLoading(true);
    clearTranscript();
    
    try {
      console.log('📝 User question:', question);
      
      const result = await aiService.askQuestion(question);
      
      if (result.success && result.answer) {
        const newQuestion = {
          question: question.trim(),
          answer: result.answer,
          isBookmarked: false,
        };
        
        addQuestion(newQuestion);
        
        console.log('✅ Question saved, navigating to answer');
        router.push('/answer');
      } else {
        Alert.alert(
          'AI Error', 
          result.error || 'Failed to get answer. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error asking question:', error);
      Alert.alert(
        'Error', 
        'Something went wrong. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewBookmarks = () => {
    router.push('/(tabs)/bookmarks');
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="text-base font-medium text-gray-900 mt-4">
          AI is thinking...
        </Text>
      </View>
    );
  }

  return (
    <HomeScreen 
      onAskQuestion={handleAskQuestion}
      onViewBookmarks={handleViewBookmarks}
      isRecording={isRecording}
      voiceTranscript={transcript}
      onStartVoice={startRecording}
      onStopVoice={stopRecording}
      voiceAvailable={isAvailable}
    />
  );
}