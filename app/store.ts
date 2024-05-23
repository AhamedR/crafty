import { configureStore } from '@reduxjs/toolkit'

import orderSlice from '@/features/order/orderSlice'
import authSlice from '@/features/auth/authSlice'
import craftSlice from '@/features/craft/craftSlice'
import analyticSlice from '@/features/analytic/analyticSlice'

export const store = configureStore({
  reducer: { authSlice, orderSlice, craftSlice, analyticSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
