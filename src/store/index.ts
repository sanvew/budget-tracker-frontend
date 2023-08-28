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
                    /.date$/, /.createDate$/, /.updateDate$/, /.page$/, /.fromDate$/, /.toDate$/
                ],
                ignoredPaths: [
                    /.date$/, /.createDate$/, /.updateDate$/, /.page$/, /.fromDate$/, /.toDate$/
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