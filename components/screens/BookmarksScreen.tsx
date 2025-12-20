import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Icons } from '../Icons';

export interface Bookmark {
  id: string;
  question: string;
  preview: string;
}

interface BookmarksScreenProps {
  bookmarks?: Bookmark[];
  onBookmarkPress?: (id: string) => void;
}

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  bookmarks = [],
  onBookmarkPress,
}) => {
  const hasBookmarks = bookmarks.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Top Bar */}
        <View className="px-6 pt-8 pb-4">
          <Text className="text-2xl font-semibold text-gray-900">
            Saved Answers
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Your personal knowledge library
          </Text>
        </View>

        {/* Bookmarks List */}
        {hasBookmarks ? (
          <View className="px-6">
            {bookmarks.map((bookmark) => (
              <TouchableOpacity
                key={bookmark.id}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
                onPress={() => onBookmarkPress?.(bookmark.id)}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <Text className="flex-1 text-base font-semibold text-gray-900 mr-2">
                    {bookmark.question}
                  </Text>
                  <View className="ml-2">
                    <Icons.Bookmark size={20} color="#4F46E5" fill="#4F46E5" />
                  </View>
                </View>
                <Text className="text-sm text-gray-600 leading-5" numberOfLines={2}>
                  {bookmark.preview}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-6 py-20">
            <Icons.BookOpen size={64} color="#9CA3AF" />
            <Text className="text-lg font-semibold text-gray-900 mb-2 mt-4">
              No saved answers yet
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              Your bookmarks will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};