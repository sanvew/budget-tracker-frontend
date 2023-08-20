import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import { Expense, ExpenseFilter, Pagination } from "types";
import { addExpense, fetchExpenses, fetchExpensesCount, } from "./expenses_actions";

export type ExpensesState = {
    expenses: Expense[],
    totalCount: number,
    isLoading: boolean,
    page?: Pagination,
    filter?: ExpenseFilter,
    fetchError?: string,
    addError?: string | boolean,
}

const initialState: ExpensesState = {
    expenses: [],
    totalCount: 0,
    isLoading: false,
}

export type FetchedExpenses = {
    expenses: Expense[]
    page?: Pagination,
    filter?: ExpenseFilter,
}

const expensesReducer = createSlice({
        name: 'expenses',
        initialState,
        reducers: {
        },
        extraReducers(builder) {
            builder
                .addCase(fetchExpenses.fulfilled.type, (state, action: PayloadAction<FetchedExpenses>) => {
                    state.isLoading = false;
                    state.expenses = action.payload.expenses
                    state.filter = action.payload.filter
                    state.page = action.payload.page
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
                    state.expenses.unshift(action.payload);
                    state.addError = false;
                })
                .addCase(addExpense.rejected.type, (state, action: PayloadAction<string>) => {
                    state.addError = action.payload;
                })
            builder
                .addCase(fetchExpensesCount.fulfilled.type, (state, action: PayloadAction<number>) => {
                    state.totalCount = action.payload
                })
                .addCase(fetchExpensesCount.rejected.type, (state) => {
                    state.totalCount = NaN
                })
        },
})

export default expensesReducer.reducer;