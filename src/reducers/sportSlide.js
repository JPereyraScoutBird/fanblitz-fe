import { createSlice } from '@reduxjs/toolkit'

export const sportSlice = createSlice({
  name: 'sport',
  initialState: {
    value: 'mlb',
  },
  reducers: {
    setSport: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setSport } = sportSlice.actions

export const selectSport = (state) => state.sport.value

export default sportSlice.reducer

