/**
 * Text processing for different scripts
 * Handles splitting into logical units for Hindi, Gujarati, and English
 */

// Script Unicode ranges
const DEVANAGARI_RANGE = /[\u0900-\u097F]/;
const GUJARATI_RANGE = /[\u0A80-\u0AFF]/;
const TAMIL_RANGE = /[\u0B80-\u0BFF]/;
const TELUGU_RANGE = /[\u0C00-\u0C7F]/;
const KANNADA_RANGE = /[\u0C80-\u0CFF]/;
const MALAYALAM_RANGE = /[\u0D00-\u0D7F]/;
const BENGALI_RANGE = /[\u0980-\u09FF]/;
const GURMUKHI_RANGE = /[\u0A00-\u0A7F]/;

/**
 * Split text into grapheme clusters (visual characters)
 * Handles combining marks properly for Indic scripts
 */
export function splitIntoGraphemes(text: string): string[] {
  // Use Intl.Segmenter if available (modern approach)
  if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
    const segmenter = new (Intl as any).Segmenter('hi', { granularity: 'grapheme' });
    const segments = segmenter.segment(text);
    return Array.from(segments, (s: any) => s.segment);
  }
  
  // Fallback: Basic splitting with combining character awareness
  const graphemes: string[] = [];
  let currentGrapheme = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    
    // Combining marks (vowel signs, nukta, virama, etc.)
    const isCombining = (code >= 0x0901 && code <= 0x0903) || // Devanagari combining
                       (code >= 0x093A && code <= 0x094F) ||
                       (code >= 0x0951 && code <= 0x0957) ||
                       (code >= 0x0962 && code <= 0x0963) ||
                       (code === 0x094D) || // Virama
                       (code >= 0x0A81 && code <= 0x0A83) || // Gujarati combining
                       (code >= 0x0ABE && code <= 0x0ACF);
    
    if (isCombining && currentGrapheme) {
      currentGrapheme += char;
    } else {
      if (currentGrapheme) graphemes.push(currentGrapheme);
      currentGrapheme = char;
    }
  }
  
  if (currentGrapheme) graphemes.push(currentGrapheme);
  return graphemes;
}

/**
 * Split text into words/syllables for word mode
 */
export function splitIntoWords(text: string, language: string): string[] {
  if (language === 'en') {
    // English: split by spaces and punctuation
    return text.split(/(\s+)/).filter(Boolean);
  }
  
  // Hindi/Gujarati: split by spaces, keeping spaces as separate tokens
  return text.split(/(\s+)/).filter(Boolean);
}

/**
 * Detect script type
 */
export function detectScript(text: string): string {
  if (DEVANAGARI_RANGE.test(text)) return 'devanagari';
  if (GUJARATI_RANGE.test(text)) return 'gujarati';
  if (TAMIL_RANGE.test(text)) return 'tamil';
  if (TELUGU_RANGE.test(text)) return 'telugu';
  if (KANNADA_RANGE.test(text)) return 'kannada';
  if (MALAYALAM_RANGE.test(text)) return 'malayalam';
  if (BENGALI_RANGE.test(text)) return 'bengali';
  if (GURMUKHI_RANGE.test(text)) return 'gurmukhi';
  if (/[a-zA-Z]/.test(text)) return 'latin';
  return 'unknown';
}

/**
 * Generate all tokens for the full mantra repetition
 */
export function generateAllTokens(
  word: string,
  count: number,
  mode: 'character' | 'word'
): string[] {
  const singleRepetition = mode === 'character' 
    ? splitIntoGraphemes(word)
    : splitIntoWords(word, detectScript(word) === 'latin' ? 'en' : 'hi');
  
  const allTokens: string[] = [];
  for (let i = 0; i < count; i++) {
    allTokens.push(...singleRepetition);
  }
  
  return allTokens;
}

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get unique characters/words from the mantra
 */
export function getUniqueTokens(word: string, mode: 'character' | 'word'): string[] {
  const tokens = mode === 'character'
    ? splitIntoGraphemes(word)
    : splitIntoWords(word, detectScript(word) === 'latin' ? 'en' : 'hi');
  
  return Array.from(new Set(tokens));
}

/**
 * Validate input based on language
 */
export function validateInput(text: string, language: string): boolean {
  if (!text.trim()) return false;
  
  const script = detectScript(text);
  
  // Map languages to their expected scripts
  const languageScriptMap: { [key: string]: string[] } = {
    hi: ['devanagari'],
    sa: ['devanagari'],
    mr: ['devanagari'],
    gu: ['gujarati'],
    ta: ['tamil'],
    te: ['telugu'],
    kn: ['kannada'],
    ml: ['malayalam'],
    bn: ['bengali'],
    pa: ['gurmukhi'],
    en: ['latin'],
  };
  
  const expectedScripts = languageScriptMap[language];
  if (expectedScripts && !expectedScripts.includes(script)) return false;
  
  return true;
}
