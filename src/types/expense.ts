export interface Expense {
    id: string,
    date: Date,
    createDate: Date,
    updateDate: Date,
    category: string,
    description: string,
    amount: number,
    expenseType: 'outcome' | 'income',
    currency: string
}