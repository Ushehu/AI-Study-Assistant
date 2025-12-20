import React from 'react';
import { useRouter } from 'expo-router';
import { BookmarksScreen, type Bookmark } from '@/components/screens/BookmarksScreen';
import { useQuestionStore } from '@/stores';

export default function Bookmarks() {
  const router = useRouter();
  const getBookmarkedQuestions = useQuestionStore(
    (state) => state.getBookmarkedQuestions
  );
  const setCurrentQuestion = useQuestionStore((state) => state.setCurrentQuestion);
  
  const bookmarkedQuestions = getBookmarkedQuestions();
  
  // Transform to Bookmark format
  const bookmarks: Bookmark[] = bookmarkedQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    preview: q.answer.substring(0, 100) + '...', // First 100 chars
  }));

  const handleBookmarkPress = (id: string) => {
    const question = bookmarkedQuestions.find((q) => q.id === id);
    if (question) {
      setCurrentQuestion(question);
      router.push('/answer');
    }
  };

  return (
    <BookmarksScreen 
      bookmarks={bookmarks}
      onBookmarkPress={handleBookmarkPress}
    />
  );
}