import { createSlice } from '@reduxjs/toolkit'

export const sendPromtSlice = createSlice({
  name: 'sendPromt',
  initialState: {
    value: false,
  },
  reducers: {
    setSendPromt: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setSendPromt } = sendPromtSlice.actions

export const selectSendPromt = (state) => state.sendPromt.value

export default sendPromtSlice.reducer