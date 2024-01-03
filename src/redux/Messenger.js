// src/features/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dataMessenger = createSlice({
  name: 'messageItem',
  initialState: {
    value: null ,
  },
  reducers: {
    selectMessenger: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectMessenger } = dataMessenger.actions;
export const selectselectMessenger = (state) => state.messageItem.value;
export default dataMessenger.reducer;
