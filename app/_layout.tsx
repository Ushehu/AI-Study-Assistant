import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "./globals.css"

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}
