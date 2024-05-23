import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import ICraft from '@/models/Craft'
import { getHeaders } from '@/helpers/header'

type InitialState = {
  loading: boolean
  crafts: ICraft[]
  selectedCraft: ICraft | null
  error: string
}

interface IUpdateCraft {
  id: string
  craft: ICraft
}

const initialState: InitialState = {
  loading: false,
  crafts: [],
  selectedCraft: null,
  error: ''
}

const http = axios.create({
  baseURL: process.env.apiUrl
})

export const addNewCraft = createAsyncThunk('craft/addNew', (craft: ICraft) => {
  return http.post<ICraft>('/api/craft', {...craft}, getHeaders()).then(response => response.data)
})

export const getCraftById = createAsyncThunk('craft/getCraftById', (id: string) => {
  return http.get<ICraft>(`/api/craft/${id}`, getHeaders()).then(response => response.data)
})

export const updateCraft = createAsyncThunk('craft/update', (data: IUpdateCraft) => {
  return http.patch(`/api/craft/${data.id}`, data.craft, getHeaders()).then(response => response.data)
})

export const removeCraft = createAsyncThunk('craft/remove', (id: string) => {
  return http.delete(`/api/craft/${id}`, getHeaders()).then(response => response.data)
})

const craftSlice = createSlice({
  name: 'craft',
  initialState,
  reducers: {
    populateCraft: (state, action: PayloadAction<ICraft[]>) => {
      state.crafts = action.payload
    }
  },
  extraReducers: builder => {
    // Add new craft
    builder.addCase(addNewCraft.pending, state => {
      state.loading = true
    })
    builder.addCase(
      addNewCraft.fulfilled,
      (state, action: PayloadAction<ICraft>) => {
        state.loading = false
        state.crafts = [...state.crafts, action.payload]
        state.error = ''
      }
    )
    builder.addCase(addNewCraft.rejected, (state, action) => {
      state.loading = false
      state.crafts = []
      state.error = action.error.message || 'Something went wrong'
    })

    // Selected ICraft
    builder.addCase(getCraftById.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getCraftById.fulfilled,
      (state, action: PayloadAction<ICraft>) => {
        state.loading = false
        state.selectedCraft = action.payload
        state.error = ''
      }
    )
    builder.addCase(getCraftById.rejected, (state, action) => {
      state.loading = false
      state.selectedCraft = null
      state.error = action.error.message || 'Something went wrong'
    })

    // Update ICraft
    builder.addCase(updateCraft.pending, state => {
      state.loading = true
    })
    builder.addCase(
      updateCraft.fulfilled,
      (state, action: PayloadAction<ICraft>) => {
        const oldCraftIndex = state.crafts.findIndex(craft => craft.id === action.payload.id)

        state.loading = false
        state.crafts[oldCraftIndex] = action.payload
        state.error = ''
      }
    )
    builder.addCase(updateCraft.rejected, (state, action) => {
      state.loading = false
      state.crafts = []
      state.error = action.error.message || 'Something went wrong'
    })

    // Remove ICraft
    builder.addCase(removeCraft.pending, state => {
      state.loading = true
    })
    builder.addCase(
      removeCraft.fulfilled,
      (state, action: PayloadAction<ICraft>) => {
        const deletedCraftIndex = state.crafts.findIndex(craft => craft.id === action.payload.id)
        state.crafts.splice(deletedCraftIndex, 1)

        state.loading = false
        state.crafts = [...state.crafts]
        state.error = ''
      }
    )
    builder.addCase(removeCraft.rejected, (state, action) => {
      state.loading = false
      state.crafts = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default craftSlice.reducer
export const { populateCraft } = craftSlice.actions
