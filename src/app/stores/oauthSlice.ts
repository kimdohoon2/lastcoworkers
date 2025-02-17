import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OAuthState {
  provider: 'KAKAO' | null;
}

const initialState: OAuthState = {
  provider: null,
};

const oauthSlice = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<'KAKAO'>) => {
      state.provider = action.payload;
    },
    oauthlogout: (state) => {
      state.provider = null;
    },
  },
});

export const { setProvider, oauthlogout } = oauthSlice.actions;
export default oauthSlice.reducer;
