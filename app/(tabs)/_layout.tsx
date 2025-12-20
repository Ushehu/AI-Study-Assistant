import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Icons, IconColors } from '@/components/Icons';

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4F46E5', // indigo-600
          tabBarInactiveTintColor: '#9CA3AF', // gray-400
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F3F4F6',
            height: 88,
            paddingTop: 8,
            paddingBottom: 24,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <Icons.Home 
                size={24} 
                color={focused ? IconColors.primary : color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: 'Bookmarks',
            tabBarIcon: ({ focused, color }) => (
              <Icons.Bookmark 
                size={24} 
                color={focused ? IconColors.primary : color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused, color }) => (
              <Icons.User 
                size={24} 
                color={focused ? IconColors.primary : color} 
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}