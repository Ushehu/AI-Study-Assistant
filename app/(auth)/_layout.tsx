import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#F9FAFB',
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="sign-up"
          options={{
            title: 'Sign Up',
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            title: 'Sign In',
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: 'Forgot Password',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}