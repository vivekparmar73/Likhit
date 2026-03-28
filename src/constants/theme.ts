// Theme Configuration for Likhit App
// Spiritual color palette with warm, devotional tones

export const colors = {
  // Primary Colors (Saffron/Orange)
  primary: '#FF9933',
  primaryLight: '#FFB366',
  primaryDark: '#E67300',

  // Secondary Colors (Sandalwood/Gold)
  secondary: '#D4AF37',
  secondaryLight: '#E6C96B',
  secondaryDark: '#B8941F',

  // Background Colors
  background: '#FFF8F0',
  surface: '#FFFFFF',
  surfaceDim: '#F5E6D3',
  highlight: '#FFF4E6',

  // Text Colors
  text: '#2C1810',
  textSecondary: '#8B6F47',
  textTertiary: '#A68A5C',

  // Sacred Writing States
  written: '#2C1810',
  unwritten: '#D4C4B0',

  // Semantic Colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',

  // Badge Colors
  badgeGold: '#FFD700',
  badgeSilver: '#C0C0C0',
  badgeBronze: '#CD7F32',
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  sacred: {
    fontSize: 24,
    fontWeight: '500' as const,
    lineHeight: 36,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
