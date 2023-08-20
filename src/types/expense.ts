export type ExpenseType = 'outcome' | 'income'

export interface Expense {
    id: string,
    date: Date,
    createDate: Date,
    updateDate: Date,
    category: string,
    description: string,
    amount: number,
    expenseType: ExpenseType,
    currency: string
}