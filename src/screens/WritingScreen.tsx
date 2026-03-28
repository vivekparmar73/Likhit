import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAlert } from '../template';
import { useApp } from '../hooks/useApp';
import { getUniqueTokens } from '../services/textProcessor';
import { colors, typography, spacing, borderRadius } from '../constants/theme';
import { TileGrid } from '../components/feature/TileGrid';
import { ProgressBar } from '../components/feature/ProgressBar';
import { CompletionModal } from '../components/feature/CompletionModal';
import { CompletionAnimation } from '../components/feature/CompletionAnimation';

export default function WritingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { currentSession, allTokens, updateProgress, completeSession } = useApp();
  
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!currentSession) {
      navigation.replace('Setup');
    }
  }, [currentSession]);

  useEffect(() => {
    // Auto-scroll to current position
    if (currentSession && flatListRef.current) {
      const index = Math.floor(currentSession.progress / 10) * 10;
      if (index > 0 && index < allTokens.length) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.3,
        });
      }
    }
  }, [currentSession?.progress]);

  if (!currentSession) return null;

  const currentProgress = currentSession.progress;
  const currentToken = allTokens[currentProgress];
  const uniqueTiles = getUniqueTokens(currentSession.word, currentSession.mode);

  const handleCorrectPress = async () => {
    const newProgress = currentProgress + 1;
    
    if (newProgress >= allTokens.length) {
      // Session completed - show animation first
      setShowAnimation(true);
    } else {
      updateProgress(newProgress);
    }
  };

  const handleAnimationComplete = async () => {
    setShowAnimation(false);
    const badges = await completeSession();
    setEarnedBadges(badges);
    setShowCompletion(true);
  };

  const handleExit = () => {
    showAlert(
      'Exit Writing?',
      'Your progress is saved automatically. You can resume anytime.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleCompletionClose = () => {
    setShowCompletion(false);
    navigation.replace('Setup');
  };

  const renderToken = ({ item, index }: { item: string; index: number }) => {
    const isWritten = index < currentProgress;
    const isCurrent = index === currentProgress;
    
    return (
      <Text
        style={[
          styles.token,
          isWritten && styles.tokenWritten,
          isCurrent && styles.tokenCurrent,
        ]}
      >
        {item}
      </Text>
    );
  };

  const repetitionsCompleted = Math.floor(currentProgress / (allTokens.length / currentSession.targetCount));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleExit} hitSlop={spacing.md}>
          <MaterialIcons name="close" size={28} color={colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.word}>{currentSession.word}</Text>
          <Text style={styles.mode}>
            {currentSession.mode === 'character' ? 'Character Mode' : 'Word Mode'}
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.repetitionCount}>
          {repetitionsCompleted} / {currentSession.targetCount}
        </Text>
        <Text style={styles.repetitionLabel}>Repetitions Completed</Text>
        <ProgressBar
          current={currentProgress}
          total={allTokens.length}
          showPercentage
        />
      </View>

      {/* Display Area */}
      <View style={styles.displaySection}>
        <Text style={styles.displayLabel}>Written Text:</Text>
        <FlatList
          ref={flatListRef}
          data={allTokens}
          renderItem={renderToken}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.tokensContainer}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={() => {}}
          getItemLayout={(_, index) => ({
            length: 48,
            offset: 48 * index,
            index,
          })}
        />
      </View>

      {/* Tile Grid */}
      <View style={styles.tilesSection}>
        <Text style={styles.tilesLabel}>
          Tap: <Text style={styles.currentTokenHighlight}>{currentToken}</Text>
        </Text>
        <TileGrid
          tiles={uniqueTiles}
          correctTile={currentToken}
          onCorrectPress={handleCorrectPress}
          shuffleEnabled={currentSession.shuffleEnabled}
        />
      </View>

      {/* Completion Animation */}
      {showAnimation && (
        <CompletionAnimation
          word={currentSession.word}
          count={currentSession.targetCount}
          onComplete={handleAnimationComplete}
        />
      )}

      {/* Completion Modal */}
      <CompletionModal
        visible={showCompletion}
        word={currentSession.word}
        count={currentSession.targetCount}
        earnedBadges={earnedBadges}
        onClose={handleCompletionClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceDim,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 28,
  },
  word: {
    ...typography.heading,
    color: colors.primary,
  },
  mode: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  progressSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  repetitionCount: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  repetitionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  displaySection: {
    flex: 1,
    padding: spacing.lg,
  },
  displayLabel: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tokensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  token: {
    ...typography.sacred,
    color: colors.unwritten,
  },
  tokenWritten: {
    color: colors.written,
  },
  tokenCurrent: {
    color: colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  tilesSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceDim,
  },
  tilesLabel: {
    ...typography.subheading,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  currentTokenHighlight: {
    color: colors.primary,
    fontWeight: '700',
  },
});
