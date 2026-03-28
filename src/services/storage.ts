import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  CURRENT_SESSION: 'likhit_current_session',
  HISTORY: 'likhit_history',
  BADGES: 'likhit_badges',
  STATS: 'likhit_stats',
};

export interface Session {
  word: string;
  language: string;
  targetCount: number;
  mode: 'character' | 'word';
  shuffleEnabled: boolean;
  progress: number;
  startedAt: string;
  totalTokens: number;
}

export interface CompletedSession {
  id: string;
  word: string;
  language: string;
  count: number;
  mode: 'character' | 'word';
  shuffleEnabled: boolean;
  completedAt: string;
  duration: number; // milliseconds
  badgesEarned: string[];
}

export interface UserStats {
  totalCompletions: number;
  totalRepetitions: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
}

/**
 * Current session management
 */
export async function saveCurrentSession(session: Session | null): Promise<void> {
  try {
    if (session === null) {
      await AsyncStorage.removeItem(KEYS.CURRENT_SESSION);
    } else {
      await AsyncStorage.setItem(KEYS.CURRENT_SESSION, JSON.stringify(session));
    }
  } catch (error) {
    console.error('Failed to save current session:', error);
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.CURRENT_SESSION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load current session:', error);
    return null;
  }
}

/**
 * History management
 */
export async function saveCompletedSession(session: CompletedSession): Promise<void> {
  try {
    const history = await getHistory();
    history.unshift(session); // Add to beginning
    await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save completed session:', error);
  }
}

export async function getHistory(): Promise<CompletedSession[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

/**
 * Badge management
 */
export async function saveEarnedBadges(badges: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.BADGES, JSON.stringify(badges));
  } catch (error) {
    console.error('Failed to save badges:', error);
  }
}

export async function getEarnedBadges(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.BADGES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load badges:', error);
    return [];
  }
}

/**
 * Stats management
 */
export async function updateStats(completedCount: number): Promise<void> {
  try {
    const stats = await getStats();
    const today = new Date().toDateString();
    const lastDate = stats.lastCompletionDate ? new Date(stats.lastCompletionDate).toDateString() : null;
    
    // Update streak
    if (lastDate === today) {
      // Same day, don't change streak
    } else if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
      // Yesterday, increment streak
      stats.currentStreak += 1;
    } else {
      // Streak broken, reset to 1
      stats.currentStreak = 1;
    }
    
    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.totalCompletions += 1;
    stats.totalRepetitions += completedCount;
    stats.lastCompletionDate = new Date().toISOString();
    
    await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to update stats:', error);
  }
}

export async function getStats(): Promise<UserStats> {
  try {
    const data = await AsyncStorage.getItem(KEYS.STATS);
    return data ? JSON.parse(data) : {
      totalCompletions: 0,
      totalRepetitions: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
    };
  } catch (error) {
    console.error('Failed to load stats:', error);
    return {
      totalCompletions: 0,
      totalRepetitions: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
    };
  }
}
