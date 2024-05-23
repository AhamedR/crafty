import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import ICart from '@/models/Cart'
import IOrder from '@/models/Order'
import { store } from '@/app/store'
import ICustomer from '@/models/Customer'
import IOrderItem from '@/models/OrderItem'

type InitialState = {
  loading: boolean
  cart: IOrderItem[]
  totalOrder: number
  error: string
}

const initialState: InitialState = {
  loading: false,
  cart: [],
  totalOrder: 0,
  error: ''
}

const http = axios.create({
  baseURL: process.env.apiUrl
})

const getHeaders = () => {
  return {
    headers: {
      Accept: "application/json, text/plain, */*",
      Host: "localhost:4000",
      Origin: "http://localhost:3000",
    }
  }
}

export const placeOrder = createAsyncThunk('order/placeOrder', (customerDetails: ICustomer) => {
  const state = store.getState()

  return http.post<IOrder>(
    '/api/order',
    {orderItems: state.orderSlice.cart, ...customerDetails},
    getHeaders()
  ).then(response => response.data)
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      const searchIndex = state.cart.findIndex((item) => item.craftId === action.payload.id)
      let total = 0

      if (searchIndex >= 0) {
        state.cart[searchIndex].quantity = state.cart[searchIndex].quantity + 1
      } else {
        action.payload.id && state.cart.push({
          craftId: action.payload.id,
          quantity: action.payload.quantity,
          title: action.payload.title,
          price: action.payload.price,
          imageUrl: action.payload.imageUrl,
        })
      }

      state.cart.forEach(item => {
        total = total + item.quantity * item.price
      })

      state.totalOrder = total
    }
  },
  extraReducers: builder => {
    // Place an order
    builder.addCase(placeOrder.pending, state => {
      state.loading = true
    })
    builder.addCase(
      placeOrder.fulfilled,
      (state) => {
        state.loading = false
        state.cart = []
        state.error = ''
        state.totalOrder = 0
      }
    )
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
  }
})

export default orderSlice.reducer
export const { addToCart } = orderSlice.actions
