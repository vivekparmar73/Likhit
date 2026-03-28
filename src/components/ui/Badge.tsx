import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

type BadgeProps = {
  icon: string;
  name: string;
  description?: string;
  size?: 'small' | 'medium';
};

export function Badge({ icon, name, description, size = 'medium' }: BadgeProps) {
  return (
    <View style={[styles.container, styles[`container_${size}`]]}>
      <Text style={[styles.icon, styles[`icon_${size}`]]}>{icon}</Text>
      <Text style={[styles.name, styles[`name_${size}`]]}>{name}</Text>
      {description && size === 'medium' && (
        <Text style={styles.description}>{description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.md,
  },
  container_small: {
    padding: spacing.sm,
  },
  container_medium: {
    padding: spacing.md,
  },
  icon: {
    marginBottom: spacing.xs,
  },
  icon_small: {
    fontSize: 24,
  },
  icon_medium: {
    fontSize: 40,
  },
  name: {
    ...typography.subheading,
    color: colors.text,
    textAlign: 'center',
  },
  name_small: {
    ...typography.caption,
    fontWeight: '600',
  },
  name_medium: {
    ...typography.subheading,
    fontWeight: '600',
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
