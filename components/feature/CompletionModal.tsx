import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { BADGES } from '../../constants/config';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CompletionModalProps {
  visible: boolean;
  word: string;
  count: number;
  earnedBadges: string[];
  onClose: () => void;
}

export function CompletionModal({ visible, word, count, earnedBadges, onClose }: CompletionModalProps) {
  const badgeDetails = earnedBadges.map(id => 
    Object.values(BADGES).find(b => b.id === id)
  ).filter(Boolean);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.emoji}>🎉</Text>
            <Text style={styles.title}>Sankalp Completed!</Text>
            <Text style={styles.message}>
              You have successfully written{'\n'}
              <Text style={styles.word}>{word}</Text>{'\n'}
              {count.toLocaleString()} times
            </Text>

            {badgeDetails.length > 0 && (
              <View style={styles.badgesSection}>
                <Text style={styles.badgesTitle}>Badges Earned</Text>
                <View style={styles.badgesGrid}>
                  {badgeDetails.map(badge => (
                    badge && (
                      <Badge
                        key={badge.id}
                        icon={badge.icon}
                        name={badge.name}
                        description={badge.description}
                      />
                    )
                  ))}
                </View>
              </View>
            )}

            <Button
              title="Continue"
              onPress={onClose}
              style={styles.button}
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
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...shadows.lg,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
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
    marginBottom: spacing.lg,
  },
  word: {
    ...typography.heading,
    color: colors.text,
    fontWeight: '700',
  },
  badgesSection: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  badgesTitle: {
    ...typography.subheading,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});
