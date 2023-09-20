import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authenticationSlice';
import expenseReducer from './expenseSlice';

const store = configureStore({
  reducer: {
    authentication: authReducer,
    expense: expenseReducer
  },
});

export default store;
