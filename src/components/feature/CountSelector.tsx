import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { COUNT_OPTIONS } from '../../constants/config';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';

interface CountSelectorProps {
  selectedCount: number;
  onSelect: (count: number) => void;
}

export function CountSelector({ selectedCount, onSelect }: CountSelectorProps) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [error, setError] = useState('');

  const handleCustom = () => {
    setShowCustomModal(true);
    setCustomValue('');
    setError('');
  };

  const handleCustomSubmit = () => {
    const value = parseInt(customValue, 10);
    
    if (isNaN(value) || value < 1) {
      setError('Please enter a valid number greater than 0');
      return;
    }
    
    if (value > 100000) {
      setError('Maximum count is 100,000');
      return;
    }
    
    onSelect(value);
    setShowCustomModal(false);
  };

  const displayLabel = COUNT_OPTIONS.find(opt => opt.value === selectedCount)?.label || `${selectedCount}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Target Count</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
      >
        {COUNT_OPTIONS.map(option => (
          <Chip
            key={option.value}
            label={option.label}
            selected={option.value === -1 ? false : selectedCount === option.value}
            onPress={() => option.value === -1 ? handleCustom() : onSelect(option.value)}
            style={styles.chip}
          />
        ))}
      </ScrollView>
      {selectedCount > 0 && !COUNT_OPTIONS.find(opt => opt.value === selectedCount) && (
        <Text style={styles.customIndicator}>Custom: {selectedCount} repetitions</Text>
      )}

      {/* Custom Input Modal */}
      <Modal
        visible={showCustomModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCustomModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowCustomModal(false)}
        >
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Custom Count</Text>
              <Pressable onPress={() => setShowCustomModal(false)}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.modalLabel}>Enter repetition count (1 - 100,000)</Text>
            <TextInput
              style={styles.input}
              value={customValue}
              onChangeText={(text) => {
                setCustomValue(text);
                setError('');
              }}
              keyboardType="number-pad"
              placeholder="e.g., 108, 500, 2500"
              placeholderTextColor={colors.textTertiary}
              autoFocus
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Button
              title="Set Count"
              onPress={handleCustomSubmit}
              size="large"
              style={styles.submitButton}
            />
          </Pressable>
        </Pressable>
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
  chipContainer: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  chip: {
    marginHorizontal: spacing.xs,
  },
  customIndicator: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '85%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.heading,
    color: colors.text,
  },
  modalLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  input: {
    ...typography.bodyLarge,
    color: colors.text,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.surfaceDim,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
