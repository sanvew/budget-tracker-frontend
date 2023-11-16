import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Expense, ExpenseFilter, Pagination } from "type";
import { addExpense, fetchExpenses, fetchExpensesCount, removeExpense, updateExpense, } from "./expenses_actions";

export type ExpensesState = {
    expenses: Expense[],
    totalCount: number,
    isLoading: boolean,
    page?: Pagination,
    filter?: ExpenseFilter,
    error: {
        fetch?: string,
        add?: string | boolean,
        update?: string | boolean,
        remove?: string,
    }
}

const initialState: ExpensesState = {
    expenses: [],
    totalCount: 0,
    isLoading: false,
    error: {}
}

export type FetchedExpenses = {
    expenses: Expense[]
    page?: Pagination,
    filter?: ExpenseFilter,
}

const expensesReducer = createSlice({
        name: 'expenses',
        initialState,
        reducers: {},
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
                    state.error.fetch = action.payload;
                })
            builder
                .addCase(addExpense.fulfilled.type, (state, action: PayloadAction<Expense>) => {
                    state.expenses.unshift(action.payload);
                    state.error.add = false;
                })
                .addCase(addExpense.rejected.type, (state, action: PayloadAction<string>) => {
                    state.error.add = action.payload;
                })
            builder
                .addCase(fetchExpensesCount.fulfilled.type, (state, action: PayloadAction<number>) => {
                    state.totalCount = action.payload
                })
                .addCase(fetchExpensesCount.rejected.type, (state) => {
                    state.totalCount = NaN
                })
            builder
                .addCase(updateExpense.fulfilled.type, (state) => {
                    state.error.update = false
                })
                .addCase(updateExpense.rejected.type, (state, action: PayloadAction<string>) => {
                    state.error.update = action.payload
                })
            builder
                .addCase(removeExpense.fulfilled.type, (state) => {
                    state.error.remove = undefined
                })
                .addCase(removeExpense.rejected.type, (state, action: PayloadAction<string>) => {
                    state.error.remove = action.payload
                })
        },
})

export default expensesReducer.reducer;