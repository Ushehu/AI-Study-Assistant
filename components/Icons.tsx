import React from 'react';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// Icon props type
export interface IconProps {
  size?: number;
  color?: string;
  fill?: string;
}

// Default icon props
const defaultSize = 24;
const defaultColor = '#111827';

// Icon wrapper component
const createIcon = (IconSet: any, iconName: string) => {
  return ({ size = defaultSize, color = defaultColor }: IconProps) => (
    <IconSet name={iconName} size={size} color={color} />
  );
};

// Export all icons with consistent defaults
export const Icons = {
  // Navigation
  Home: createIcon(Ionicons, 'home-outline'),
  Bookmark: ({ size = defaultSize, color = defaultColor, fill }: IconProps) => (
    <Ionicons 
      name={fill ? 'bookmark' : 'bookmark-outline'} 
      size={size} 
      color={color} 
    />
  ),
  User: createIcon(Ionicons, 'person-outline'),
  Menu: createIcon(Ionicons, 'menu-outline'),
  
  // Actions
  Send: createIcon(Ionicons, 'send-outline'),
  Search: createIcon(Ionicons, 'search-outline'),
  Plus: createIcon(Ionicons, 'add-outline'),
  Edit: createIcon(Feather, 'edit-2'),
  Trash: createIcon(Ionicons, 'trash-outline'),
  Settings: createIcon(Ionicons, 'settings-outline'),
  More: createIcon(Ionicons, 'ellipsis-vertical'),
  
  // Arrows
  ArrowLeft: createIcon(Ionicons, 'arrow-back'),
  ArrowRight: createIcon(Ionicons, 'arrow-forward'),
  ChevronLeft: createIcon(Ionicons, 'chevron-back'),
  ChevronRight: createIcon(Ionicons, 'chevron-forward'),
  ChevronDown: createIcon(Ionicons, 'chevron-down'),
  ChevronUp: createIcon(Ionicons, 'chevron-up'),
  
  // Status
  Check: createIcon(Ionicons, 'checkmark'),
  CheckCircle: createIcon(Ionicons, 'checkmark-circle'),
  X: createIcon(Ionicons, 'close'),
  XCircle: createIcon(Ionicons, 'close-circle'),
  AlertCircle: createIcon(Ionicons, 'alert-circle-outline'),
  Info: createIcon(Ionicons, 'information-circle-outline'),
  
  // Auth & Forms
  Mail: createIcon(Ionicons, 'mail-outline'),
  Lock: createIcon(Ionicons, 'lock-closed-outline'),
  Eye: createIcon(Ionicons, 'eye-outline'),
  EyeOff: createIcon(Ionicons, 'eye-off-outline'),
  LogOut: createIcon(Ionicons, 'log-out-outline'),
  
  // App Specific
  Brain: createIcon(MaterialCommunityIcons, 'brain'),
  BookOpen: createIcon(Ionicons, 'book-outline'),
  Lightbulb: createIcon(Ionicons, 'bulb-outline'),
  Zap: createIcon(Ionicons, 'flash-outline'),
  Star: createIcon(Ionicons, 'star-outline'),
  Award: createIcon(Ionicons, 'trophy-outline'),
  Target: createIcon(MaterialCommunityIcons, 'target'),
  TrendingUp: createIcon(Ionicons, 'trending-up'),
  
  // Misc
  Bell: createIcon(Ionicons, 'notifications-outline'),
  HelpCircle: createIcon(Ionicons, 'help-circle-outline'),
  Calendar: createIcon(Ionicons, 'calendar-outline'),
  Clock: createIcon(Ionicons, 'time-outline'),
};

// Icon size presets
export const IconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

// Icon color presets (matching your theme)
export const IconColors = {
  primary: '#4F46E5',
  secondary: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#111827',
};