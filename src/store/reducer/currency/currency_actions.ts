import { createAsyncThunk } from "@reduxjs/toolkit";
import { currencyDao } from "api/local/indexeddb/currency_dao";
import { Currency } from "type";

export const fetchCurrencies = createAsyncThunk(
    'currency/fetch',
    async (_arg, thunkApi) => {
        try {
            return currencyDao.getAll().sortBy('alfa')
        } catch  {
            thunkApi.rejectWithValue("Unable to fetch currency")
        }
    }
)

export const addCurrencies = createAsyncThunk(
    'currency/add',
    async (currency: Omit<Currency, 'id'>, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            const c = { ...currency, id: crypto.randomUUID() }
            await currencyDao.save(c)
            return c
        } catch  {
            thunkApi.rejectWithValue("Unable to add currency")
        }
    }
)