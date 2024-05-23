import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  token: string | undefined
}

const initialState: InitialState = {
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<{token: string | undefined}>) => {
      state.token = action.payload.token
    }
  },
})

export default authSlice.reducer
export const { storeToken } = authSlice.actions
