import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./reducer/expenses";

const rootReducer = combineReducers({
    expensesReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: [
                    /payload.expenses.[0-9]+.date/, /payload.expenses.[0-9]+.createDate/,
                    /payload.expenses.[0-9]+.updateDate/, 'payload.page', 'payload.date', 'payload.createDate',
                    'payload.updateDate', 'meta.arg.date', 'meta.arg.createDate', 'meta.arg.updateDate',
                    'meta.arg.filter.fromDate', 'meta.arg.filter.toDate', 'meta.arg.page',
                ],
                ignoredPaths: [
                    /expensesReducer.expenses.[0-9]+.date/, /expensesReducer.expenses.[0-9]+.createDate/,
                    /expensesReducer.expenses.[0-9]+.updateDate/, 'expensesReducer.page'
                ],
            },
        }),
})

type RootState = ReturnType<typeof rootReducer>
type AppStore =  ReturnType<typeof configureStore>
type AppDispatch = typeof store.dispatch;

export {
    store,
    type RootState,
    type AppStore,
    type AppDispatch
}