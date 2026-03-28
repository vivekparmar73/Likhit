import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useApp } from '../hooks/useApp';
import { BADGES } from '../constants/config';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';
import { Badge } from '../components/ui/Badge';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { history, stats, earnedBadges } = useApp();

  const allBadges = Object.values(BADGES);
  const earnedBadgeDetails = earnedBadges.map(id => 
    allBadges.find(b => b.id === id)
  ).filter(Boolean);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const renderHistoryItem = ({ item }: { item: typeof history[0] }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyWord}>{item.word}</Text>
        <Text style={styles.historyDate}>{formatDate(item.completedAt)}</Text>
      </View>
      <View style={styles.historyStats}>
        <View style={styles.statItem}>
          <MaterialIcons name="repeat" size={20} color={colors.primary} />
          <Text style={styles.statValue}>{item.count.toLocaleString()}</Text>
          <Text style={styles.statLabel}>times</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="schedule" size={20} color={colors.secondary} />
          <Text style={styles.statValue}>{formatDuration(item.duration)}</Text>
          <Text style={styles.statLabel}>duration</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="mode" size={20} color={colors.textTertiary} />
          <Text style={styles.statValue}>{item.mode}</Text>
          <Text style={styles.statLabel}>mode</Text>
        </View>
      </View>
      {item.badgesEarned.length > 0 && (
        <View style={styles.historyBadges}>
          {item.badgesEarned.map(badgeId => {
            const badge = allBadges.find(b => b.id === badgeId);
            return badge ? (
              <View key={badgeId} style={styles.miniBadge}>
                <Text style={styles.miniBadgeIcon}>{badge.icon}</Text>
                <Text style={styles.miniBadgeText}>{badge.name}</Text>
              </View>
            ) : null;
          })}
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={spacing.md}>
          <MaterialIcons name="arrow-back" size={28} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>History & Achievements</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Stats Section */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Your Journey</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{stats.totalCompletions}</Text>
                  <Text style={styles.statsLabel}>Completions</Text>
                </View>
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{stats.totalRepetitions.toLocaleString()}</Text>
                  <Text style={styles.statsLabel}>Total Repetitions</Text>
                </View>
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{stats.currentStreak}</Text>
                  <Text style={styles.statsLabel}>Current Streak</Text>
                </View>
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{stats.longestStreak}</Text>
                  <Text style={styles.statsLabel}>Longest Streak</Text>
                </View>
              </View>
            </View>

            {/* Badges Section */}
            <View style={styles.badgesSection}>
              <Text style={styles.sectionTitle}>
                Badges ({earnedBadgeDetails.length}/{allBadges.length})
              </Text>
              <View style={styles.badgesGrid}>
                {allBadges.map(badge => {
                  const isEarned = earnedBadges.includes(badge.id);
                  return (
                    <View
                      key={badge.id}
                      style={[styles.badgeContainer, !isEarned && styles.badgeLocked]}
                    >
                      <Badge
                        icon={isEarned ? badge.icon : '🔒'}
                        name={badge.name}
                        description={badge.description}
                        size="small"
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            {/* History Title */}
            {history.length > 0 && (
              <Text style={styles.sectionTitle}>Completed Sankalps</Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🕉️</Text>
            <Text style={styles.emptyTitle}>No completions yet</Text>
            <Text style={styles.emptyText}>
              Start your first Sankalp to begin your spiritual journey
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
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
    backgroundColor: colors.surface,
  },
  headerTitle: {
    ...typography.heading,
    color: colors.text,
  },
  headerRight: {
    width: 28,
  },
  listContent: {
    padding: spacing.lg,
  },
  statsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statsCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  statsValue: {
    ...typography.title,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statsLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  badgesSection: {
    marginBottom: spacing.xl,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  badgeContainer: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  badgeLocked: {
    opacity: 0.3,
  },
  historyCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  historyWord: {
    ...typography.heading,
    color: colors.text,
  },
  historyDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  historyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: {
    ...typography.subheading,
    color: colors.text,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  historyBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceDim,
  },
  miniBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.highlight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    gap: spacing.xs,
  },
  miniBadgeIcon: {
    fontSize: 16,
  },
  miniBadgeText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
