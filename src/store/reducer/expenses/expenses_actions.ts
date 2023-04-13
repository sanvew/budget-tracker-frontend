import { createAsyncThunk } from "@reduxjs/toolkit";
import { expensesDao } from "db";
import { Expense, ExpenseFilter, Pagination } from "types";

export const fetchExpenses = createAsyncThunk(
    'expenses/fetch',
    async (arg: {filter?: ExpenseFilter, page?: Pagination}, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            return expensesDao.getAll(arg.filter, arg.page).sortBy('date')
        } catch (err) {
            thunkApi.rejectWithValue("Unable to fetch expenses")
        }
    }
)

export const addExpense = createAsyncThunk(
    'expenses/add',
    async (expense: Expense, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            await expensesDao.save(expense)
            return expense
        } catch (err) {
            thunkApi.rejectWithValue("Unable to add expenses")
        }
    }
)

export const fetchExpensesCount = createAsyncThunk(
    'expenses/count',
    async (arg: {filter?: ExpenseFilter}, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            return expensesDao.count(arg.filter)
        } catch (err) {
            thunkApi.rejectWithValue("Unable to count expenses")
        }
    }
)