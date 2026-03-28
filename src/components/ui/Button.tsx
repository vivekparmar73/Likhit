import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${variant}`], styles[`button_${size}`]];
    if (disabled) baseStyle.push(styles.buttonDisabled);
    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    return [styles.text, styles[`text_${variant}`], styles[`text_${size}`]];
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        ...getButtonStyle(),
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },

  // Variants
  button_primary: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  button_text: {
    backgroundColor: 'transparent',
  },

  // Sizes
  button_small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  button_medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  button_large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 52,
  },

  // Text Variants
  text_primary: {
    color: '#FFFFFF',
  },
  text_outline: {
    color: colors.primary,
  },
  text_text: {
    color: colors.primary,
  },

  // Text Sizes
  text_small: {
    ...typography.caption,
    fontWeight: '600',
  },
  text_medium: {
    ...typography.body,
    fontWeight: '600',
  },
  text_large: {
    ...typography.subheading,
    fontWeight: '700',
  },

  // States
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
