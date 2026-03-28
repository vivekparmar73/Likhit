import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';

type CompletionAnimationProps = {
  word: string;
  count: number;
  onComplete: () => void;
};

type Flower = {
  id: number;
  left: Animated.Value;
  top: Animated.Value;
  rotation: Animated.Value;
  icon: string;
};

const FLOWER_ICONS = ['🌸', '🌺', '🌼', '🌻', '🏵️', '🪷'];
const { width, height } = Dimensions.get('window');

export function CompletionAnimation({ word, count, onComplete }: CompletionAnimationProps) {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const textScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create flowers
    const newFlowers: Flower[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: new Animated.Value(Math.random() * width),
      top: new Animated.Value(-50),
      rotation: new Animated.Value(0),
      icon: FLOWER_ICONS[Math.floor(Math.random() * FLOWER_ICONS.length)],
    }));
    setFlowers(newFlowers);

    // Animate text
    Animated.sequence([
      Animated.parallel([
        Animated.spring(textScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
    ]).start();

    // Animate flowers
    newFlowers.forEach((flower, index) => {
      Animated.parallel([
        Animated.timing(flower.top, {
          toValue: height + 50,
          duration: 3000 + Math.random() * 2000,
          delay: index * 100,
          useNativeDriver: false,
        }),
        Animated.timing(flower.rotation, {
          toValue: 360,
          duration: 2000,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Complete after animation
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Falling Flowers */}
      {flowers.map(flower => (
        <Animated.Text
          key={flower.id}
          style={[
            styles.flower,
            {
              left: flower.left,
              top: flower.top,
              transform: [
                {
                  rotate: flower.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          {flower.icon}
        </Animated.Text>
      ))}

      {/* Completion Text */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ scale: textScale }],
          },
        ]}
      >
        <Text style={styles.completionText}>✨ Completed ✨</Text>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.count}>{count} Times</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  flower: {
    position: 'absolute',
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  completionText: {
    ...typography.title,
    color: colors.secondary,
    marginBottom: spacing.md,
  },
  word: {
    ...typography.sacred,
    fontSize: 32,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  count: {
    ...typography.heading,
    color: '#FFFFFF',
  },
});
