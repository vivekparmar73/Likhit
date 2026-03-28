import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Modal, StyleSheet } from 'react-native';
import { COUNT_OPTIONS } from '../../constants/config';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { Button } from '../ui/Button';

type CountSelectorProps = {
  selectedCount: number;
  onSelect: (count: number) => void;
};

export function CountSelector({ selectedCount, onSelect }: CountSelectorProps) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const handleChipPress = (value: number) => {
    if (value === -1) {
      setShowCustomModal(true);
    } else {
      onSelect(value);
    }
  };

  const handleCustomSubmit = () => {
    const count = parseInt(customValue, 10);
    if (count && count > 0 && count <= 1000000) {
      onSelect(count);
      setShowCustomModal(false);
      setCustomValue('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Target Count</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {COUNT_OPTIONS.map(option => {
          const isSelected = option.value === -1 
            ? !COUNT_OPTIONS.some(o => o.value === selectedCount && o.value !== -1)
            : option.value === selectedCount;

          return (
            <Pressable
              key={option.value}
              onPress={() => handleChipPress(option.value)}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.chipSelected,
                pressed && styles.chipPressed,
              ]}
            >
              <Text style={[
                styles.chipText,
                isSelected && styles.chipTextSelected,
              ]}>
                {option.value === -1 && selectedCount !== 108 && !COUNT_OPTIONS.some(o => o.value === selectedCount)
                  ? selectedCount.toLocaleString()
                  : option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Custom Count Modal */}
      <Modal
        visible={showCustomModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Custom Count</Text>
            <Text style={styles.modalHint}>Enter a number between 1 and 1,000,000</Text>
            <TextInput
              value={customValue}
              onChangeText={setCustomValue}
              placeholder="1008"
              placeholderTextColor={colors.unwritten}
              keyboardType="number-pad"
              style={styles.modalInput}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => {
                  setShowCustomModal(false);
                  setCustomValue('');
                }}
                variant="outline"
                size="medium"
                style={styles.modalButton}
              />
              <Button
                title="Confirm"
                onPress={handleCustomSubmit}
                size="medium"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    minWidth: 80,
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
  chipText: {
    ...typography.subheading,
    color: colors.text,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    ...shadows.lg,
  },
  modalTitle: {
    ...typography.heading,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  modalHint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalInput: {
    ...typography.title,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceDim,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
});
