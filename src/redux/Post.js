import { createSlice } from '@reduxjs/toolkit';

const dataPosst = createSlice({
  name: 'listpostHome',
  initialState: {
    value: null ,
  },
  reducers: {
    selectlistpostHome: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectlistpostHome } = dataPosst.actions;
export const selectselectlistpostHome = (state) => state.listpostHome.value;
export default dataPosst.reducer;