import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense } from "types";
import { addExpense, fetchExpenses, fetchExpensesCount } from "./expenses_actions";

type ExpensesState = {
    expenses: Expense[],
    totalCount: number,
    isLoading: boolean,
    fetchError?: string,
    addError?: string | boolean,
}

const initialState: ExpensesState = {
    expenses: [],
    totalCount: 0,
    isLoading: false,
} 

const expensesReducer = createSlice({
        name: 'expenses',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(fetchExpenses.fulfilled.type, (state, action: PayloadAction<Expense[]>) => {
                    state.isLoading = false;
                    state.expenses = action.payload
                })
                .addCase(fetchExpenses.pending.type, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchExpenses.rejected.type, (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.fetchError = action.payload;
                })
            builder
                .addCase(addExpense.fulfilled.type, (state, action: PayloadAction<Expense>) => {
                    state.expenses.push(action.payload);
                    state.addError = false;
                })
                .addCase(addExpense.rejected.type, (state, action: PayloadAction<string>) => {
                    state.addError = action.payload;
                })
            builder
                .addCase(fetchExpensesCount.fulfilled.type, (state, action: PayloadAction<number>) => {
                    state.totalCount = action.payload
                })
                .addCase(fetchExpensesCount.rejected.type, (state, action: PayloadAction<string>) => {
                    state.totalCount = NaN
                })
        },
})

export default expensesReducer.reducer;