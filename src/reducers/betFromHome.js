import { createSlice } from '@reduxjs/toolkit'

export const betHomeSlice = createSlice({
  name: 'homeBet',
  initialState: {
    value: false,
  },
  reducers: {
    setBetHomeStatus: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setBetHomeStatus } = betHomeSlice.actions

export const selectBetStatus = (state) => state.homeBet.value

export default betHomeSlice.reducer

