import { createAsyncThunk } from "@reduxjs/toolkit";
import { DefaultPagination, expensesDao } from "db";
import { Expense } from "types";

export const fetchExpenses = createAsyncThunk(
    'expenses/fetch',
    // TODO: add options: pagination, filter etc. 
    async (_, thunkApi) => {
        // TODO: choose source of expenses based on settings
        try {
            return expensesDao.getOrderByDate(new DefaultPagination(1)).sortBy('createDate')
        } catch (err) {
            thunkApi.rejectWithValue("Unable to fetch expenses")
        }
    }
)

export const addExpense = createAsyncThunk(
    'expenses/add',
    async (expense: Expense, thunkApi) => {
        // TODO: choose source of expenses based on settings
        try {
            await expensesDao.save(expense)
            return expense
        } catch (err) {
            thunkApi.rejectWithValue("Unable to add expenses")
        }
    }
)