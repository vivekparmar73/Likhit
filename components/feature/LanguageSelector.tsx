import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';
import { LANGUAGES } from '../../constants/config';
import { Chip } from '../ui/Chip';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelect: (code: string) => void;
}

export function LanguageSelector({ selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Language</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
      >
        {LANGUAGES.map(lang => (
          <View key={lang.code} style={styles.chipWrapper}>
            <Chip
              label={lang.label}
              selected={selectedLanguage === lang.code}
              onPress={() => onSelect(lang.code)}
              style={styles.chip}
            />
            <Text style={styles.langName}>{lang.name.split(' ')[0]}</Text>
          </View>
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
  chipContainer: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  chipWrapper: {
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  chip: {
    marginBottom: spacing.xs,
  },
  langName: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
});
