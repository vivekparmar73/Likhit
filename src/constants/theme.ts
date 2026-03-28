export const colors = {
  // Spiritual palette
  primary: '#FF6B35', // Saffron
  primaryDark: '#D84315',
  secondary: '#8B4513', // Sandalwood
  background: '#FFF8E7', // Warm cream
  surface: '#FFFFFF',
  surfaceDim: '#F5E6D3',
  
  // Text
  text: '#2C1810',
  textSecondary: '#6D4C41',
  textTertiary: '#A1887F',
  
  // States
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFA726',
  
  // Opacity levels
  overlay: 'rgba(0, 0, 0, 0.5)',
  shimmer: 'rgba(255, 107, 53, 0.1)',
  written: '#2C1810',
  unwritten: 'rgba(44, 24, 16, 0.15)',
  
  // Accents
  badge: '#FFD54F',
  highlight: '#FFECB3',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  // Devanagari optimized
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 30,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  // For written text display
  sacred: {
    fontSize: 32,
    fontWeight: '500' as const,
    lineHeight: 48,
    letterSpacing: 2,
  },
  tile: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
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
