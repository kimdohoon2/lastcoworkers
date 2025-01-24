import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInResponse } from '@/app/types/AuthType';

interface AuthState {
  user: Omit<
    SignInResponse['user'],
    'updatedAt' | 'createdAt' | 'image'
  > | null;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SignInResponse>) => {
      const { user, accessToken, refreshToken } = action.payload;

      // 필요한 필드만 저장 (Omit을 통해 필드 제외)
      state.user = {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        teamId: user.teamId,
      };

      state.accessToken = accessToken ?? '';
      state.refreshToken = refreshToken ?? '';
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
