import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/BrandHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';

export function AuthenticatedPlaceholderScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleSignOut() {
    logout();
    router.replace('/(auth)/login');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <BrandHeader />
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">Signed in</ThemedText>
            <ThemedText themeColor="textSecondary">
              Bib #{user?.bibNumber ?? '—'}
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.note}>
              Race dashboards are coming soon. You are authenticated and ready for the next
              release.
            </ThemedText>
          </ThemedView>
          <Button label="Sign Out" onPress={handleSignOut} />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.five,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  note: {
    lineHeight: 22,
  },
});
