import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  Session,
  HistoryItem,
  Stats,
  loadCurrentSession,
  saveCurrentSession,
  loadHistory,
  saveHistory,
  loadBadges,
  saveBadges,
  loadStats,
  saveStats,
} from '../services/storage';
import { generateAllTokens } from '../services/textProcessor';
import { BADGES } from '../constants/config';

export type AppContextType = {
  currentSession: Session | null;
  allTokens: string[];
  history: HistoryItem[];
  earnedBadges: string[];
  stats: Stats;
  startNewSession: (
    word: string,
    language: string,
    count: number,
    mode: 'character' | 'word',
    shuffleEnabled: boolean
  ) => void;
  updateProgress: (progress: number) => void;
  completeSession: () => Promise<string[]>;
  clearCurrentSession: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [allTokens, setAllTokens] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCompletions: 0,
    totalRepetitions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save current session whenever it changes
  useEffect(() => {
    if (currentSession !== null) {
      saveCurrentSession(currentSession);
    }
  }, [currentSession]);

  async function loadData() {
    const [session, historyData, badges, statsData] = await Promise.all([
      loadCurrentSession(),
      loadHistory(),
      loadBadges(),
      loadStats(),
    ]);

    if (session) {
      setCurrentSession(session);
      const tokens = generateAllTokens(session.word, session.targetCount, session.mode);
      setAllTokens(tokens);
    }
    setHistory(historyData);
    setEarnedBadges(badges);
    setStats(statsData);
  }

  function startNewSession(
    word: string,
    language: string,
    count: number,
    mode: 'character' | 'word',
    shuffleEnabled: boolean
  ) {
    const session: Session = {
      word,
      language,
      targetCount: count,
      mode,
      shuffleEnabled,
      progress: 0,
      startedAt: new Date().toISOString(),
    };
    setCurrentSession(session);

    const tokens = generateAllTokens(word, count, mode);
    setAllTokens(tokens);
  }

  function updateProgress(progress: number) {
    if (currentSession) {
      const updatedSession = { ...currentSession, progress };
      setCurrentSession(updatedSession);
      
      // Auto-save every 10 taps for large counts
      if (progress % 10 === 0) {
        saveCurrentSession(updatedSession);
      }
    }
  }

  async function completeSession(): Promise<string[]> {
    if (!currentSession) return [];

    const completionDate = new Date().toISOString();
    const duration = new Date(completionDate).getTime() - new Date(currentSession.startedAt).getTime();

    // Check for new badges
    const newBadges: string[] = [];
    
    // First completion badge
    if (history.length === 0 && !earnedBadges.includes('first')) {
      newBadges.push('first');
    }

    // Count-based badges
    Object.values(BADGES).forEach(badge => {
      if (typeof badge.requirement === 'number') {
        if (currentSession.targetCount >= badge.requirement && !earnedBadges.includes(badge.id)) {
          newBadges.push(badge.id);
        }
      }
    });

    // Update stats
    const newStats: Stats = {
      totalCompletions: stats.totalCompletions + 1,
      totalRepetitions: stats.totalRepetitions + currentSession.targetCount,
      currentStreak: calculateNewStreak(stats, completionDate),
      longestStreak: Math.max(
        stats.longestStreak,
        calculateNewStreak(stats, completionDate)
      ),
      lastCompletionDate: completionDate,
    };

    // Create history item
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      word: currentSession.word,
      language: currentSession.language,
      count: currentSession.targetCount,
      mode: currentSession.mode,
      completedAt: completionDate,
      duration,
      badgesEarned: newBadges,
    };

    // Update state and storage
    const updatedHistory = [historyItem, ...history];
    const updatedBadges = [...earnedBadges, ...newBadges];

    setHistory(updatedHistory);
    setEarnedBadges(updatedBadges);
    setStats(newStats);
    setCurrentSession(null);
    setAllTokens([]);

    await Promise.all([
      saveHistory(updatedHistory),
      saveBadges(updatedBadges),
      saveStats(newStats),
      saveCurrentSession(null),
    ]);

    return newBadges;
  }

  function clearCurrentSession() {
    setCurrentSession(null);
    setAllTokens([]);
    saveCurrentSession(null);
  }

  function calculateNewStreak(currentStats: Stats, completionDate: string): number {
    if (!currentStats.lastCompletionDate) return 1;

    const lastDate = new Date(currentStats.lastCompletionDate);
    const today = new Date(completionDate);
    
    // Reset time to midnight for date comparison
    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Same day
      return currentStats.currentStreak;
    } else if (diffDays === 1) {
      // Consecutive day
      return currentStats.currentStreak + 1;
    } else {
      // Streak broken
      return 1;
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentSession,
        allTokens,
        history,
        earnedBadges,
        stats,
        startNewSession,
        updateProgress,
        completeSession,
        clearCurrentSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
