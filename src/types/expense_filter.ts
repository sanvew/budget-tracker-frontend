import { ExpenseType } from "./expense";

export type FilterExpenseType = 'all' | ExpenseType

export interface ExpenseFilter {
    fromDate?: Date,
    toDate?: Date,
    categories?: string[],
    expenseType?: FilterExpenseType
}
