// src/features/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dataGroup = createSlice({
  name: 'groupItem',
  initialState: {
    value: null ,
  },
  reducers: {
    selectGroup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectGroup } = dataGroup.actions;
export const selectselectGroup = (state) => state.groupItem.value;
export default dataGroup.reducer;
