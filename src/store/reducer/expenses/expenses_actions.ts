import { createAsyncThunk } from "@reduxjs/toolkit";
import { expensesDao } from "api/indexeddb";
import { RootState } from 'store'
import { isExpenseFilterEqual,ExpenseFilter, Pagination } from "type"
import { Expense,  getValidatedExpenseUpdates, isExpenseUpdated, ExpenseUpdates } from "type/expense";
import { FetchedExpenses } from "./expenses_reducer";

export const fetchExpenses = createAsyncThunk(
    'expenses/fetch',
    async (arg: {filter?: ExpenseFilter, page?: Pagination}, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            const currState = thunkApi.getState() as RootState 
            if (!isExpenseFilterEqual(currState.expensesReducer.filter, arg.filter)) {
                thunkApi.dispatch(fetchExpensesCount({filter: arg.filter}))
            }
            return {
                expenses: await expensesDao.getAll(arg.filter, arg.page).sortBy('date'),
                filter: arg.filter,
                page: arg.page 
            } as FetchedExpenses
        } catch (err) {
            thunkApi.rejectWithValue("Unable to fetch expenses")
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

export const addExpense = createAsyncThunk(
    'expenses/add',
    async (expense: Omit<Expense, 'id'>, thunkApi) => {
        const e = { ...expense, id: crypto.randomUUID()}
        // TODO: create separate service with source selection based on settings
        try {
            await expensesDao.save(e)
            return expense
        } catch (err) {
            thunkApi.rejectWithValue("Unable to add expenses")
        }
    }
)

export const updateExpense = createAsyncThunk(
    'expenses/update',
    async (arg: {expense: Expense, expenseUpdates: ExpenseUpdates}, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        if (isExpenseUpdated(arg.expense, arg.expenseUpdates)) {
            const expenseUpdates = getValidatedExpenseUpdates(arg.expense, arg.expenseUpdates)
            try {
                if (await expensesDao.update(arg.expense.id, expenseUpdates) === 0) {
                    thunkApi.rejectWithValue("Expense not found") 
                }
            } catch (err) {
                thunkApi.rejectWithValue("Unable to update expense")
            }
        }
    }
)

export const removeExpense = createAsyncThunk(
    'expenses/remove',
    async (expenseId: string, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            expensesDao.remove(expenseId)
        } catch (err) {
            thunkApi.rejectWithValue("Unable to update expense")
        }
    }
)