import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  Session,
  CompletedSession,
  UserStats,
  saveCurrentSession,
  getCurrentSession,
  saveCompletedSession,
  getHistory,
  saveEarnedBadges,
  getEarnedBadges,
  updateStats,
  getStats,
} from '../services/storage';
import { generateAllTokens } from '../services/textProcessor';
import { AUTOSAVE_INTERVAL, BADGES } from '../constants/config';

interface AppContextType {
  // Session state
  currentSession: Session | null;
  allTokens: string[];
  
  // History & stats
  history: CompletedSession[];
  earnedBadges: string[];
  stats: UserStats;
  
  // Actions
  startNewSession: (word: string, language: string, count: number, mode: 'character' | 'word', shuffleEnabled: boolean) => void;
  updateProgress: (newProgress: number) => void;
  completeSession: () => Promise<string[]>;
  resumeSession: () => void;
  clearCurrentSession: () => void;
  refreshHistory: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [allTokens, setAllTokens] = useState<string[]>([]);
  const [history, setHistory] = useState<CompletedSession[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalCompletions: 0,
    totalRepetitions: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletionDate: null,
  });
  
  const [saveCounter, setSaveCounter] = useState(0);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Auto-save on progress changes
  useEffect(() => {
    if (currentSession && saveCounter % AUTOSAVE_INTERVAL === 0 && saveCounter > 0) {
      saveCurrentSession(currentSession);
    }
  }, [saveCounter]);

  async function loadInitialData() {
    const [session, historyData, badges, statsData] = await Promise.all([
      getCurrentSession(),
      getHistory(),
      getEarnedBadges(),
      getStats(),
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

  function startNewSession(word: string, language: string, count: number, mode: 'character' | 'word', shuffleEnabled: boolean) {
    const tokens = generateAllTokens(word, count, mode);
    
    const session: Session = {
      word,
      language,
      targetCount: count,
      mode,
      shuffleEnabled,
      progress: 0,
      startedAt: new Date().toISOString(),
      totalTokens: tokens.length,
    };
    
    setCurrentSession(session);
    setAllTokens(tokens);
    saveCurrentSession(session);
  }

  function updateProgress(newProgress: number) {
    if (!currentSession) return;
    
    const updated = { ...currentSession, progress: newProgress };
    setCurrentSession(updated);
    setSaveCounter(prev => prev + 1);
  }

  async function completeSession(): Promise<string[]> {
    if (!currentSession) return [];
    
    const duration = Date.now() - new Date(currentSession.startedAt).getTime();
    const newBadges: string[] = [];
    
    // Check for new badges
    if (earnedBadges.length === 0) {
      newBadges.push(BADGES.FIRST_COMPLETION.id);
    }
    
    // Count-based badges
    const countBadges = [
      { id: BADGES.SEEKER.id, count: 11 },
      { id: BADGES.DEVOTEE.id, count: 108 },
      { id: BADGES.SADHAK.id, count: 1008 },
      { id: BADGES.SIDDHI.id, count: 10000 },
    ];
    
    for (const badge of countBadges) {
      if (currentSession.targetCount >= badge.count && !earnedBadges.includes(badge.id)) {
        newBadges.push(badge.id);
      }
    }
    
    // Save completed session
    const completed: CompletedSession = {
      id: Date.now().toString(),
      word: currentSession.word,
      language: currentSession.language,
      count: currentSession.targetCount,
      mode: currentSession.mode,
      shuffleEnabled: currentSession.shuffleEnabled,
      completedAt: new Date().toISOString(),
      duration,
      badgesEarned: newBadges,
    };
    
    await saveCompletedSession(completed);
    
    // Update badges
    const updatedBadges = [...earnedBadges, ...newBadges];
    setEarnedBadges(updatedBadges);
    await saveEarnedBadges(updatedBadges);
    
    // Update stats
    await updateStats(currentSession.targetCount);
    const updatedStats = await getStats();
    setStats(updatedStats);
    
    // Refresh history
    const updatedHistory = await getHistory();
    setHistory(updatedHistory);
    
    // Clear current session
    setCurrentSession(null);
    setAllTokens([]);
    await saveCurrentSession(null);
    
    return newBadges;
  }

  function resumeSession() {
    // Already loaded in useEffect
  }

  function clearCurrentSession() {
    setCurrentSession(null);
    setAllTokens([]);
    saveCurrentSession(null);
  }

  async function refreshHistory() {
    const historyData = await getHistory();
    setHistory(historyData);
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
        resumeSession,
        clearCurrentSession,
        refreshHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
