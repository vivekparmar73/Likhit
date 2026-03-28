import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAlert } from '../template';
import { useApp } from '../hooks/useApp';
import { validateInput } from '../services/textProcessor';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { Button } from '../components/ui/Button';
import { LanguageSelector } from '../components/feature/LanguageSelector';
import { WordInput } from '../components/feature/WordInput';
import { CountSelector } from '../components/feature/CountSelector';

export default function SetupScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { startNewSession, currentSession, clearCurrentSession } = useApp();

  const [language, setLanguage] = useState('hi');
  const [word, setWord] = useState('');
  const [count, setCount] = useState(108);
  const [mode, setMode] = useState<'character' | 'word'>('word');
  const [shuffleEnabled, setShuffleEnabled] = useState(true);
  const [error, setError] = useState('');

  const handleStart = () => {
    // Validate input
    if (!word.trim()) {
      setError('Please enter a sacred name or mantra');
      return;
    }

    if (!validateInput(word, language)) {
      setError(`Please use ${language === 'hi' ? 'Hindi (देवनागरी)' : language === 'gu' ? 'Gujarati' : 'English'} script`);
      return;
    }

    setError('');
    startNewSession(word, language, count, mode, shuffleEnabled);
    navigation.navigate('Writing');
  };

  const handleResume = () => {
    navigation.navigate('Writing');
  };

  const handleClear = () => {
    showAlert(
      'Clear Current Session?',
      'This will delete your current progress. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => clearCurrentSession(),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Likhit</Text>
            <Text style={styles.subtitle}>Digital Sankalp</Text>
            <Text style={styles.description}>
              Write your sacred name or mantra digitally with devotion
            </Text>
          </View>

          {/* Resume Section */}
          {currentSession && (
            <View style={styles.resumeCard}>
              <Text style={styles.resumeTitle}>Resume Your Sankalp</Text>
              <Text style={styles.resumeText}>
                {currentSession.word} • {currentSession.progress.toLocaleString()} / {currentSession.targetCount.toLocaleString()}
              </Text>
              <View style={styles.resumeButtons}>
                <Button
                  title="Resume"
                  onPress={handleResume}
                  size="medium"
                  style={styles.resumeButton}
                />
                <Button
                  title="Clear"
                  onPress={handleClear}
                  variant="outline"
                  size="medium"
                  style={styles.clearButton}
                />
              </View>
            </View>
          )}

          {/* Setup Form */}
          <View style={styles.form}>
            <LanguageSelector
              selectedLanguage={language}
              onSelect={setLanguage}
            />

            <WordInput
              value={word}
              onChange={setWord}
              language={language}
              error={error}
            />

            <CountSelector
              selectedCount={count}
              onSelect={setCount}
            />

            {/* Mode Toggle */}
            <View style={styles.modeSection}>
              <Text style={styles.modeLabel}>Writing Mode</Text>
              <View style={styles.modeButtons}>
                <Button
                  title="Word Mode"
                  onPress={() => setMode('word')}
                  variant={mode === 'word' ? 'primary' : 'outline'}
                  size="medium"
                  style={styles.modeButton}
                />
                <Button
                  title="Character Mode"
                  onPress={() => setMode('character')}
                  variant={mode === 'character' ? 'primary' : 'outline'}
                  size="medium"
                  style={styles.modeButton}
                />
              </View>
              <Text style={styles.modeHint}>
                {mode === 'word' ? 'Faster: Tap full words' : 'Precise: Tap individual characters'}
              </Text>
            </View>

            {/* Shuffle Toggle */}
            <View style={styles.modeSection}>
              <Text style={styles.modeLabel}>Tile Shuffle</Text>
              <View style={styles.modeButtons}>
                <Button
                  title="Shuffle ON"
                  onPress={() => setShuffleEnabled(true)}
                  variant={shuffleEnabled ? 'primary' : 'outline'}
                  size="medium"
                  style={styles.modeButton}
                />
                <Button
                  title="Shuffle OFF"
                  onPress={() => setShuffleEnabled(false)}
                  variant={!shuffleEnabled ? 'primary' : 'outline'}
                  size="medium"
                  style={styles.modeButton}
                />
              </View>
              <Text style={styles.modeHint}>
                {shuffleEnabled ? 'Tiles shuffle every time' : 'Tiles stay in same order'}
              </Text>
            </View>

            <Button
              title="Start Writing"
              onPress={handleStart}
              size="large"
              style={styles.startButton}
            />
          </View>

          {/* Navigation */}
          <View style={styles.navSection}>
            <Button
              title="View History"
              onPress={() => navigation.navigate('History')}
              variant="outline"
              size="medium"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.subheading,
    color: colors.secondary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  resumeCard: {
    backgroundColor: colors.highlight,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.primary + '40',
  },
  resumeTitle: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  resumeText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  resumeButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  resumeButton: {
    flex: 1,
  },
  clearButton: {
    flex: 1,
  },
  form: {
    marginBottom: spacing.xl,
  },
  modeSection: {
    marginBottom: spacing.lg,
  },
  modeLabel: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  modeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  modeButton: {
    flex: 1,
    minWidth: '45%',
  },
  modeHint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  startButton: {
    marginTop: spacing.md,
  },
  navSection: {
    marginBottom: spacing.xl,
  },
});
