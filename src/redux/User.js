import { createSlice } from '@reduxjs/toolkit';

const dataUser = createSlice({
  name: 'user',
  initialState: {
    value: null,
    
  },
  reducers: {
    selectuser: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const { selectuser } = dataUser.actions;
export const selectselectuser = (state) => state.user.value;
export default dataUser.reducer;
