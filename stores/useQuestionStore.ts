import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: number;
  isBookmarked: boolean;
}

interface QuestionState {
  questions: Question[];
  currentQuestion: Question | null;
  isLoading: boolean;
  
  // Actions
  addQuestion: (question: Omit<Question, 'id' | 'timestamp'>) => void;
  setCurrentQuestion: (question: Question | null) => void;
  toggleBookmark: (id: string) => void;
  deleteQuestion: (id: string) => void;
  clearAllQuestions: () => void;
  
  // Getters
  getBookmarkedQuestions: () => Question[];
  getQuestionById: (id: string) => Question | undefined;
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: null,
      isLoading: false,

      addQuestion: (questionData) => {
        const newQuestion: Question = {
          ...questionData,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };
        
        set((state) => ({
          questions: [newQuestion, ...state.questions], // Add to beginning
          currentQuestion: newQuestion,
        }));
      },

      setCurrentQuestion: (question) => {
        set({ currentQuestion: question });
      },

      toggleBookmark: (id) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
          ),
          // Update current question if it's the one being bookmarked
          currentQuestion:
            state.currentQuestion?.id === id
              ? { ...state.currentQuestion, isBookmarked: !state.currentQuestion.isBookmarked }
              : state.currentQuestion,
        }));
      },

      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
          currentQuestion: state.currentQuestion?.id === id ? null : state.currentQuestion,
        }));
      },

      clearAllQuestions: () => {
        set({ questions: [], currentQuestion: null });
      },

      // Getters
      getBookmarkedQuestions: () => {
        return get().questions.filter((q) => q.isBookmarked);
      },

      getQuestionById: (id) => {
        return get().questions.find((q) => q.id === id);
      },
    }),
    {
      name: 'question-storage', // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);