import { createSlice } from '@reduxjs/toolkit';

const dataFriend = createSlice({
  name: 'friend',
  initialState: {
    value: null,
    request: null,
    friendofFriend: null,
  },
  reducers: {
    selectFriend: (state, action) => {
      state.value = action.payload;
    },
    selectFriendRequest: (state, action) => {
      state.request = action.payload;
    },
    editFriendRequest: (state, action) => {
      state.request = state.request.filter((item) => item.id !== action.payload.id);
    },
    selectFriendOfFriend: (state, action) => {
      state.friendofFriend = action.payload;
    },
  },
});

export const { selectFriend, selectFriendRequest,editFriendRequest ,selectFriendOfFriend} = dataFriend.actions;
export const selectselectFriend = (state) => state.friend.value;
export const selectselectFriendRequest = (state) => state.friend.request;
export const selectselectFriendOfFriend = (state) => state.friend.friendofFriend;
export default dataFriend.reducer;
