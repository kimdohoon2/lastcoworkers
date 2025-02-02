export interface FormData {
  nickname?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface SignUpResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    teamId: string;
  };
}

export interface ResetPasswordType {
  email: string;
  redirectUrl: string;
}

export interface ConfirmPasswordType {
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface ResetMessage {
  message: string;
}
