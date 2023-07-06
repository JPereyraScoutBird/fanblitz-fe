import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const homeAction = createSlice({
  name: 'homeData',
  initialState: {
    value: [],
  },
  reducers: {
    setValue: (state, value) => {
      state.value = value
    },
    cleanValue: (state) => {
      state.value = []
    },
  },
})

export const { setValue, cleanValue } = homeAction.actions

export default homeAction.reducer
