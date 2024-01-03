import { configureStore } from '@reduxjs/toolkit'
// src/app/store.js

import menuReducer from './redux/Group';
import groupItemReducer from './redux/GetItemGroup';
import memberGroupReducer from './redux/MemberGroup';
import eventGroupReducer from './redux/EventGroup';
import friendReducer from './redux/Friend';
import ExamReducer  from './redux/Exam';
import UserReducer  from './redux/User';
import MessengerReducer from './redux/Messenger';
import SearchReducer from './redux/Search';
const   store =  configureStore({
  reducer: {
    menu: menuReducer,
    groupItem:groupItemReducer,
    memberGroup:memberGroupReducer,
    eventItem:eventGroupReducer,
    friend:friendReducer,
    exam:ExamReducer,
    user:UserReducer,
    messageItem:MessengerReducer,
    Search:SearchReducer,

  },
})

export default store;