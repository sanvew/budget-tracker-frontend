import { ExpenseType } from "./expense";

export interface ExpenseFilter {
    fromDate?: Date,
    toDate?: Date,
    categories?: string[],
    expenseType?: 'all' & ExpenseType
}
