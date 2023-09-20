import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authenticationSlice';
import expenseReducer from './expenseSlice';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    authentication: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
    user: userReducer
  },
});

export default store;
