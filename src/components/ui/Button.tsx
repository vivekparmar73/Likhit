import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography, borderRadius, shadows, spacing } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', size = 'medium', disabled = false, style }: ButtonProps) {
  const isPrimary = variant === 'primary';

  const innerContent = (pressed: boolean) => (
    <View style={[
      styles.contentContainer,
      styles[size],
      !isPrimary && styles[variant],
    ]}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[
          styles.text,
          styles[`${variant}Text` as keyof typeof styles] as TextStyle,
          pressed && styles.pressedText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {({ pressed }) => (
        isPrimary ? (
          <LinearGradient
            colors={['#FF512F', '#DD2476']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}
          >
            {innerContent(pressed)}
          </LinearGradient>
        ) : (
          innerContent(pressed)
        )
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  gradientContainer: {
    borderRadius: borderRadius.md,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  primary: {
    // Primary is handled by LinearGradient now
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: '#DD2476', // Adjusted to match gradient aesthetic
  },
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 56,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  outlineText: {
    color: '#DD2476',
    fontWeight: '700',
  },
  pressedText: {},
  disabledText: {},
});
