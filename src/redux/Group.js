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
    selectedSurveyGroup: null,
    selectedPostHome: null,
    selectedOptionSearchGrade: null,
    selectedOptionSearchSubject: null,
    selectedOptionSearchPeople: null,
    selectedOptionSearchDocumentbyName: null,
    selectedOptionSearchDocumentbyType: null,
    selectedOptionSearchDocumentbySender: null,
    selectedOptionSearchDocementbyDate: null,

   
   
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
    selectedSurveyGroup: (state, action) => {
      state.selectedSurveyGroup = action.payload;
    },
    selectOptionSearchGrade : (state, action) => {
      state.selectedOptionSearchGrade = action.payload;
    },
    selectOptionSearchSubject: (state, action) => {
      state.selectedOptionSearchSubject = action.payload;
    },
    selectOptionSearchPeople: (state, action) => {
      state.selectedOptionSearchPeople = action.payload;
    }
    ,
    selectOptionSearchDocumentbyName: (state, action) => {
      state.selectedOptionSearchDocumentbyName = action.payload;
    }
    ,
    selectOptionSearchDocumentbyType: (state, action) => {
      state.selectedOptionSearchDocumentbyType = action.payload;
    }
    ,
    selectOptionSearchDocumentbySender: (state, action) => {
      state.selectedOptionSearchDocumentbySender = action.payload;
    }
    ,
    selectOptionSearchDocementbyDate: (state, action) => {
      state.selectedOptionSearchDocementbyDate = action.payload;
    },
  
    
    editPostGroup: (state, action) => {
      state.selectedPostGroup = state.selectedPostGroup.map((item) => {
        if (item.post.id === action.payload.id) {
          // Thay đổi nội dung của item
          return {
            ...item,
            post: action.payload, // Sử dụng action.payload.post thay vì action.payload
          };
        }
        return item; // Trả về item nguyên vẹn nếu không có sự thay đổi
      });
    },
    selectPostHome: (state, action) => {
      state.selectedPostHome = action.payload;
    },
    
  },
});

export const { selectOption,selectOptionProfile ,selectGroupOwner,selectGroupMember,selectPostGroup,editPostGroup , selectPostHome,deleteRaction,selectOptionSearchGrade,selectOptionSearchSubject, selectOptionSearchPeople,
selectOptionSearchDocumentbyName,selectOptionSearchDocumentbySender,selectOptionSearchDocumentbyType,selectOptionSearchDocementbyDate,selectedSurveyGroup} = menuSlice.actions;
export const selectSelectedOption = (state) => state.menu.selectedOption;
export const selectSelectedOptionProfile = (state) => state.menu.selectedOptionProfile;
export const selectSelectedGroupOwner = (state) => state.menu.selectedGrouOwner;
export const selectSelectedGroupMember = (state) => state.menu.selectedGroupMember;
export const selectSelectedPostHome = (state) => state.menu.selectedPostHome;
export const selectSelectedPostGroup = (state) => state.menu.selectedPostGroup;
export const selectSelectOptionSearchGrade = (state) => state.menu.selectedOptionSearchGrade;
export const selectSelectOptionSearchSubject = (state) => state.menu.selectedOptionSearchSubject;
export const selectSelectOptionSearchPeople = (state) => state.menu.selectedOptionSearchPeople;
export const selectSelectOptionSearchDocumentbyName = (state) => state.menu.selectedOptionSearchDocumentbyName;
export const selectSelectOptionSearchDocumentbyType = (state) => state.menu.selectedOptionSearchDocumentbyType;
export const selectSelectOptionSearchDocumentbySender = (state) => state.menu.selectedOptionSearchDocumentbySender;
export const selectSelectOptionSearchDocementbyDate = (state) => state.menu.selectedOptionSearchDocementbyDate;
export const selectSelectedSurveyGroup = (state) => state.menu.selectedSurveyGroup;
export default menuSlice.reducer;
