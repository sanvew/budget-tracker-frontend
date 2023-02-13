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
                    /payload.[0-9]+.date/, /payload.[0-9]+.createDate/, /payload.[0-9]+.updateDate/,
                    'payload.date', 'payload.createDate', 'payload.updateDate',
                    'meta.arg.date', 'meta.arg.createDate', 'meta.arg.updateDate',
                ],
                ignoredPaths: [
                    /expensesReducer.expenses.[0-9]+.date/, /expensesReducer.expenses.[0-9]+.createDate/, /expensesReducer.expenses.[0-9]+.updateDate/
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