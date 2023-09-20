import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateDetailsInDB,
  getExpenseDetails,
  deleteDetailsInDB,
} from "../components/firebaseConfig";

const initialState = {
  expenseItems: [],
};

export const fetchExpenseData = createAsyncThunk("fetchExpenseData", async (currentUserId) => {
    return getExpenseDetails(currentUserId).then((expenseDetailsFromDB) => expenseDetailsFromDB);
});

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addNewExpense: (state, action) => {
      const newExpense = action.payload;
      state.expenseItems.push(newExpense);
      try {
        updateDetailsInDB(
          newExpense.userId,
          newExpense.productName,
          newExpense.productPrice,
          newExpense.productId
        );
      } catch (error) {
        console.log(error);
      }
    },
    deleteExpense: (state, action) => {
      const { id, serverId } = action.payload;
      state.expenseItems = state.expenseItems.filter((x) => x.productId !== id);
      try {
        deleteDetailsInDB(serverId);
      } catch (error) {
        console.log(error);
      }
    },
    fetchExpenseFromDB: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
      state.expenseItems = action.payload;
    });
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
