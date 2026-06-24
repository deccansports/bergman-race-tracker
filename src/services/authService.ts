import type { AuthResult, LoginCredentials } from '@/types/auth';

export async function verifyLogin(credentials: LoginCredentials): Promise<AuthResult> {
  const bibNumber = credentials.bibNumber.trim();
  const otp = credentials.otp.trim();

  if (!bibNumber) {
    return { success: false, error: 'Bib number is required.' };
  }

  if (!/^\d+$/.test(bibNumber)) {
    return { success: false, error: 'Bib number must contain only digits.' };
  }

  if (!otp) {
    return { success: false, error: 'OTP is required.' };
  }

  if (!/^\d{4,8}$/.test(otp)) {
    return { success: false, error: 'OTP must be 4–8 digits.' };
  }

  // UI-only MVP: accept valid-format credentials until backend is wired up.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    user: { bibNumber },
  };
}
