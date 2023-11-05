import { createSlice } from '@reduxjs/toolkit'

export const userStatusSlice = createSlice({
  name: 'isUserLogin',
  initialState: {
    value: undefined,
  },
  reducers: {
    setStatus: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setStatus } = userStatusSlice.actions

export const selectUserStatus = (state) => state.isUserLogin.value

export default userStatusSlice.reducer

