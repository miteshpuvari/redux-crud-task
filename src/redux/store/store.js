import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../reducer/employeeReducer'

export const store = configureStore({
  reducer: {
    employee: employeeReducer
  },
})