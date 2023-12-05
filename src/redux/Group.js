// src/features/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    selectedOption: 'introduce',
    selectedOptionProfile:'introduce',
    selectedGrouOwner: null,
    selectedGroupMember: null,  
    selectedPostGroup: null,
  },
  reducers: {
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    selectOptionProfile: (state, action) => {
      state.selectedOptionProfile = action.payload;
    },
    selectGroupOwner: (state, action) => {
      state.selectedGrouOwner = action.payload;
    },
    selectGroupMember: (state, action) => {
      state.selectedGroupMember = action.payload;
    },
    selectPostGroup: (state, action) => {
      state.selectedPostGroup = action.payload;
    },
  },
});

export const { selectOption,selectOptionProfile ,selectGroupOwner,selectGroupMember,selectPostGroup} = menuSlice.actions;
export const selectSelectedOption = (state) => state.menu.selectedOption;
export const selectSelectedOptionProfile = (state) => state.menu.selectedOptionProfile;
export const selectSelectedGroupOwner = (state) => state.menu.selectedGrouOwner;
export const selectSelectedGroupMember = (state) => state.menu.selectedGroupMember;
export const selectSelectedPostGroup = (state) => state.menu.selectedPostGroup;
export default menuSlice.reducer;
