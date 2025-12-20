import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { HomeScreen } from '@/components/screens';
import { useQuestionStore } from '@/stores';
import { Alert } from 'react-native';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addQuestion, setCurrentQuestion } = useQuestionStore();

  const handleAskQuestion = async (question: string) => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Replace with actual AI API call
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAnswer = `This is a sample answer to: "${question}". In a real app, this would come from an AI service like OpenAI or Claude.`;
      
      // Add question to store
      addQuestion({
        question,
        answer: mockAnswer,
        isBookmarked: false,
      });
      
      // Navigate to answer screen
      router.push('/answer');
    } catch (error) {
      Alert.alert('Error', 'Failed to get answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewBookmarks = () => {
    router.push('/(tabs)/bookmarks');
  };

  return (
    <HomeScreen 
      onAskQuestion={handleAskQuestion}
      onViewBookmarks={handleViewBookmarks}
    />
  );
}