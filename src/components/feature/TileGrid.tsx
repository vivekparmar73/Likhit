import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, Vibration } from 'react-native';
import { shuffleArray } from '../../services/textProcessor';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

type TileGridProps = {
  tiles: string[];
  correctTile: string;
  onCorrectPress: () => void;
  shuffleEnabled: boolean;
};

export function TileGrid({ tiles, correctTile, onCorrectPress, shuffleEnabled }: TileGridProps) {
  const [displayTiles, setDisplayTiles] = useState<string[]>(tiles);
  const [errorTile, setErrorTile] = useState<string | null>(null);

  useEffect(() => {
    if (shuffleEnabled) {
      setDisplayTiles(shuffleArray(tiles));
    } else {
      setDisplayTiles([...tiles]);
    }
  }, [tiles, correctTile, shuffleEnabled]);

  const handleTilePress = (tile: string) => {
    if (tile === correctTile) {
      // Correct tile - success feedback
      Vibration.vibrate(10);
      onCorrectPress();
    } else {
      // Wrong tile - error feedback
      setErrorTile(tile);
      Vibration.vibrate([0, 50, 50, 50]);
      setTimeout(() => setErrorTile(null), 500);
    }
  };

  return (
    <View style={styles.grid}>
      {displayTiles.map((tile, index) => (
        <Pressable
          key={`${tile}-${index}`}
          onPress={() => handleTilePress(tile)}
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
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    minWidth: 80,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.md,
  },
  tilePressed: {
    backgroundColor: colors.primaryLight,
    transform: [{ scale: 0.95 }],
  },
  tileError: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  tileText: {
    ...typography.sacred,
    color: colors.text,
    fontWeight: '600',
  },
});
