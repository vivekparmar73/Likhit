// Storage Service using AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';

export type Session = {
  word: string;
  language: string;
  targetCount: number;
  mode: 'character' | 'word';
  shuffleEnabled: boolean;
  progress: number;
  startedAt: string;
};

export type HistoryItem = {
  id: string;
  word: string;
  language: string;
  count: number;
  mode: 'character' | 'word';
  completedAt: string;
  duration: number;
  badgesEarned: string[];
};

export type Stats = {
  totalCompletions: number;
  totalRepetitions: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate?: string;
};

export async function saveCurrentSession(session: Session | null): Promise<void> {
  try {
    if (session === null) {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    } else {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CURRENT_SESSION,
        JSON.stringify(session)
      );
    }
  } catch (error) {
    console.error('Error saving current session:', error);
  }
}

export async function loadCurrentSession(): Promise<Session | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading current session:', error);
    return null;
  }
}

export async function saveHistory(history: HistoryItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.HISTORY,
      JSON.stringify(history)
    );
  } catch (error) {
    console.error('Error saving history:', error);
  }
}

export async function loadHistory(): Promise<HistoryItem[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}

export async function saveBadges(badges: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.BADGES,
      JSON.stringify(badges)
    );
  } catch (error) {
    console.error('Error saving badges:', error);
  }
}

export async function loadBadges(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading badges:', error);
    return [];
  }
}

export async function saveStats(stats: Stats): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.STATS,
      JSON.stringify(stats)
    );
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

export async function loadStats(): Promise<Stats> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : {
      totalCompletions: 0,
      totalRepetitions: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      totalCompletions: 0,
      totalRepetitions: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
  }
}
