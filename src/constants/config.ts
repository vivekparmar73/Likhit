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
  { value: -1, label: 'Custom' }, // -1 indicates custom input
];

export const LANGUAGES = [
  { code: 'hi', label: 'हिन्दी', name: 'Hindi (Devanagari)', script: 'devanagari' },
  { code: 'sa', label: 'संस्कृत', name: 'Sanskrit', script: 'devanagari' },
  { code: 'mr', label: 'मराठी', name: 'Marathi', script: 'devanagari' },
  { code: 'gu', label: 'ગુજરાતી', name: 'Gujarati', script: 'gujarati' },
  { code: 'ta', label: 'தமிழ்', name: 'Tamil', script: 'tamil' },
  { code: 'te', label: 'తెలుగు', name: 'Telugu', script: 'telugu' },
  { code: 'kn', label: 'ಕನ್ನಡ', name: 'Kannada', script: 'kannada' },
  { code: 'ml', label: 'മലയാളം', name: 'Malayalam', script: 'malayalam' },
  { code: 'bn', label: 'বাংলা', name: 'Bengali', script: 'bengali' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', name: 'Punjabi', script: 'gurmukhi' },
  { code: 'en', label: 'English', name: 'English', script: 'latin' },
];

export const BADGES = {
  FIRST_COMPLETION: {
    id: 'first',
    name: 'First Steps',
    description: 'Completed your first Sankalp',
    icon: '🙏',
  },
  SEEKER: {
    id: 'seeker',
    name: 'Seeker',
    description: 'Completed 11 repetitions',
    icon: '✨',
    count: 11,
  },
  DEDICATED: {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Completed 21 repetitions',
    icon: '🌟',
    count: 21,
  },
  COMMITTED: {
    id: 'committed',
    name: 'Committed',
    description: 'Completed 51 repetitions',
    icon: '💫',
    count: 51,
  },
  DEVOTED: {
    id: 'devoted',
    name: 'Devoted',
    description: 'Completed 101 repetitions',
    icon: '⭐',
    count: 101,
  },
  DEVOTEE: {
    id: 'devotee',
    name: 'Devotee',
    description: 'Completed 108 repetitions',
    icon: '🕉️',
    count: 108,
  },
  ADVANCED: {
    id: 'advanced',
    name: 'Advanced Sadhak',
    description: 'Completed 501 repetitions',
    icon: '🌺',
    count: 501,
  },
  SADHAK: {
    id: 'sadhak',
    name: 'Sadhak',
    description: 'Completed 1001 repetitions',
    icon: '🔱',
    count: 1001,
  },
  MASTER: {
    id: 'master',
    name: 'Master',
    description: 'Completed 1008 repetitions',
    icon: '🪔',
    count: 1008,
  },
  SIDDHI: {
    id: 'siddhi',
    name: 'Siddhi',
    description: 'Completed 10000 repetitions',
    icon: '🪷',
    count: 10000,
  },
};

export const PRESET_WORDS = {
  hi: ['श्री राम', 'ॐ नमः शिवाय', 'श्री कृष्ण', 'जय श्री राम', 'हरे कृष्ण'],
  sa: ['ॐ', 'ॐ नमः शिवाय', 'हरे राम हरे राम', 'ॐ गं गणपतये नमः'],
  mr: ['श्री गणेशाय नमः', 'ॐ नमो भगवते वासुदेवाय', 'जय महाराष्ट्र'],
  gu: ['શ્રી રામ', 'ૐ નમઃ શિવાય', 'શ્રી કૃષ્ણ'],
  ta: ['ஓம்', 'ஓம் நமசிவாய', 'முருகா'],
  te: ['ఓం', 'ఓం నమః శివాయ', 'శ్రీ వెంకటేశ్వరాయ నమః'],
  kn: ['ಓಂ', 'ಓಂ ನಮಃ ಶಿವಾಯ', 'ಶ್ರೀ ರಾಮ'],
  ml: ['ഓം', 'ഓം നമശ്ശിവായ', 'ശ്രീ കൃഷ്ണ'],
  bn: ['ওঁ', 'ওঁ নমঃ শিবায়', 'জয় মা কালী'],
  pa: ['ਵਾਹਿਗੁਰੂ', 'ਸਤਿਨਾਮ', 'ਇੱਕ ਓਅੰਕਾਰ'],
  en: ['Shree Ram', 'Om Namah Shivaya', 'Jai Shree Ram'],
};

// Save progress every N taps to prevent data loss
export const AUTOSAVE_INTERVAL = 10;

// Virtualization settings for large counts
export const RENDER_WINDOW = 50;
export const RENDER_AHEAD = 20;
