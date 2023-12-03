import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "type";
import { fetchCurrencies } from "./currency_actions";

export type CurrencyState = {
    currencies: Currency[],
    isLoading: boolean,
    error: {
        fetch?: string,
        add?: string | boolean,
        remove?: string,
    }
}

const initialState: CurrencyState = {
    currencies: [],
    isLoading: false,
    error: {}
}

const currencyReducer = createSlice({
        name: 'expenses',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(fetchCurrencies.fulfilled.type, (state, action: PayloadAction<Currency[]>) => {
                    state.isLoading = false
                    state.currencies = action.payload
                })
                .addCase(fetchCurrencies.pending.type, (state) => {
                    state.isLoading = true
                })
                .addCase(fetchCurrencies.rejected.type, (state, action: PayloadAction<string>) => {
                    state.error.add = action.payload
                })
        }
})

export default currencyReducer.reducer;