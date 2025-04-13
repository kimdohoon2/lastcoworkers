import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInResponse } from '@/app/types/AuthType';

interface AuthState {
  user: Omit<
    SignInResponse['user'],
    'updatedAt' | 'createdAt' | 'image'
  > | null;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<Omit<SignInResponse, 'refreshToken'>>,
    ) => {
      const { user, accessToken } = action.payload;

      // 필요한 필드만 저장 (Omit을 통해 필드 제외)
      state.user = {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        teamId: user.teamId,
      };

      state.accessToken = accessToken ?? '';
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = '';
    },
  },
});

export const { setAccessToken, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
