import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

type ProgressBarProps = {
  current: number;
  total: number;
  showPercentage?: boolean;
};

export function ProgressBar({ current, total, showPercentage = false }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  track: {
    height: 8,
    backgroundColor: colors.surfaceDim,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  percentage: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
  },
});
