// src/features/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dataEventGroup = createSlice({
  name: 'eventItem',
  initialState: {
    value: null ,
  },
  reducers: {
    selecteventGroup: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selecteventGroup } = dataEventGroup.actions;
export const selectselecteventGroup = (state) => state.eventItem.value;
export default dataEventGroup.reducer;
