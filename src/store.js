import { configureStore } from '@reduxjs/toolkit'
// src/app/store.js

import menuReducer from './redux/Group';
import groupItemReducer from './redux/GetItemGroup';

const   store =  configureStore({
  reducer: {
    menu: menuReducer,
    groupItem:groupItemReducer,

  },
})

export default store;