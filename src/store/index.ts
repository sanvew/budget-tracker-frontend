import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./reducer/expenses";
import currencyReducer from "./reducer/currency";
import categoryReducer from "./reducer/category";

const rootReducer = combineReducers({
    expensesReducer, categoryReducer, currencyReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: [
                    /.date$/, /.createDate$/, /.updateDate$/, /.page$/, /.fromDate$/, /.toDate$/
                ],
                ignoredPaths: [
                    /.date$/, /.createDate$/, /.updateDate$/, /.page$/, /.fromDate$/, /.toDate$/
                ],
            },
        }),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore =  ReturnType<typeof configureStore>
export type AppDispatch = typeof store.dispatch;