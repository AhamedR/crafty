import { store } from '@/app/store'

export const getHeaders = () => {
  const state = store.getState()

  return {
    headers: {
      Authorization: `Bearer ${state.authSlice.token}`,
      Accept: "application/json, text/plain, */*",
      Host: "localhost:4000",
      Origin: "http://localhost:3000",
    }
  }
}