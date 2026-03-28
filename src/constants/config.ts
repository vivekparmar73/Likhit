// App Configuration

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  script: string;
};

export const LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
];

export const COUNT_OPTIONS = [
  { value: 11, label: '11' },
  { value: 21, label: '21' },
  { value: 51, label: '51' },
  { value: 101, label: '101' },
  { value: 108, label: '108' },
  { value: 501, label: '501' },
  { value: 1001, label: '1001' },
  { value: 1008, label: '1008' },
  { value: 10000, label: '10000' },
  { value: -1, label: 'Custom' },
];

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirement: number | 'first' | 'streak';
};

export const BADGES: { [key: string]: Badge } = {
  first: {
    id: 'first',
    name: 'First Steps',
    icon: '🌟',
    description: 'Complete your first Sankalp',
    requirement: 'first',
  },
  seeker: {
    id: 'seeker',
    name: 'Seeker',
    icon: '🙏',
    description: 'Complete 11 repetitions',
    requirement: 11,
  },
  devotee_21: {
    id: 'devotee_21',
    name: 'Devotee',
    icon: '🪔',
    description: 'Complete 21 repetitions',
    requirement: 21,
  },
  devotee_51: {
    id: 'devotee_51',
    name: 'Dedicated',
    icon: '🔱',
    description: 'Complete 51 repetitions',
    requirement: 51,
  },
  devotee_101: {
    id: 'devotee_101',
    name: 'Committed',
    icon: '📿',
    description: 'Complete 101 repetitions',
    requirement: 101,
  },
  devoted: {
    id: 'devoted',
    name: 'Devoted',
    icon: '🕉️',
    description: 'Complete 108 repetitions',
    requirement: 108,
  },
  sadhak_501: {
    id: 'sadhak_501',
    name: 'Sadhak',
    icon: '✨',
    description: 'Complete 501 repetitions',
    requirement: 501,
  },
  sadhak_1001: {
    id: 'sadhak_1001',
    name: 'Ascetic',
    icon: '🌺',
    description: 'Complete 1001 repetitions',
    requirement: 1001,
  },
  sadhak: {
    id: 'sadhak',
    name: 'True Sadhak',
    icon: '🏔️',
    description: 'Complete 1008 repetitions',
    requirement: 1008,
  },
  siddhi: {
    id: 'siddhi',
    name: 'Siddhi',
    icon: '👑',
    description: 'Complete 10000 repetitions',
    requirement: 10000,
  },
  streak_7: {
    id: 'streak_7',
    name: 'Weekly Devotee',
    icon: '🔥',
    description: 'Complete Sankalps for 7 consecutive days',
    requirement: 'streak',
  },
};

export const STORAGE_KEYS = {
  CURRENT_SESSION: '@likhit:current_session',
  HISTORY: '@likhit:history',
  BADGES: '@likhit:badges',
  STATS: '@likhit:stats',
};
