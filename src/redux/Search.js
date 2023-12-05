import { createSlice } from '@reduxjs/toolkit';

const dataSearch = createSlice({
  name: 'Search',
  initialState: {
    all: null,
    post: null,
    people: null,
    class: null,
    group: null,
  },
  reducers: {
    selectSearch: (state, action) => {
      state.all = action.payload;
    },
    selectSearchpeople: (state, action) => {
      state.people = action.payload;
    },
    selectpost: (state, action) => {
      state.post = action.payload;
    },
    selectclass: (state, action) => {
      state.class = action.payload;
    },
    selectgroup: (state, action) => {
      state.group = action.payload;
    },

  },
});

export const { selectSearch, selectSearchpeople ,selectpost, selectclass,selectgroup} = dataSearch.actions;
export const selectselectSearch = (state) => state.Search.all;
export const selectselectSearchpeople = (state) => state.Search.people;
export const selectselectpost = (state) => state.Search.post;
export const selectselectclass = (state) => state.Search.class;
export const selectselectgroup = (state) => state.Search.group;
export default dataSearch.reducer;
