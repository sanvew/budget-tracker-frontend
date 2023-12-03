import { createAsyncThunk } from "@reduxjs/toolkit"
import { categoryDao } from "api/local/indexeddb"
import { Category } from "type"

export const fetchCategories = createAsyncThunk(
    'category/fetch',
    async (_arg, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            return categoryDao.getAll().sortBy('name')
        } catch (err) {
            thunkApi.rejectWithValue("Unable to fetch categories")
        }
    }
)

export const addCategory = createAsyncThunk(
    'category/add',
    async (category: Omit<Category, 'id'>, thunkApi) => {
        const c = { ...category, id: crypto.randomUUID() }
        // TODO: create separate service with source selection based on settings
        try {
            await categoryDao.save(c)
            return category
        } catch (err) {
            thunkApi.rejectWithValue("Unable to add category")
        }
    }
)

export const removeCategory = createAsyncThunk(
    'category/remove',
    async (categoryId: string, thunkApi) => {
        // TODO: create separate service with source selection based on settings
        try {
            await categoryDao.remove(categoryId)
        } catch (err) {
            thunkApi.rejectWithValue("Unable to remove category")
        }
    }
)