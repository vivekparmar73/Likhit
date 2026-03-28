import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { PRESET_WORDS } from '../../constants/config';

interface WordInputProps {
  value: string;
  onChange: (text: string) => void;
  language: string;
  error?: string;
}

export function WordInput({ value, onChange, language, error }: WordInputProps) {
  const presets = PRESET_WORDS[language as keyof typeof PRESET_WORDS] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sacred Name / Mantra</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChange}
        placeholder={language === 'hi' ? 'जैसे: श्री राम' : language === 'gu' ? 'જેમ કે: શ્રી રામ' : 'e.g., Shree Ram'}
        placeholderTextColor={colors.textTertiary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {presets.length > 0 && (
        <View style={styles.presetsContainer}>
          <Text style={styles.presetsLabel}>Popular:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.presetsList}
          >
            {presets.map((preset, index) => (
              <Pressable
                key={index}
                onPress={() => onChange(preset)}
                style={({ pressed }) => [
                  styles.presetChip,
                  pressed && styles.presetChipPressed,
                ]}
              >
                <Text style={styles.presetText}>{preset}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
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
  input: {
    ...typography.bodyLarge,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceDim,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text,
    minHeight: 56,
    ...shadows.sm,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  presetsContainer: {
    marginTop: spacing.md,
  },
  presetsLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  presetsList: {
    gap: spacing.sm,
  },
  presetChip: {
    backgroundColor: colors.highlight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  presetChipPressed: {
    opacity: 0.7,
  },
  presetText: {
    ...typography.body,
    color: colors.text,
  },
});
