import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { AnswerScreen } from '@/components/screens';
import { useQuestionStore } from '@/stores';

export default function Answer() {
  const router = useRouter();
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const toggleBookmark = useQuestionStore((state) => state.toggleBookmark);
  
  const [isBookmarked, setIsBookmarked] = useState(
    currentQuestion?.isBookmarked || false
  );

  useEffect(() => {
    setIsBookmarked(currentQuestion?.isBookmarked || false);
  }, [currentQuestion]);

  if (!currentQuestion) {
    router.back();
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  const handleBookmark = () => {
    if (currentQuestion) {
      toggleBookmark(currentQuestion.id);
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleSaveBookmark = () => {
    handleBookmark();
  };

  const handleAskAnother = () => {
    router.push('/(tabs)');
  };

  return (
    <AnswerScreen
      question={currentQuestion.question}
      answer={currentQuestion.answer}
      isBookmarked={isBookmarked}
      isLoading={false}
      onBack={handleBack}
      onBookmark={handleBookmark}
      onSaveBookmark={handleSaveBookmark}
      onAskAnother={handleAskAnother}
    />
  );
}