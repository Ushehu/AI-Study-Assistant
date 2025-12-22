import React from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';
import { Icons } from './Icons';

interface VoiceButtonProps {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isRecording,
  onPress,
  disabled = false,
}) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isRecording) {
      // Pulse animation when recording
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-14 h-14 rounded-full items-center justify-center ${
        isRecording 
          ? 'bg-red-500' 
          : disabled 
          ? 'bg-gray-300' 
          : 'bg-indigo-600'
      }`}
    >
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        {isRecording ? (
          <Icons.X size={24} color="#FFFFFF" />
        ) : (
          <View>
            <Text className="text-2xl">🎤</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};