import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

type WordInputProps = {
  value: string;
  onChange: (text: string) => void;
  language: string;
  error?: string;
};

export function WordInput({ value, onChange, language, error }: WordInputProps) {
  const getPlaceholder = () => {
    switch (language) {
      case 'hi':
      case 'sa':
      case 'mr':
        return 'श्री राम, ॐ नमः शिवाय';
      case 'gu':
        return 'શ્રી રામ';
      case 'ta':
        return 'ஓம் நமசிவாய';
      case 'te':
        return 'శ్రీ రామ';
      case 'kn':
        return 'ಶ್ರೀ ರಾಮ';
      case 'ml':
        return 'ഓം നമഃ ശിവായ';
      case 'bn':
        return 'শ্রী রাম';
      case 'pa':
        return 'ਵਾਹਿਗੁਰੂ';
      default:
        return 'Shree Ram, Om Namah Shivaya';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sacred Name / Mantra</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={getPlaceholder()}
        placeholderTextColor={colors.unwritten}
        style={[styles.input, error && styles.inputError]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    ...typography.sacred,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceDim,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    color: colors.text,
    textAlign: 'center',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.sm,
  },
});
