import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LANGUAGES } from '../../constants/config';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

type LanguageSelectorProps = {
  selectedLanguage: string;
  onSelect: (code: string) => void;
};

export function LanguageSelector({ selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Language</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {LANGUAGES.map(lang => (
          <Pressable
            key={lang.code}
            onPress={() => onSelect(lang.code)}
            style={({ pressed }) => [
              styles.chip,
              selectedLanguage === lang.code && styles.chipSelected,
              pressed && styles.chipPressed,
            ]}
          >
            <Text style={[
              styles.chipNative,
              selectedLanguage === lang.code && styles.chipTextSelected,
            ]}>
              {lang.nativeName}
            </Text>
            <Text style={[
              styles.chipEnglish,
              selectedLanguage === lang.code && styles.chipTextSelected,
            ]}>
              {lang.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.subheading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  scrollContent: {
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceDim,
    minWidth: 100,
    alignItems: 'center',
    ...shadows.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  chipPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  chipNative: {
    ...typography.subheading,
    color: colors.text,
    fontWeight: '600',
  },
  chipEnglish: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
