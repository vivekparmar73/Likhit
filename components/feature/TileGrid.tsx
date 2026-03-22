import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Vibration, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { shuffleArray } from '../../services/textProcessor';

interface TileGridProps {
  tiles: string[];
  correctTile: string;
  onCorrectPress: () => void;
  shuffleEnabled: boolean;
}

export function TileGrid({ tiles, correctTile, onCorrectPress, shuffleEnabled }: TileGridProps) {
  const [shuffledTiles, setShuffledTiles] = useState<string[]>([]);
  const [errorTile, setErrorTile] = useState<string | null>(null);

  useEffect(() => {
    setShuffledTiles(shuffleEnabled ? shuffleArray(tiles) : tiles);
    setErrorTile(null);
  }, [tiles, correctTile, shuffleEnabled]);

  const handlePress = (tile: string) => {
    if (tile === correctTile) {
      // Correct tile pressed
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Vibration.vibrate(50);
      }
      onCorrectPress();
    } else {
      // Wrong tile pressed
      setErrorTile(tile);
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Vibration.vibrate([0, 100, 50, 100]);
      }
      setTimeout(() => setErrorTile(null), 500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {shuffledTiles.map((tile, index) => (
          <Pressable
            key={`${tile}-${index}`}
            onPress={() => handlePress(tile)}
            style={({ pressed }) => [
              styles.tile,
              pressed && styles.tilePressed,
              errorTile === tile && styles.tileError,
            ]}
          >
            <Text style={styles.tileText}>{tile}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  tile: {
    minWidth: 80,
    minHeight: 80,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  tilePressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: colors.highlight,
  },
  tileError: {
    backgroundColor: colors.error + '20',
    borderColor: colors.error,
  },
  tileText: {
    ...typography.tile,
    color: colors.text,
  },
});
