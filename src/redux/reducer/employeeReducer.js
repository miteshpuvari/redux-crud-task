import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeList: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    createEmployee(state, action) {
      state.employeeList.push(action.payload);
    },
    deleteEmployee(state, action) {
      state.employeeList = action?.payload;
    },
    editEmployee(state, action) {
      state.employeeList = action?.payload;
    },
  },
});

export const { createEmployee, deleteEmployee, editEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
