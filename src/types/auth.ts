export type AuthUser = {
  bibNumber: string;
};

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type LoginCredentials = {
  bibNumber: string;
  otp: string;
};

export type AuthResult = {
  success: boolean;
  error?: string;
  user?: AuthUser;
};
