export type AuthState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
    redirectTo?: string;
};

export const initialAuthState: AuthState = {
  success: false,
  statusCode: 0,
  message: "",
};