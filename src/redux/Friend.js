import { createSlice } from '@reduxjs/toolkit';

const dataFriend = createSlice({
	name: 'friend',
	initialState: {
		value: null,
		request: null,
		friendofFriend: null,
		invite: [],
	},
	reducers: {
		selectFriend: (state, action) => {
			state.value = action.payload;
		},
		selectFriendRequest: (state, action) => {
			state.request = action.payload;
		},
		editFriendRequest: (state, action) => {
			const indexToRemove = state.request.findIndex((item) => item.id === action.payload.id);

			if (indexToRemove !== -1) {
				// Nếu phần tử có tồn tại trong mảng, loại bỏ nó
				state.request.splice(indexToRemove, 1);
			}
		},
		selectFriendOfFriend: (state, action) => {
			state.friendofFriend = action.payload;
		},
		selectFriendInvite: (state, action) => {
			if(action.payload === null) {
				state.invite = [];
				return;
			}
			else if (state.invite.length > 0 && state.invite.filter((item) => item.id === action.payload.id).length > 0) {
				return;
			} else {
				state.invite.push(action.payload);
			}
		},
		editSelectFriendInvite: (state, action) => {
			state.invite = state.invite.filter((item) => item.id !== action.payload.id);
		},
	},
});

export const {
	selectFriend,
	selectFriendRequest,
	editFriendRequest,
	selectFriendOfFriend,
	selectFriendInvite,
	editSelectFriendInvite,
} = dataFriend.actions;
export const selectselectFriend = (state) => state.friend.value;
export const selectselectFriendRequest = (state) => state.friend.request;
export const selectselectFriendOfFriend = (state) => state.friend.friendofFriend;
export const selectselectFriendInvite = (state) => state.friend.invite;
export default dataFriend.reducer;
