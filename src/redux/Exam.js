import { createSlice } from '@reduxjs/toolkit';

const dataExam = createSlice({
  name: 'exam',
  initialState: {
    value: null,
    request: null,
    submition: null,
  },
  reducers: {
    selectexam: (state, action) => {
      state.value = action.payload;
    },
    selectsubmition: (state, action) => { 
      state.submition = action.payload;
    }

    
  },
});

export const { selectexam ,selectsubmition} = dataExam.actions;
export const selectselectexam = (state) => state.exam.value;
export const selectselectsubmition = (state) => state.exam.submition;
export default dataExam.reducer;
