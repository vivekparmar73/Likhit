import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  showPercentage?: boolean;
}

export function ProgressBar({ current, total, showPercentage = true }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  
  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      {showPercentage && (
        <View style={styles.textRow}>
          <Text style={styles.count}>
            {current.toLocaleString()} / {total.toLocaleString()}
          </Text>
          <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  barBackground: {
    height: 12,
    backgroundColor: colors.surfaceDim,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  percentage: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
