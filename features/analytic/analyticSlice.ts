import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { getHeaders } from '@/helpers/header'
import ICustomer from '@/models/Customer'

interface IOrderItem {
  craftId: string
  quantity: number
  title: string
  price: number
  imageUrl: string
}

interface IOrders extends ICustomer {
  orderItems: IOrderItem[],
  id: string
}

interface IAnalyticItem {
  _id: string
  totalQuantity: number
  sumPrice?: number
  title: string
  price: number
  imageUrl: string
}

type InitialState = {
  loading: boolean
  analytics: IAnalyticItem[]
  orders: IOrders[]
  error: string
}

const initialState: InitialState = {
  loading: false,
  analytics: [],
  orders: [],
  error: ''
}

const http = axios.create({
  baseURL: process.env.apiUrl
})

export const getAnalytics = createAsyncThunk('analytic/analytics', () => {
  return http.get<IAnalyticItem[]>(`/api/analytics`, getHeaders()).then(response => response.data)
})

export const getOrders = createAsyncThunk('analytic/orders', () => {
  return http.get<IOrders[]>(`/api/order`, getHeaders()).then(response => response.data)
})

const analyticSlice = createSlice({
  name: 'craft',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Analytics
    builder.addCase(getAnalytics.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getAnalytics.fulfilled,
      (state, action: PayloadAction<IAnalyticItem[]>) => {
        state.loading = false
        state.analytics = action.payload
        state.error = ''
      }
    )
    builder.addCase(getAnalytics.rejected, (state, action) => {
      state.loading = false
      state.analytics = []
      state.error = action.error.message || 'Something went wrong'
    })

    // Orders
    builder.addCase(getOrders.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<IOrders[]>) => {
        state.loading = false
        state.orders = action.payload
        state.error = ''
      }
    )
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false
      state.analytics = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default analyticSlice.reducer
