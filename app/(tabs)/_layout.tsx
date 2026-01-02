import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '@/components/Icons';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: '#9CA3AF',

          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',

            // ✅ SAFE AREA FIX
            height: 64 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 8,

            elevation: 0,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },

          tabBarItemStyle: {
            paddingVertical: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Icons.Home
                size={24}
                color={focused ? '#4F46E5' : '#9CA3AF'}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmarks"
          options={{
            title: 'Bookmarks',
            tabBarIcon: ({ focused }) => (
              <Icons.Bookmark
                size={24}
                color={focused ? '#4F46E5' : '#9CA3AF'}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Icons.User
                size={24}
                color={focused ? '#4F46E5' : '#9CA3AF'}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
