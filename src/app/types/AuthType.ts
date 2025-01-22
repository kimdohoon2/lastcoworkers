export interface FormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}
