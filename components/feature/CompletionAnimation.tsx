import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../constants/theme';

interface CompletionAnimationProps {
  word: string;
  count: number;
  onComplete: () => void;
}

const { width, height } = Dimensions.get('window');
const FLOWER_EMOJIS = ['🌸', '🌺', '🌼', '🌻', '🏵️', '💮', '🪷', '🌹'];
const NUM_FLOWERS = 30;

export function CompletionAnimation({ word, count, onComplete }: CompletionAnimationProps) {
  const textScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const flowers = useRef(
    Array.from({ length: NUM_FLOWERS }, () => ({
      x: Math.random() * width,
      y: useRef(new Animated.Value(-50)).current,
      rotation: useRef(new Animated.Value(0)).current,
      emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
      delay: Math.random() * 1000,
      duration: 3000 + Math.random() * 2000,
    }))
  ).current;

  useEffect(() => {
    // Animate text
    Animated.parallel([
      Animated.spring(textScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate flowers falling
    flowers.forEach((flower) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(flower.y, {
            toValue: height + 50,
            duration: flower.duration,
            useNativeDriver: true,
          }),
          Animated.timing(flower.rotation, {
            toValue: 360 * (2 + Math.random()),
            duration: flower.duration,
            useNativeDriver: true,
          }),
        ]).start();
      }, flower.delay);
    });

    // Auto-close after animation
    const timeout = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Falling Flowers */}
      {flowers.map((flower, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.flower,
            {
              left: flower.x,
              transform: [
                { translateY: flower.y },
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
          {flower.emoji}
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
        <Text style={styles.congratsText}>🎉 Completed! 🎉</Text>
        <Text style={styles.wordText}>{word}</Text>
        <Text style={styles.countText}>{count} Times</Text>
        <Text style={styles.messageText}>Your devotion shines bright!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flower: {
    position: 'absolute',
    fontSize: 32,
  },
  textContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xxl,
    alignItems: 'center',
    maxWidth: '85%',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  congratsText: {
    ...typography.heading,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  wordText: {
    ...typography.title,
    fontSize: 36,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  countText: {
    ...typography.heading,
    color: colors.secondary,
    marginBottom: spacing.lg,
  },
  messageText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
