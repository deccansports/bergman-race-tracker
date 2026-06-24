import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/BrandHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';

type FieldErrors = {
  bibNumber?: string;
  otp?: string;
  form?: string;
};

export function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [bibNumber, setBibNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleContinue() {
    setErrors({});

    const result = await login({ bibNumber, otp });

    if (!result.success) {
      setErrors({ form: result.error });
      return;
    }

    router.replace('/(app)');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <BrandHeader />

              <View style={styles.form}>
                <FormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.bibNumber}
                  keyboardType="number-pad"
                  label="Bib Number"
                  maxLength={6}
                  onChangeText={setBibNumber}
                  placeholder="e.g. 1042"
                  returnKeyType="next"
                  value={bibNumber}
                />

                <FormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.otp}
                  keyboardType="number-pad"
                  label="OTP"
                  maxLength={8}
                  onChangeText={setOtp}
                  placeholder="Enter your code"
                  returnKeyType="done"
                  secureTextEntry
                  textContentType="oneTimeCode"
                  value={otp}
                />

                {errors.form ? (
                  <ThemedText type="small" themeColor="error">
                    {errors.form}
                  </ThemedText>
                ) : null}

                <Button label="Continue" loading={isLoading} onPress={handleContinue} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.five,
  },
  form: {
    gap: Spacing.three,
  },
});
