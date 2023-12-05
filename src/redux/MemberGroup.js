import { createSlice } from '@reduxjs/toolkit';

const dataMemberGroup = createSlice({
  name: 'memberGroup',
  initialState: {
    value: null,
    user: null,
    request: null,
  },
  reducers: {
    selectMemberGroup: (state, action) => {
      state.value = action.payload;
    },
    selectMemberGroupRequest: (state, action) => {
      state.request = action.payload;
    },
    selectUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { selectMemberGroup, selectMemberGroupRequest ,selectUser} = dataMemberGroup.actions;
export const selectselectMemberGroup = (state) => state.memberGroup.value;
export const selectselectMemberGroupRequest = (state) => state.memberGroup.request;
export const selectselectUser = (state) => state.memberGroup.user;
export default dataMemberGroup.reducer;
