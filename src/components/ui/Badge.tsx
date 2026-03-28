import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography, borderRadius, spacing, shadows } from '../../constants/theme';

interface BadgeProps {
  icon: string;
  name: string;
  description: string;
  size?: 'small' | 'large';
}

export function Badge({ icon, name, description, size = 'large' }: BadgeProps) {
  return (
    <View style={[styles.container, size === 'small' && styles.containerSmall]}>
      <LinearGradient 
        colors={['#FFD54F', '#FFB300']}
        style={[styles.iconCircle, size === 'small' && styles.iconCircleSmall]}
      >
        <Text style={[styles.icon, size === 'small' && styles.iconSmall]}>
          {icon}
        </Text>
      </LinearGradient>
      {size === 'large' && (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.md,
  },
  containerSmall: {
    padding: spacing.xs,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  iconCircleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 0,
  },
  icon: {
    fontSize: 40,
  },
  iconSmall: {
    fontSize: 20,
  },
  name: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
