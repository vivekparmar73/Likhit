// Text Processing Service

// Unicode ranges for different scripts
const UNICODE_RANGES = {
  Devanagari: /[\u0900-\u097F]/,
  Gujarati: /[\u0A80-\u0AFF]/,
  Tamil: /[\u0B80-\u0BFF]/,
  Telugu: /[\u0C00-\u0C7F]/,
  Kannada: /[\u0C80-\u0CFF]/,
  Malayalam: /[\u0D00-\u0D7F]/,
  Bengali: /[\u0980-\u09FF]/,
  Gurmukhi: /[\u0A00-\u0A7F]/,
  Latin: /[A-Za-z]/,
};

export function validateInput(text: string, languageCode: string): boolean {
  if (!text || text.trim() === '') return false;

  // Get script for language
  const scriptMap: { [key: string]: keyof typeof UNICODE_RANGES } = {
    hi: 'Devanagari',
    sa: 'Devanagari',
    mr: 'Devanagari',
    gu: 'Gujarati',
    ta: 'Tamil',
    te: 'Telugu',
    kn: 'Kannada',
    ml: 'Malayalam',
    bn: 'Bengali',
    pa: 'Gurmukhi',
    en: 'Latin',
  };

  const script = scriptMap[languageCode];
  if (!script) return false;

  const regex = UNICODE_RANGES[script];
  return regex.test(text);
}

export function tokenizeText(
  text: string,
  mode: 'character' | 'word'
): string[] {
  if (mode === 'character') {
    // Split into individual characters (grapheme clusters)
    return Array.from(text);
  } else {
    // Split by spaces for word mode
    return text.split(/\s+/).filter(w => w.length > 0);
  }
}

export function getUniqueTokens(
  text: string,
  mode: 'character' | 'word'
): string[] {
  const tokens = tokenizeText(text, mode);
  return Array.from(new Set(tokens));
}

export function generateAllTokens(
  text: string,
  count: number,
  mode: 'character' | 'word'
): string[] {
  const tokens = tokenizeText(text, mode);
  const allTokens: string[] = [];
  
  for (let i = 0; i < count; i++) {
    allTokens.push(...tokens);
  }
  
  return allTokens;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
