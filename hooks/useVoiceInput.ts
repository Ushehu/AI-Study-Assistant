import { useState, useEffect } from 'react';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { Alert } from 'react-native';

export const useVoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Check if speech recognition is available
    const checkAvailability = async () => {
      const available = await ExpoSpeechRecognitionModule.isRecognitionAvailable();
      setIsAvailable(available);
      
      if (!available) {
        console.log('Speech recognition not available on this device');
      }
    };

    checkAvailability();
  }, []);

  // Listen for speech recognition results
  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results[0]?.transcript;
    if (transcript) {
      setTranscript(transcript);
      console.log('📝 Transcript:', transcript);
    }
  });

  // Listen for errors
  useSpeechRecognitionEvent('error', (event) => {
    console.error('Speech recognition error:', event.error);
    setIsRecording(false);
    Alert.alert('Error', 'Failed to recognize speech. Please try again.');
  });

  // Listen for end of speech
  useSpeechRecognitionEvent('end', () => {
    console.log('Speech recognition ended');
    setIsRecording(false);
  });

  const startRecording = async () => {
    try {
      // Request permissions
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      
      if (!result.granted) {
        Alert.alert(
          'Permission Required',
          'Please enable microphone access in your device settings to use voice input.'
        );
        return;
      }

      // Start recording
      setTranscript('');
      setIsRecording(true);
      
      await ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        requiresOnDeviceRecognition: false,
      });

      console.log('🎤 Started recording');
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
      setIsRecording(false);
      console.log('🛑 Stopped recording');
    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsRecording(false);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return {
    isRecording,
    transcript,
    isAvailable,
    startRecording,
    stopRecording,
    clearTranscript,
  };
};