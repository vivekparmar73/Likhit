import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import { BADGES } from '../../constants/config';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

type CompletionModalProps = {
  visible: boolean;
  word: string;
  count: number;
  earnedBadges: string[];
  onClose: () => void;
};

export function CompletionModal({
  visible,
  word,
  count,
  earnedBadges,
  onClose,
}: CompletionModalProps) {
  const badges = earnedBadges.map(id => BADGES[id]).filter(Boolean);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Celebration Icon */}
            <Text style={styles.celebrationIcon}>🎉</Text>

            {/* Title */}
            <Text style={styles.title}>Sankalp Complete!</Text>

            {/* Message */}
            <Text style={styles.message}>
              You have successfully completed {count} repetitions of
            </Text>
            <Text style={styles.word}>{word}</Text>

            {/* Badges */}
            {badges.length > 0 && (
              <>
                <Text style={styles.badgesTitle}>New Badges Earned!</Text>
                <View style={styles.badgesGrid}>
                  {badges.map(badge => (
                    <View key={badge.id} style={styles.badgeContainer}>
                      <Badge
                        icon={badge.icon}
                        name={badge.name}
                        description={badge.description}
                        size="medium"
                      />
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Close Button */}
            <Button
              title="Continue"
              onPress={onClose}
              size="large"
              style={styles.closeButton}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    ...shadows.lg,
  },
  scrollContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  celebrationIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  word: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  badgesTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  badgeContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  closeButton: {
    width: '100%',
  },
});
