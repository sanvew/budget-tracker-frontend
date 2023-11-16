import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "type";
import { fetchCategories } from "./category_actions";

export type CategoryState = {
    categories: Category[],
    isLoading: boolean,
    error: {
        fetch?: string,
        add?: string | boolean,
        remove?: string,
    }
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false,
    error: {}
}

const categoryReducer = createSlice({
        name: 'expenses',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(fetchCategories.fulfilled.type, (state, action: PayloadAction<Category[]>) => {
                    state.isLoading = false
                    state.categories = action.payload
                })
                .addCase(fetchCategories.pending.type, (state) => {
                    state.isLoading = true
                })
                .addCase(fetchCategories.rejected.type, (state, action: PayloadAction<string>) => {
                    state.error.add = action.payload
                })
        }
})

export default categoryReducer.reducer;