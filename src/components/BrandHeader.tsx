import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

export function BrandHeader() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: theme.accentMuted }]}>
        <ThemedText style={[styles.badgeText, { color: theme.accent }]}>BR</ThemedText>
      </View>
      <ThemedText type="subtitle" style={styles.title}>
        Bergman Race Tracker
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Sign in with your bib number to track your race.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  badgeText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
  },
});
